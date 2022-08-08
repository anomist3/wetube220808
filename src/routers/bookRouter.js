import express from "express";
import { addBook, seeBook, editBook, deleteBook } from "../controllers/bookController.js";

const bookRouter = express();

bookRouter.get("/add", addBook);
bookRouter.get("/:id(\\d+)/", seeBook);
bookRouter.get("/:id(\\d+)/edit", editBook);
bookRouter.get("/:id(\\d+)/delete", deleteBook);

export default bookRouter;