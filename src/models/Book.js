import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  videoUrl: String,
  bookImg: String,
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  translator: { type: String, trim: true },
  publisher: { type: String, trim: true },
  description: String,
  hashtags: [{ type: String, trim: true }],
  readCount: { type: Number, default: 0 },
  wishCount: { type: Number, default: 0 },
  isMeetingDone: { type: Boolean, default: false },
  comments: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Comment" }
  ],
  ISBN: Number,
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "Member" },
});

bookSchema.static("formatHashtags", (hashtags) => {
  return hashtags.split(",").map((word) => (word.startsWith("#") ? word : `#${word}`));
});

const Book = mongoose.model("Book", bookSchema);

export default Book;