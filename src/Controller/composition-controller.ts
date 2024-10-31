import { Response, Request, NextFunction } from "express";
import {
  CreateComposition,
  SearchComposition,
  UpdateComposition,
} from "../Model/compotition-model";
import { CompositionService } from "../Service/composition-service";

export class CompositionController {
  static async CreateComposition(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const UserRequest: CreateComposition = req.body as CreateComposition;
      const Response = await CompositionService.CreateComposition(UserRequest);
      return res.status(200).json(Response);
    } catch (e) {
      next(e);
    }
  }

  static async UpdateComposiion(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const UserRequest: UpdateComposition = req.body as UpdateComposition;
      UserRequest.id = Number(req.params.id);
      const response = await CompositionService.UpdateCompesition(UserRequest);
      return res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }

  static async DeleteComposition(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const id = Number(req.params.id);
      const response = await CompositionService.DeleteCompesition({ id });
      return res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }

  static async GetComposition(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const response = await CompositionService.getAllComposition();
      return res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }

  static async SearchComposition(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const keywoard: SearchComposition = req.query as SearchComposition;
      const response = await CompositionService.SearchComposition(keywoard);
      return res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }
}
