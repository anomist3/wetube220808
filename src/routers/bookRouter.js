import express from "express";
import { getAddBook, postAddBook, getSeeBook, getEditBook, postEditBook, deleteBook } from "../controllers/bookController";
import { protectorMiddleware } from "../middlewares";

const bookRouter = express.Router();

bookRouter.route("/add-book")
  .all(protectorMiddleware)
  .get(getAddBook)
  .post(postAddBook);
bookRouter.get("/:id/", getSeeBook);
bookRouter.route("/:id/edit")
  .all(protectorMiddleware)
  .get(getEditBook)
  .post(postEditBook);
bookRouter.route("/:id/delete")
  .get(protectorMiddleware, deleteBook);

export default bookRouter;