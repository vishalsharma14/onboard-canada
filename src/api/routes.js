import express from "express";

import InstitutionController from "./controllers/InstitutionController";
import LocationController from "./controllers/LocationController";
import UserController from "./controllers/UserController";
import UserProfileController from "./controllers/UserProfileController";
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
router.use(authenticate);

router.get("/users", UserController.users);

router.get("/locations", LocationController.getLocations);
router.post("/create-location", LocationController.createLocation);

router.get("/institutions", InstitutionController.getInstitutions);
router.post("/create-institution", InstitutionController.createInstitution);

router.get("/profile", UserProfileController.getProfile);
router.post("/update-profile", UserProfileController.updateProfile);

export default router;
