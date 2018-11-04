import mongoose from "mongoose";

const PENDING_STATUS = "Pending";
const APPROVED_STATUS = "Approved";
const REJECTED_STATUS = "Rejected";
const REMOVED_STATUS = "Removed";


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
    default: PENDING_STATUS,
  },
});

BuddySchema.index({ user: 1, addedUser: 1 }, { unique: true });

export default mongoose.model("Buddy", BuddySchema);
