import { prismaClient } from "../../infra/database/prismaClient";

type CreateOrderRequest = {
  customerId: string;
  items: [{ productId: string; quantity: number }];
};

export class CreateOrderUseCase {
  constructor() {}

  async execute(data: CreateOrderRequest) {
    // Requisição para API de produtos para verificar se tem estoque do produto
    // axios.get('/products')

    const order = await prismaClient.order.create({
      data: {
        customerId: data.customerId,
        status: "PENDING",
        OrderItems: {
          createMany: {
            data: data.items,
          },
        },
      },
    });

    return order;
  }
}
