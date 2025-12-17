import express from "express";
import cors from "cors";
import apiRoutes from "./routes/apiRoutes";

const app = express();
app.use(cors());

app.use(express.json());
app.use("/api", apiRoutes);

app.listen(3000, () => console.log("Running..."));