import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

// import passport from "passport";
import cors from "cors";
// import { Strategy } from "passport-facebook";

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
// app.use(passport.initialize());

// passport.use(new Strategy({
//   clientID: process.env.FACEBOOK_APP_ID,
//   clientSecret: process.env.FACEBOOK_APP_SECRET,
//   callbackURL: "http://localhost:8080/auth/facebook/callback"
// }, (accessToken, refreshToken, profile, done) => {
//   console.log("hereeee", accessToken, refreshToken, profile);
//   done(null);
// }));

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
