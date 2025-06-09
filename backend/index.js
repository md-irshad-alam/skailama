import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import autroutes from "./src/routes/auth.routes.js";
import connection from "./src/config/db.js";
import projectRouter from "./src/routes/project.routes.js";
import transcriptRoute from "./src/routes/transcript.route.js";
const port = process.env.PORT || 8080;

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000", // dynamic origin
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", autroutes);

app.use("/api/project", projectRouter);
app.use("/api/transcript", transcriptRoute);

app.listen(port, () => {
  try {
    connection();
    console.log("server is live");
  } catch (error) {
    throw new Error("Server Internal Error", error);
  }
});
