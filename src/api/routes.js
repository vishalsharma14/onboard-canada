import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Empty like your soul!");
});

router.get("/login/", (req, res) => {
  res.send("Empty like your soul!");
});

export default router;
