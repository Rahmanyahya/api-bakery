import { prisma } from "../app/database";
import { ErrorHandler } from "../error/response-error";
import { CreateSupply, DeleteSupply, SearchSupplly, SupplyResponse, toSupplyResponse, UpdateSupply } from "../Model/supply-model";
import {SupplyValidation} from '../validation/supply-validation'
import { Validation } from "../validation/validation";

export class SupplyService {

    static async CreateSupply(req: CreateSupply): Promise<SupplyResponse> {
        const createSupplyRequest = Validation.validate(SupplyValidation.CREATE_SUPPLY, req)
        console.log("Create supply request:", createSupplyRequest);

        const checkSupplier = await prisma.supplier.findFirst({where: {id: createSupplyRequest.supplier_id}})
        if (!checkSupplier) throw new ErrorHandler(404, "Supplier not found")
        const checkUser = await prisma.user.findFirst({where: {id: createSupplyRequest.user_id}})
        if (!checkUser) throw new ErrorHandler(404, "User not found")

        const createSupply = await prisma.supply.create({
            data: {
                supply_date: createSupplyRequest.supply_date,
                supplier_id: createSupplyRequest.supplier_id,
                user_id: createSupplyRequest.user_id
            }
        })

      
       await Promise.all(
        createSupplyRequest.detail_supply.map(async (item) => {
            const checkItem = await prisma.material.findFirst({where: {id: item.material_id}})
            if (!checkItem) throw new ErrorHandler(404, "Material not found")
            await prisma.detailSupply.create({
                data: {
                    supply_id: createSupply.id,
                    material_id: item.material_id,
                    quantity: item.quantity
                },
            })
    })
       )
        

        return toSupplyResponse(createSupply.id)
    }

    static async UpdateSupply(req: UpdateSupply): Promise<SupplyResponse | Error> {
        console.log(req)
        const updateSupplyRequest = Validation.validate(SupplyValidation.UPDATE_SUPPLY, req);

        const isSupplyExist = await prisma.supply.findFirst({
            where: { id: updateSupplyRequest.id },
            include: { detail_supplies: true }
        });

        if (!isSupplyExist) throw new ErrorHandler(404, "Supply not found");

        const isSupplierExist = await prisma.supplier.findFirst({where: {id: updateSupplyRequest.supplier_id}})
        if (!isSupplierExist) throw new ErrorHandler(404, "Supplier is not exist")

        const isUserExist = await prisma.user.findFirst({where: {id: updateSupplyRequest.user_id}})
        if (!isUserExist) throw new ErrorHandler(404, "User is not exist")

        updateSupplyRequest.supply_date = updateSupplyRequest.supply_date ?? isSupplyExist.supply_date;
        updateSupplyRequest.supplier_id = updateSupplyRequest.supplier_id ?? isSupplyExist.supplier_id;
        updateSupplyRequest.user_id = updateSupplyRequest.user_id ?? isSupplyExist.user_id;

        if (!updateSupplyRequest.detail_supply || updateSupplyRequest.detail_supply == undefined) {
            const newDataSupply = await prisma.supply.update({
                where: { id: updateSupplyRequest.id },
                data: {
                    supply_date: updateSupplyRequest.supply_date,
                    supplier_id: updateSupplyRequest.supplier_id,
                    user_id: updateSupplyRequest.user_id
                }
            })

            return toSupplyResponse(newDataSupply.id)
        } else {
            let newDetailSupplyData: any[] = []

            const newDataSupply = await prisma.supply.update({
                where: { id: updateSupplyRequest.id },
                data: {
                    supply_date: updateSupplyRequest.supply_date,
                    supplier_id: updateSupplyRequest.supplier_id,
                    user_id: updateSupplyRequest.user_id
                }
            })

            for (let i = 0; i < updateSupplyRequest.detail_supply.length; i++) {
                const checkItem = await prisma.material.findFirst({where: {id: updateSupplyRequest.detail_supply[i].material_id}})
                if (!checkItem) throw new ErrorHandler(404, "Material not found")
                const checkItemIsAdde = newDetailSupplyData.find(item => item.material_id == checkItem.id)
                if (checkItemIsAdde != undefined) throw new ErrorHandler(400, "You have added double same material")
                newDetailSupplyData.push({
                    supply_id: newDataSupply.id,
                    material_id: updateSupplyRequest.detail_supply[i].material_id,
                    quantity: updateSupplyRequest.detail_supply[i].quantity
                })
            }

            await prisma.detailSupply.deleteMany({where: {supply_id: updateSupplyRequest.id}})
            await prisma.detailSupply.createMany({data: newDetailSupplyData})

            return toSupplyResponse(newDataSupply.id)   
        }
    }

    static async SearchProduct (req: SearchSupplly): Promise<SupplyResponse[]> {
        const searchSupplyRequest = Validation.validate(SupplyValidation.SEARCH_SUPPLY, req);

        const data = await prisma.supply.findMany({
            where: {
                OR: [
                    { supplier: { supplier_name: { contains: searchSupplyRequest.keyword } } },
                    { user: { user_name: { contains: searchSupplyRequest.keyword } } },
                ]
            },
            include: {
                user: { select: { user_name: true } },
                supplier: { select: { supplier_name: true } },
                detail_supplies: {
                    include: {
                        material: {
                            select: { material_name: true, material_price: true }
                        }
                    }
                }
            }
        });

        if (data.length == 0) throw new ErrorHandler(401, 'not data supply is match with your keyword');

        return await Promise.all(data.map(item => toSupplyResponse(item.id)))
    }

    static async DeleteSupply (req: DeleteSupply) {
        const deleteSupplyRequest = Validation.validate(SupplyValidation.DELETE_SUPPLY, req);
        const isSuppltExist = await prisma.supply.findFirst({where: {id: deleteSupplyRequest.id}})
        if (!isSuppltExist) throw new ErrorHandler(404, `Supply not exist`)
        await prisma.detailSupply.deleteMany({where: {supply_id: deleteSupplyRequest.id}})
        await prisma.supply.delete({where: {id: req.id}})

        return "OK"
    }

    static async getAllSupply(): Promise<SupplyResponse[] | Error> {
        const data = await prisma.supply.findMany()
        return data.length > 0 ? await Promise.all(data.map(item => toSupplyResponse(item.id))) : new ErrorHandler(404, `Supply is empty`)
    }

}