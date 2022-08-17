import mongoose from "mongoose";


const MeetingSchema = new mongoose.Schema({
  bookTitle: { type: String, required: true, unique: true },
  bookAuthor: { type: String, required: true },
  bookTranslator: String,
  bookPublisher: String,
  book: { type: Object },
  leader: { type: String, required: true },
  participants: [Object],
  questions: [
    { type: String }
  ],
  isMeetingDone: { type: Boolean, default: false },
  hashtags: [{ type: String }],
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Member" },
  date: String
});

MeetingSchema.static("formatHashtags", (hashtags) => {
  return hashtags.split(",").map((word) => (word.startsWith("#") ? word : `#${word}`));
});

const Meeting = mongoose.model("Meeting", MeetingSchema);

export default Meeting;