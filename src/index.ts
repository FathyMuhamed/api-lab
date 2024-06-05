import express, { Application } from "express";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import {
  errorMiddleware,
  notFoundMiddleware,
} from "./middleware/error.middleware";
import { config } from "./config";
const PORT = config.port || 3000;

const app: Application = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(rateLimit((config.rateLimit as any) || {}));

app.get("/", (_, res) => {
  throw new Error("An error occurred");
  res.status(200).json({ message: "Hello World!" });
});

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
