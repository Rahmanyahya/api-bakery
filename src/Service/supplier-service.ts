import { prisma } from "../app/database";
import { ErrorHandler } from "../error/response-error";
import { CreateSupplier, DeleteSupplier, SearchSupplier, SupplierResponse, toSupplierResponse, UpdateSupplier } from "../Model/supplier-model";
import { SupplierValidation } from "../validation/supplier-validation";
import { Validation } from "../validation/validation";

export class SupplierService {
    
    /** CREATE  */
    static async CreateSupplier(req: CreateSupplier): Promise<SupplierResponse>  {
            const addSupplierRequest = Validation.validate(SupplierValidation.CREATE_SUPPLIER, req)

            const isSupplierExist = await prisma.supplier.count({where: {supplier_phone: addSupplierRequest.supplier_phone}})

            if (isSupplierExist != 0) throw new ErrorHandler(401,`Supplier is already exist`)
            
            const result = await prisma.supplier.create({data: addSupplierRequest})

            return toSupplierResponse(result)
    }

    static async UpdateSupplier(req: UpdateSupplier): Promise<SupplierResponse> {
        const updateSupplierRequest = Validation.validate(SupplierValidation.UPDATE_SUPPLIER, req)

        const isSupplierExist = await prisma.supplier.findFirst({where: {id: updateSupplierRequest.id}})

        if (!isSupplierExist) throw new ErrorHandler(404, "Supplier not found")

        updateSupplierRequest.supplier_address = updateSupplierRequest.supplier_address? updateSupplierRequest.supplier_address : isSupplierExist.supplier_address
        updateSupplierRequest.supplier_phone = updateSupplierRequest.supplier_phone? updateSupplierRequest.supplier_phone : isSupplierExist.supplier_phone
        updateSupplierRequest.supplier_name = updateSupplierRequest.supplier_name? updateSupplierRequest.supplier_name : isSupplierExist.supplier_name
        
        const result = await prisma.supplier.update({where: {id: updateSupplierRequest.id}, data: updateSupplierRequest})

        return toSupplierResponse(result)
    }

    static async DeleteSupplier(req: DeleteSupplier) {
        const deleteSupplierRequest = Validation.validate(SupplierValidation.DELETE_SUPPLIER, req)

        const isSupplierExist = await prisma.supplier.findFirst({where: {id: deleteSupplierRequest.id}})

        if (!isSupplierExist) throw new ErrorHandler(404, "Supplier not found")
        
        await prisma.supplier.delete({where: {id: isSupplierExist.id}})
        
        return "OK"
    }

    static async GetAllSupplier (): Promise<SupplierResponse[] | Error> {
        const suppliers = await prisma.supplier.findMany()
        return suppliers.length > 0? suppliers.map(toSupplierResponse) : new ErrorHandler(404,"supplier not found")
    }

    static async SearchSupplier(req: SearchSupplier): Promise<SupplierResponse[] | Error> {
        const searchSupplierRequest = Validation.validate(SupplierValidation.SEARCH_SUPPLIER, req)
        
        const suppliers = await prisma.supplier.findMany({
            where: { supplier_name: { contains: searchSupplierRequest.keyword } },
        })

        return suppliers.length > 0? suppliers.map(toSupplierResponse) : new ErrorHandler(404,"supplier not found")
    }

}