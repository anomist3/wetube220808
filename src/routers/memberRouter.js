import express from "express";
import { seeMember, addMember, editMember, deleteMember, logout } from "../controllers/memberController.js";

const memberRouter = express.Router();

memberRouter.get("/add", addMember);
memberRouter.get("/:id(\\d+)", seeMember);
memberRouter.get("/:id(\\d+)/edit", editMember);
memberRouter.get("/:id(\\d+)/delete", deleteMember);
memberRouter.get("/:id(\\d+)/logout", logout);

export default memberRouter;