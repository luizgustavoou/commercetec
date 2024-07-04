import { prismaClient } from "../../infra/database/prismaClient";
import { KafkaSendMessage } from "../../infra/providers/kafka/producer";

type CreateCustomerRequest = {
  name: string;
  password: string;
  email: string;
  phone: string;
};

export class CreateCustomerUseCase {
  constructor() {}

  async execute(data: CreateCustomerRequest) {
    const customer = await prismaClient.customer.findFirst({
      where: {
        email: data.email,
      },
    });

    if (customer) {
      throw new Error("Customer already exists!");
    }

    const customerCreated = await prismaClient.customer.create({
      data: {
        ...data,
      },
    });

    const kafkaProducer = new KafkaSendMessage();

    await kafkaProducer.execute("CUSTOMER_CREATED", {
      id: customerCreated.id,
      email: customerCreated.email,
    });

    return customerCreated;
  }
}
