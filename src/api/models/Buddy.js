import mongoose from "mongoose";

import { BUDDY_STATUS } from "../constants";


const BuddySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  addedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: mongoose.Schema.Types.String,
    required: true,
    default: BUDDY_STATUS.PENDING_STATUS,
  },
});

BuddySchema.index({ user: 1, addedUser: 1 }, { unique: true });

export default mongoose.model("Buddy", BuddySchema);
