import { prisma } from "../app/database";
import {
  CompositionResponse,
  CreateComposition,
  DeleteComposition,
  SearchComposition,
  toCompositionResponse,
  UpdateComposition,
} from "../Model/compotition-model";
import { CompesitionValidation } from "../validation/composition-validation";
import { Validation } from "../validation/validation";
import { ErrorHandler } from "../error/response-error";

export class CompositionService {
  static async CreateComposition(
    req: CreateComposition,
  ): Promise<CompositionResponse> {
    const CreateCompesitionRequest = Validation.validate(
      CompesitionValidation.CREATE_COMPESITION,
      req,
    );

    const isCompesitionExist = await prisma.composition.count({
      where: {
        AND: [
          { cake_id: CreateCompesitionRequest.cake_id },
          { material_id: CreateCompesitionRequest.material_id },
        ],
      },
    });

    if (isCompesitionExist != 0)
      throw new ErrorHandler(401, `Compesition is exist`);

    const CompesitionData = await prisma.composition.create({
      data: CreateCompesitionRequest,
    });

    return toCompositionResponse(CompesitionData);
  }

  static async UpdateCompesition(
    req: UpdateComposition,
  ): Promise<CompositionResponse> {
    const RequestUpdateCompesition = Validation.validate(
      CompesitionValidation.UPDATE_COMPESITION,
      req,
    );

    const isCompesitionExits = await prisma.composition.findFirst({
      where: { id: RequestUpdateCompesition.id },
    });

    if (!isCompesitionExits)
      throw new ErrorHandler(404, "Composition is not exits");

    RequestUpdateCompesition.cake_id =
      RequestUpdateCompesition.cake_id ?? isCompesitionExits.cake_id;
    RequestUpdateCompesition.material_id =
      RequestUpdateCompesition.material_id ?? isCompesitionExits.material_id;
    RequestUpdateCompesition.quantity =
      RequestUpdateCompesition.quantity ?? isCompesitionExits.quantity;

    const newDataCompesition = await prisma.composition.update({
      where: {
        id: isCompesitionExits.id,
      },
      data: RequestUpdateCompesition,
    });

    return toCompositionResponse(newDataCompesition);
  }

  static async DeleteCompesition(req: DeleteComposition) {
    const DeleteCompositionRequest = Validation.validate(
      CompesitionValidation.DELETE_COMPESITION,
      req,
    );

    const isCompesitionExits = await prisma.composition.findFirst({
      where: {
        id: DeleteCompositionRequest.id,
      },
    });

    if (!isCompesitionExits)
      throw new ErrorHandler(404, "Composition is not exist");

    await prisma.composition.delete({ where: { id: isCompesitionExits.id } });

    return "OK";
  }

  static async SearchComposition(
    req: SearchComposition,
  ): Promise<CompositionResponse[] | Error> {
    const SearchRequest = Validation.validate(
      CompesitionValidation.SEARCH_COMPESITION,
      req,
    );

    const data = await prisma.composition.findMany({
      where: {
        material: {
          material_name: { contains: SearchRequest.keywoard },
        },
      },
    });

    return data.length > 0
      ? await Promise.all(data.map((item) => toCompositionResponse(item)))
      : new ErrorHandler(404, "data noe found");
  }

  static async getAllComposition(): Promise<CompositionResponse[] | Error> {
    const data = await prisma.composition.findMany();
    return data.length > 0
      ? await Promise.all(data.map((item) => toCompositionResponse(item)))
      : new ErrorHandler(401, "Data is empty");
  }
}
