import mongoose from "mongoose";


const UserProfileSchema = new mongoose.Schema({
  origin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
  },
  program: {
    type: String,
  },
  session: {
    type: String,
  },
  institution: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Institution",
  },
  facebookUrl: {
    type: String,
  },
  profilePic: {
    type: String,
  },
});

export default mongoose.model("UserProfile", UserProfileSchema);
