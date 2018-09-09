import express from "express";
import bodyParser from "body-parser";
import config from "./config";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Empty like your soul!");
});

app.listen(process.env.PORT || config.port);
