import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

LocationSchema.index({ city: 1, province: 1, country: 1 }, { unique: true });

export default mongoose.model("Location", LocationSchema);
