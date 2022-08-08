import express from "express";
import { addMeeting, editMeeting, deleteMeeting } from "../controllers/meetingController.js";

const meetingRouter = express();

meetingRouter.get("/add", addMeeting);
meetingRouter.get("/:id(\\d+)/edit", editMeeting);
meetingRouter.get("/:id(\\d+)/delete", deleteMeeting);

export default meetingRouter;