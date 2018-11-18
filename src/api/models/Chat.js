import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
  chatGroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ChatGroup",
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: mongoose.Schema.Types.String,
  },
  file: {
    type: mongoose.Schema.Types.String,
  },
  timestamp: {
    type: mongoose.Schema.Types.Date,
    default: Date.now,
  },
});


export default mongoose.model("Chat", ChatSchema);
