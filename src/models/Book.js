import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  videoUrl: String,
  bookImg: String,
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  translator: { type: String, trim: true },
  publisher: { type: String, trim: true },
  hashtags: [{ type: String, trim: true }],
  readCount: { type: Number, default: 0 },
  wishCount: { type: Number, default: 0 },
  isMeetingDone: { type: Boolean, default: false },
  comments: [
    { type: String }
  ],
  ISBN: Number,
  createdAt: { type: Date, default: Date.now },
});

bookSchema.static("formatHashtags", (hashtags) => {
  return hashtags.split(",").map((word) => (word.startsWith("#") ? word : `#${word}`));
});

const Book = mongoose.model("Book", bookSchema);

export default Book;