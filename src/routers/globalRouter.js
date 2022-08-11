import express from "express";
import { join, login } from "../controllers/memberController.js";
import { showDashboard } from "../controllers/meetingController.js";

const globalRouter = express.Router();

globalRouter.get("/", showDashboard);
globalRouter.get("/join", join);
globalRouter.get("/login", login);

export default globalRouter;