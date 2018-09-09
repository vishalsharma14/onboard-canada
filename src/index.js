import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send({ name: "Onboarding Canada" });
});

app.listen(process.env.PORT || 3000, (data, err) => {
  if (err) {
    throw err;
  }
  console.log("Listening on 3000");
});
