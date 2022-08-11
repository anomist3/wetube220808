import express from "express";
import { getAddBook, postAddBook, getSeeBook, getEditBook, postEditBook, deleteBook } from "../controllers/bookController.js";

const bookRouter = express.Router();

bookRouter.route("/add-book")
  .get(getAddBook)
  .post(postAddBook);
bookRouter.get("/:id/", getSeeBook);
bookRouter.route("/:id/edit")
  .get(getEditBook)
  .post(postEditBook);
bookRouter.get("/:id/delete", deleteBook);

export default bookRouter;