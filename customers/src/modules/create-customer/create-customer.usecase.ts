import { prismaClient } from "../../infra/database/prismaClient";

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

    return customerCreated;
  }
}
