import express from "express";

const projectRouter = express.Router();

import authMiddleware from "../middlewares/auth.middleware.js";
import errorMiddleware from "../middlewares/error.middleware.js";
import {
  createProject,
  getProject,
} from "../controllers/project.controller.js";

projectRouter.post("/create", authMiddleware, errorMiddleware, createProject);
projectRouter.get("/getAll", authMiddleware, errorMiddleware, getProject);

export default projectRouter;
