import mongoose from "mongoose";


const UserSettingsSchema = new mongoose.Schema({
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
  settings: {
    mobile: {
      type: mongoose.Schema.Types.Boolean,
      default: false,
    },
    facebookUrl: {
      type: mongoose.Schema.Types.Boolean,
      default: false,
    },
    email: {
      type: mongoose.Schema.Types.Boolean,
      default: false,
    },
  },
});

export default mongoose.model("UserSettings", UserSettingsSchema);
