import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import UserModel from "./api/models/User";
import config from "./config";
import router from "./api/routes";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(process.env.PORT || config.port);

app.use("/", router);


// MongoDB
mongoose.connect("mongodb://localhost:27017/oacademy");
mongoose.set("debug", true);

// const u = new UserModel();
// u.name = "Vishal";
// u.save(); // works

console.log("users11");
UserModel.find({}, (err, users) => {
  console.log(users);
});

UserModel.deleteMany({});
