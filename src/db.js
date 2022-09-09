import mongoose from "mongoose";
import Book from "./models/Book";
import Member from "./models/Member";

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
const handleOpen = () => console.log("Connected to DB");
const handleError = (error) => console.log("DB Error", error);

db.on("error", (error) => console.log("DB Error", handleError));
db.once("open", handleOpen);