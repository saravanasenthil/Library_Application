import express, { Application, Request, Response } from "express";
import { AppDataSource, checkConnection } from "./dbConfig";
import { userRoutes } from "./routes/userRouters";
import * as dotenv from "dotenv";
import { adminRoutes } from "./routes/adminRouters";
import cors from "cors";

dotenv.config();
const app: Application = express();
const PORT = process.env.PORT || 9002;

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,  // If you need to send cookies or authorization headers with the request
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());

// Apply routes after setting up CORS
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);

app.get("/", (req: Request, res: Response) => {
  return res.json({ message: "successssss" });
});

app.listen(PORT, () => {
  console.log(`listening in port ${PORT}`);
  checkConnection();
});
