import mongoose from "mongoose";

const ChatGroupSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  lastMessageAt: {
    type: mongoose.Schema.Types.Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: mongoose.Schema.Types.Date,
    default: Date.now,
  },
});

export default mongoose.model("ChatGroup", ChatGroupSchema);
