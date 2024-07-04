import express from "express";
import { router } from "./routes";

import "./infra/providers/kafka/consumers";

const app = express();

const PORT = process.env.PORT ?? 3002;

app.use(express.json());

app.use(router);

app.listen(PORT, () => console.log(`Server order is running on PORT ${PORT}`));
