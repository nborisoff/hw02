import { Router } from "express";
import { clearDb } from "./clearDbController";
import { authMiddleware } from "../posts/middlewares";

export const testingRouter = Router();

testingRouter.delete("/all-data", authMiddleware, clearDb);
