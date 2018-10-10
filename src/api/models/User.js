import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "student",
  },
  is_active: {
    type: Boolean,
    required: true,
    default: true,
  },
});

// const UserModel = mongoose.model("UserModel", User);

// export default UserModel;

UserSchema.pre("save", function a(next) {
  const self = this;
  bcrypt.hash(self.password, 10, (err, hash) => {
    if (err) return next(err);
    self.password = hash;
    next();
  });
});

UserSchema.methods.comparePassword = function compare(password) {
  return bcrypt.compareSync(password, this.password);
};

export default mongoose.model("User", UserSchema);
