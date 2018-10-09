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
  console.log("hereee");
  console.log(self);
  console.log(next);
  console.log("heree222");
  bcrypt.hash(self.password, 10, (err, hash) => {
    if (err) return next(err);
    console.log("heree333");
    console.log(hash);
    self.password = hash;
    console.log("heree444");
    next();
    console.log("heree555");
  });
});

UserSchema.methods.comparePassword = function compare(password) {
  console.log("PASSOWRD MATCH", password, this.password);
  return bcrypt.compareSync(password, this.password);
};

export default mongoose.model("User", UserSchema);
