import express from "express";
import { router } from "./routes";

const app = express();

const PORT = process.env.PORT ?? 3003;
app.use(express.json());
app.use(router);

app.listen(PORT, () =>
  console.log(`Server product is running on PORT ${PORT}`)
);
