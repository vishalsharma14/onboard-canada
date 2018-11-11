import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import config from "./config";
import router from "./api/routes";

dotenv.load();

const app = express();

app.use(cors());

// app.use(cors({
//   origin: "http://yourapp.com",
// }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(process.env.PORT || config.port);

app.use("/", router);

// Catch unhandled exception and log/report errors
// Prevents node server from stopping
process.on("uncaughtException", (err) => {
  console.log("Caught exception: ", err);
  // TODO: Add error handler/ reporting
});

// MongoDB

const dbUser = process.env.MONGO_USER;
// const dbPassword = encodeURIComponent(process.env.MONGO_PASSWORD);
console.log(dbUser, "DB USERRR");
// mongoose.connect(`mongodb://${dbUser}:${dbPassword}@ds125453.mlab.com:25453/onboard-mongo`);
// mongoose.set("debug", true);

mongoose.connect("mongodb://localhost:27017/oacademy", (err, data) => {
  if (err) {
    console.error(err);
  } else {
    // console.log(data);
  }
});
mongoose.set("debug", true);
