import { kafkaConsumer } from "../kafka.consumer";

type CustomerConsumer = {
  customerId: string;
  status: string;
};

export async function NotifictionUserConsumer() {
  console.log("CUSTOMER CONSUMER");

  const consumer = await kafkaConsumer("ORDER_STATUS");

  await consumer.run({
    eachMessage: async ({ message }) => {
      const messageToString = message.value!.toString();

      const statusConsumer = JSON.parse(messageToString) as CustomerConsumer;

      // Enviar mensagem por email
      console.log(
        `ATUALIZAÇÃO DE STATUS - Client: ${statusConsumer.customerId}\nStatus: ${statusConsumer.status}`
      );
    },
  });
}

NotifictionUserConsumer();
