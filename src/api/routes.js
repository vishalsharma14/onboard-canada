import express from "express";
import UserController from "./controllers/UserController";
import authenticate from "./middlewares/authenticate";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Empty like your soul!");
});

router.get("/login/", (req, res) => {
  res.send("Empty like your soul!");
});


router.post("/register", UserController.register);
router.post("/login", UserController.login);
// router.use(authenticate);

router.get("/users", authenticate, UserController.users);

export default router;
