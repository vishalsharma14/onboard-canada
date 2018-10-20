import mongoose from "mongoose";

const InstitutionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
  },
});

InstitutionSchema.index({ name: 1, location: 1 }, { unique: true });

export default mongoose.model("Institution", InstitutionSchema);
