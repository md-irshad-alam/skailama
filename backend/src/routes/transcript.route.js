import express from "express";

const transcriptRoute = express.Router();

import authMiddleware from "../middlewares/auth.middleware.js";
import errorMiddleware from "../middlewares/error.middleware.js";
import {
  transcriptController,
  getTranscript,
  updateTranscript,
  deleteTranscript,
} from "../controllers/transcript.controller.js";
transcriptRoute.post(
  "/create",
  authMiddleware,
  errorMiddleware,
  transcriptController
);
transcriptRoute.get("/getAll", authMiddleware, errorMiddleware, getTranscript);
transcriptRoute.put(
  "/update/:id",
  authMiddleware,
  errorMiddleware,
  updateTranscript
);
transcriptRoute.delete(
  "/delete/:id",
  authMiddleware,
  errorMiddleware,
  deleteTranscript
);

export default transcriptRoute;
