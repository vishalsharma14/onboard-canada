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

export default mongoose.model("Institution", InstitutionSchema);
