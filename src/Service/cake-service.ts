import { prisma } from "../app/database";
import { ErrorHandler } from "../error/response-error";
import { deleteFile } from "../helper/delete-images";
import { CakeResponse, CreateCakeRequest, DeleteCake, SearchCake, toCakeResponse, toCakeResponseWithComposition, UpdateCakeRequest } from "../Model/cake-model";
import { CakeValidation } from "../validation/cake-validation";
import { Validation } from "../validation/validation";

export class CakeService {

    static async CreateCake (req: CreateCakeRequest): Promise<CreateCakeRequest> {
        req.cake_price = Number(req.cake_price)
        req.best_before = new Date(req.best_before)
        const userAddCake = Validation.validate(CakeValidation.CREATE_CAKE, req)
        const isCakeExist = await prisma.cake.count({
            where: {AND: [
                {cake_name: userAddCake.cake_name},
                {cake_flavour: userAddCake.cake_flavour}
            ]}
        })

        if (isCakeExist != 0) throw new ErrorHandler(401, 'Cake already exists')
        
        const Cake = await prisma.cake.create({
            data: {
                cake_name: userAddCake.cake_name,
                cake_price: userAddCake.cake_price,
                cake_image: userAddCake.cake_image,
                best_before: userAddCake.best_before,
                cake_flavour: userAddCake.cake_flavour
            }
        })

        return toCakeResponse(Cake)
    }

    static async UpdateCake (req: UpdateCakeRequest): Promise<CakeResponse> {
        req.cake_price = req.cake_price? Number(req.cake_price as number) : 1
        req.best_before = new Date(req.best_before as Date)
        const updateCakeRequest = Validation.validate(CakeValidation.UPDATE_CAKE, req)
      
        const isCakeExist = await prisma.cake.findFirst({where: {id: updateCakeRequest.id}, include: {composition: true}})
        
        if (!isCakeExist) throw new ErrorHandler(404, "Cake not found")
        
            updateCakeRequest.cake_name = updateCakeRequest.cake_name ?? isCakeExist.cake_name
            updateCakeRequest.cake_price = updateCakeRequest.cake_price == 1 ? isCakeExist.cake_price : updateCakeRequest.cake_price
            updateCakeRequest.cake_flavour =  updateCakeRequest.cake_flavour ?? isCakeExist.cake_flavour
            updateCakeRequest.cake_image =  updateCakeRequest.cake_image == undefined? isCakeExist.cake_image : updateCakeRequest.cake_image
            updateCakeRequest.best_before =  updateCakeRequest.best_before ?? isCakeExist.best_before

            const newCakeData = await prisma.cake.update({where: {id: updateCakeRequest.id}, data: {
                cake_name: updateCakeRequest.cake_name,
                cake_price: updateCakeRequest.cake_price,
                cake_flavour: updateCakeRequest.cake_flavour,
                cake_image: updateCakeRequest.cake_image,
                best_before: updateCakeRequest.best_before
            }})
        
        return toCakeResponseWithComposition(newCakeData)

    }

    static async DeleteCake (req: DeleteCake) {
        const deleteRequest = Validation.validate(CakeValidation.DELETE_CAKE, req)
        const isCakeExist = await prisma.cake.findFirst({where: {id: deleteRequest.cake_id}})
        
        if (!isCakeExist) throw new ErrorHandler(404, "Cake not found")
        
       deleteFile(isCakeExist.cake_image)
       await prisma.composition.deleteMany({where: {cake_id: isCakeExist.id}})
       await prisma.cake.delete({where: {id: isCakeExist.id}})
      

       return "OK"
    }

    static async GetAllCake (): Promise<CakeResponse[] | Error> {
        const result = await prisma.cake.findMany()
        if (result.length == 0) throw new ErrorHandler(404, "Cake not found")
        return await Promise.all(result.map(cake => toCakeResponseWithComposition(cake)))
    }

    static async SearchCake (req: SearchCake): Promise<CakeResponse[] | Error> {
        const searchRequest = Validation.validate(CakeValidation.SEARCH_CAKE, req)
        const result = await prisma.cake.findMany({where: {cake_name: {contains: searchRequest.keyword}}})
        if (result.length == 0) throw new ErrorHandler(404, "Cake not found")
        return Promise.all(result.map(cake => toCakeResponseWithComposition(cake))) 
    }

}