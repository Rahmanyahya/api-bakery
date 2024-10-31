import { prisma } from "../app/database";
import { ErrorHandler } from "../error/response-error";
import { CreateSupply, DeleteSupply, SearchSupplly, SupplyResponse, toSupplyResponse, UpdateSupply } from "../Model/supply-model";
import {SupplyValidation} from '../validation/supply-validation'
import { Validation } from "../validation/validation";

export class SupplyService {

    static async CreateSupply(req: CreateSupply): Promise<SupplyResponse> {
        const createSupplyRequest = Validation.validate(SupplyValidation.CREATE_SUPPLY, req)
        const createSupply = await prisma.supply.create({
            data: {
                supply_date: createSupplyRequest.supply_date,
                supplier_id: createSupplyRequest.supplier_id,
                user_id: createSupplyRequest.user_id
            }
        })

      
       await Promise.all(
        createSupplyRequest.detail_supply.map(async (item) => (
            await prisma.detailSupply.createMany({
                data: {
                    supply_id: createSupply.id,
                    material_id: item.material_id,
                    quantity: item.quantity
                }
            })
        ))
       )
        

        return toSupplyResponse(createSupply.id)
    }

    static async UpdateSupply(req: UpdateSupply): Promise<SupplyResponse | Error> {
        const updateSupplyRequest = Validation.validate(SupplyValidation.UPDATE_SUPPLY, req);

        const isSupplyExist = await prisma.supply.findFirst({
            where: { id: updateSupplyRequest.id },
            include: { detail_supplies: true }
        });

        if (!isSupplyExist) throw new ErrorHandler(404, "Supply not found");

        updateSupplyRequest.supply_date = updateSupplyRequest.supply_date || isSupplyExist.supply_date;
        updateSupplyRequest.supplier_id = updateSupplyRequest.supplier_id || isSupplyExist.supplier_id;
        updateSupplyRequest.user_id = updateSupplyRequest.user_id || isSupplyExist.user_id;

        const newDataSupply = await prisma.supply.update({where: {id: isSupplyExist.id}, data: {
            supply_date: updateSupplyRequest.supply_date,
            supplier_id: updateSupplyRequest.supplier_id,
            user_id: updateSupplyRequest.user_id
        }})

        const newMaterial: number[] = []
        const newQuantity: number[] = []

        updateSupplyRequest.detail_supply.map(async (item) => {
            const isMaterialExist = await prisma.material.findFirst({where: {id: item.material_id}})
            if (!isMaterialExist) throw new ErrorHandler(404, "Material not found");

           isSupplyExist.detail_supplies.map(supply => (
                supply.supply_id,
                item.material_id = item.material_id || supply.material_id,
                item.quantity = item.quantity? item.quantity : supply.quantity,
                newMaterial.push(item.material_id),
                newQuantity.push(item.quantity)
        ))
        })

       await prisma.detailSupply.deleteMany({where: {supply_id: isSupplyExist.id}})
       
       for (let i = 0; i < newMaterial.length; i ++) {
        await prisma.detailSupply.create({
            data: {
                supply_id: isSupplyExist.id,
                material_id: newMaterial[i],
                quantity: newQuantity[i]
            }
        })
       }
       
       return toSupplyResponse(newDataSupply.id)
    }

    static async SearchProduct (req: SearchSupplly): Promise<SupplyResponse> {
        const searchSupplyRequest = Validation.validate(SupplyValidation.SEARCH_SUPPLY, req);

        const data = await prisma.supply.findFirst({
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

        if (!data) throw new ErrorHandler(401, 'No supply found with that keyword');

        return toSupplyResponse(data.id)
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