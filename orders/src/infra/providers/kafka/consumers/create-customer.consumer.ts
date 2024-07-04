import { prismaClient } from "../../../database/prismaClient";
import { kafkaConsumer } from "../kafka.consumer";

type CustomerConsumer = {
  id: string;
  email: string;
};

export async function createCustomerConsumer() {
  console.log("CUSTOMER CONSUMER");

  const consumer = await kafkaConsumer("CUSTOMER_CREATED");

  await consumer.run({
    eachMessage: async ({ message }) => {
      const messageToString = message.value!.toString();

      const customer = JSON.parse(messageToString) as CustomerConsumer;

      await prismaClient.customer.create({
        data: {
          externalId: customer.id,
          email: customer.email,
        },
      });
    },
  });
}

createCustomerConsumer();
