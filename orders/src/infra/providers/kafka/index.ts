import { Kafka, logLevel } from "kafkajs";

const kafka = new Kafka({
  brokers: ["neat-ox-8614-us1-kafka.upstash.io:9092"],
  ssl: true,
  sasl: {
    mechanism: "scram-sha-256",
    username: "bmVhdC1veC04NjE0JILdKq2J-ESVfI15OnC-xk_xJpQL2bomSKFWsuVH_QLIfv8",
    password: "ZGFmZGJlYjMtNDk2Zi00ZGU0LWEwZjAtNTEyZTFlZDVlZGEw",
  },
  logLevel: logLevel.ERROR,
});

export { kafka };
