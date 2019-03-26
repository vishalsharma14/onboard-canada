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


app.use("/", router);


// Catch unhandled exception and log/report errors
// Prevents node server from stopping
process.on("uncaughtException", (err) => {
  console.log("Caught exception: ", err);
  // TODO: Add error handler/ reporting
});


// MongoDB
const dbUser = process.env.MONGO_USER;
const dbPassword = encodeURIComponent(process.env.MONGO_PASSWORD);
const dbHost = process.env.DATABASE_HOST;
const dbName = process.env.DATABASE_NAME;

const dbCredentials = dbUser ? `${dbUser}:${dbPassword}@` : "";

mongoose.connect(`mongodb://${dbCredentials}${dbHost}/${dbName}`, (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log("MONGODB CONNECTION SUCCESSFUL!");
  }
});

// Debug mode for Mongo DB
if (process.env.DEVELOPMENT) {
  mongoose.set("debug", true);
}

app.listen(process.env.PORT || config.port);
