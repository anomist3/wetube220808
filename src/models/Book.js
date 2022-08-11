import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  bookImg: String,
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  translator: { type: String, trim: true },
  publisher: { type: String, trim: true },
  hashtags: [{ type: String, trim: true }],
  meta: {
    readCount: { type: Number, default: 0 },
    wishCount: { type: Number, default: 0 },
    isMeetingDone: { type: Boolean, default: false },
    comments: [
      { type: Object }
    ],
    createdAt: { type: Date, default: Date.now },
  },
});

const Book = mongoose.model("Book", bookSchema);

export default Book;