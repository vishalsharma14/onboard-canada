import mongoose from "mongoose";

const User = new mongoose.Schema({
  name: String,
});

const UserModel = mongoose.model("UserModel", User);

export default UserModel;
