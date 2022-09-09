import express from "express";
import { getAddMeeting, postAddMeeting, getEditMeeting, postEditMeeting, deleteMeeting } from "../controllers/meetingController";
import { protectorMiddleware } from "../middlewares";

const meetingRouter = express.Router();

meetingRouter.route("/add")
  .all(protectorMiddleware)
  .get(getAddMeeting)
  .post(postAddMeeting);
meetingRouter.route("/:id/")
  .get(getEditMeeting)
  .post(postEditMeeting);
meetingRouter.get("/:id/delete", deleteMeeting);

export default meetingRouter;