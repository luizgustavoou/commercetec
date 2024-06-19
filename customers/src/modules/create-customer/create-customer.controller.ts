import { Request, Response } from "express";
import { CreateCustomerUseCase } from "./create-customer.usecase";

export class CreateCustomerController {
  constructor() {}

  async handle(request: Request, response: Response) {
    try {
      const useCase = new CreateCustomerUseCase();

      const result = await useCase.execute(request.body);
      return response.status(201).json(result);
    } catch (err) {
      return response.status(400).json(err);
    }
  }
}
