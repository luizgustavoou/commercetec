import { Request, Response } from "express";
import { UpdateOrderUseCase } from "./update-order.usecase";

export class UpdateOrderController {
  constructor() {}

  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const useCase = new UpdateOrderUseCase();
    const orderUpdate = await useCase.execute({ id, ...request.body });
    return response.json(orderUpdate);
  }
}
