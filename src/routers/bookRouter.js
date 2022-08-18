import express from "express";
import { getAddBook, postAddBook, getSeeBook, getEditBook, postEditBook, deleteBook } from "../controllers/bookController.js";
import { protectorMiddleware, uploadVideo } from "../middlewares.js";

const bookRouter = express.Router();

bookRouter.route("/add-book")
  .all(protectorMiddleware)
  .get(getAddBook)
  .post(uploadVideo.single("videoUrl"), postAddBook);
bookRouter.get("/:id/", getSeeBook);
bookRouter.route("/:id/edit")
  .all(protectorMiddleware)
  .get(getEditBook)
  .post(postEditBook);
bookRouter.route("/:id/delete")
  .get(protectorMiddleware, deleteBook);

export default bookRouter;