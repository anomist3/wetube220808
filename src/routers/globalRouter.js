import express from "express";
import { getJoin, postJoin, getLogin, postLogin, startGithubLogin, finishGithubLogin, logout } from "../controllers/memberController";
import { showDashboard } from "../controllers/meetingController";
import { searchBook } from "../controllers/bookController";
import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get("/", showDashboard);
globalRouter.get("/search", searchBook);
globalRouter.route("/join")
  .all(publicOnlyMiddleware)
  .get(getJoin)
  .post(postJoin);
globalRouter.route("/login")
  .all(publicOnlyMiddleware)
  .get(getLogin)
  .post(postLogin);
globalRouter.route("/login/github/start")
  .get(publicOnlyMiddleware, startGithubLogin);
globalRouter.route("/login/github/finish")
  .get(publicOnlyMiddleware, finishGithubLogin);
globalRouter.get("/logout", protectorMiddleware, logout);

export default globalRouter;