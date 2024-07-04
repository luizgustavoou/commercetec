import { prismaClient } from "../../infra/database/prismaClient";
import { KafkaSendMessage } from "../../infra/providers/kafka/producer";

type UpdateOrderRequest = {
  id: string;
  status: string;
};

export class UpdateOrderUseCase {
  constructor() {}

  async execute(data: UpdateOrderRequest) {
    // Requisição para API de produtos para verificar se tem estoque do produto
    // axios.get('/products')

    const orderUpdate = await prismaClient.order.update({
      data: {
        status: data.status,
      },
      where: {
        id: data.id,
      },
    });

    const kafkaSendMessage = new KafkaSendMessage();

    await kafkaSendMessage.execute("ORDER_STATUS", {
      customerId: orderUpdate.customerId,
      status: orderUpdate.status,
    });

    return orderUpdate;
  }
}
