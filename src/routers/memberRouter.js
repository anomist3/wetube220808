import express from "express";
import {
  seeMember, addMember, editMember, deleteMember, getMyProfile, postMyProfile, getChangePassword,
  postChangePassword, getSeeOtherMemberProfile
} from "../controllers/memberController";
import { protectorMiddleware, uploadPhoto, } from "../middlewares";

const memberRouter = express.Router();

memberRouter.get("/add", addMember);
memberRouter.route("/profile/:id")
  .all(protectorMiddleware)
  .get(getMyProfile)
  .post(uploadPhoto.single("photo"), postMyProfile);
memberRouter.route("/profile/other/:id")
  .get(getSeeOtherMemberProfile);
memberRouter.route("/profile/:id/change-password")
  .all(protectorMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);
memberRouter.get("/:id", seeMember);
memberRouter.get("/:id/edit", protectorMiddleware, editMember);
memberRouter.get("/:id/delete", protectorMiddleware, deleteMember);

export default memberRouter;