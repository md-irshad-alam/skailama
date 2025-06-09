import express from "express";
const autroutes = express.Router();
import authController from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import errorMiddleware from "../middlewares/error.middleware.js";
autroutes.post("/register", authController.registerUser);
autroutes.post("/login", authController.loginUser);
autroutes.get(
  "/profile",
  authMiddleware,
  errorMiddleware,
  authController.userProfile
);
autroutes.get(
  "/logout",
  authMiddleware,
  errorMiddleware,
  authController.logoutUser
);
export default autroutes;
