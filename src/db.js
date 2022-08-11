import mongoose from "mongoose";
import Book from "./models/Book.js";
import Member from "./models/Member.js";

mongoose.connect("mongodb://127.0.0.1:27017/worldClassicBookClub");

const db = mongoose.connection;
const handleOpen = () => console.log("Connected to DB");
const handleError = (error) => console.log("DB Error", error);

db.on("error", (error) => console.log("DB Error", handleError));
db.once("open", handleOpen);