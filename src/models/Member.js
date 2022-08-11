import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  since: Number
});

const Member = mongoose.model("Member", memberSchema);

export default Member;