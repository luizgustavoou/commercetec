import { Request, Response } from "express";
import { CreateProductUseCase } from "./create-product.usecase";

export class CreateProductController {
  constructor() {}

  async handle(request: Request, response: Response) {
    try {
      const useCase = new CreateProductUseCase();

      const result = await useCase.execute(request.body);
      return response.status(201).json(result);
    } catch (err) {
      return response.status(400).json(err);
    }
  }
}
