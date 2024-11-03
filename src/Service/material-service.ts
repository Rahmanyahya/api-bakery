import { prisma } from "../app/database";
import { ErrorHandler } from "../error/response-error";
import { CreateMaterial, DeleteMaterial, MaterialResponse, SearchMaterial, toMaterialResponse, UpdateMaterial } from "../Model/material-model";
import { MaterialValidation } from "../validation/material-validation";
import { Validation } from "../validation/validation";

export class MaterialService {

    static async CreateMaterial (req: CreateMaterial): Promise<MaterialResponse> {
        const userAddMaterial = Validation.validate(MaterialValidation.CREATE_MATERIAL, req)

        const isMaterialExist = await prisma.material.count({
            where: {
                material_name: userAddMaterial.material_name
            }
        })

        if (isMaterialExist != 0) throw new ErrorHandler(401,`Material is already exist`)
        
        const result = await prisma.material.create({data: userAddMaterial})

        return toMaterialResponse(result)
    }

    static async UpdateMaterial (req: UpdateMaterial): Promise<MaterialResponse> {
        const updateMaterialRequest = Validation.validate(MaterialValidation.UPDATE_MATERIAL, req)
        const isMaterialExist = await prisma.material.findFirst({where: {id: updateMaterialRequest.id}})
        if (!isMaterialExist) throw new ErrorHandler(404, "Material not found")
            
        const result = await prisma.material.update({where: {id: isMaterialExist.id}, data: updateMaterialRequest})
        
        return toMaterialResponse(result)
    }

    static async DeleteMaterial (req: DeleteMaterial) {
        const deleteMaterialRequest = Validation.validate(MaterialValidation.DELETE_MATERIAL, req)
        
        const isMaterialExist = await prisma.material.findFirst({where: {id: deleteMaterialRequest.id}})

        if (!isMaterialExist) throw new ErrorHandler(404, "Material not found")
            
        const result = await prisma.material.delete({where: {id: isMaterialExist.id}})
            
        return "OK"
    }

    static async SearchMaterial (req: SearchMaterial): Promise<MaterialResponse[] | Error> {
        const searchMaterialRequest = Validation.validate(MaterialValidation.SEARCH_MATERIAL, req)
        const materials = await prisma.material.findMany({where: {material_name: {contains: searchMaterialRequest.keyword}}})
        if (materials.length == 0) throw new ErrorHandler(404,"Material not found")
        return materials.map(toMaterialResponse)
    }

    static async GetAllMaterials (): Promise<MaterialResponse[] | Error> {
        const materials = await prisma.material.findMany()
        if (materials.length == 0) throw new ErrorHandler(404,"Material is empty")
        return materials.map(toMaterialResponse)
    }

}