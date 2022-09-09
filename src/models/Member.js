import bcrypt from "bcrypt";
import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  nickname: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  email: String,
  location: String,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  socialOnly: { type: Boolean, default: false },
  photoUrl: String,
  points: { type: Number, default: 0 },
  since: { type: Date, default: Date.now },
});

memberSchema.pre("save", async function () {
  const saltRounds = 10;

  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
});

const Member = mongoose.model("Member", memberSchema);


export default Member;