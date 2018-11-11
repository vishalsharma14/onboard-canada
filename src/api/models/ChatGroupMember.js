import mongoose from "mongoose";

const ChatGroupMemberSchema = new mongoose.Schema({
  chatGroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ChatGroup",
  },
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});


export default mongoose.model("ChatGroupMember", ChatGroupMemberSchema);
