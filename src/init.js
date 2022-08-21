import "dotenv/config";
// require("dotenv").config();
import "./db.js";
import Book from "./models/Book.js";
import Member from "./models/Member.js";
import Meeting from "./models/Meeting.js";
import app from "./server.js";

const PORT = 4000;

const handleListening = () => {
  console.log(`Server listening on port: ${PORT}`);
}

app.listen(PORT, handleListening);