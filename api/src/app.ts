import express from "express";
import cors from "cors";
import apiRoutes from "./routes/apiRoutes";

interface UserToken{
  id: number,
  role: string,
  username: string
}

declare global {
  namespace Express {
    interface Request {
      user?: UserToken;
    }
  }
}

const app = express();
app.use(cors());

app.use(express.json());
app.use("/api", apiRoutes);

app.listen(3000, () => console.log("Running..."));