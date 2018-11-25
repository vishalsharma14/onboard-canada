// import passport from "passport";
import express from "express";
import multer from "multer";

import authenticate from "./middlewares/authenticate";
import BuddyController from "./controllers/BuddyController";
import ChatGroupController from "./controllers/ChatGroupController";
import FeedbackController from "./controllers/FeedbackController";
import InstitutionController from "./controllers/InstitutionController";
import LocationController from "./controllers/LocationController";
import MatchController from "./controllers/MatchController";
import MessageController from "./controllers/MessageController";
import UserController from "./controllers/UserController";
import UserProfileController from "./controllers/UserProfileController";
import UserSettingsController from "./controllers/UserSettingsController";

// To get form-data file in req object
const upload = multer();

const router = express.Router();

// router.get("/auth/facebook", passport.authenticate("facebook"));

// router.get('/auth/facebook/callback',
//   passport.authenticate('facebook', {
//     successRedirect: '/login',
//     failureRedirect: '/login'
//   }));

router.get("/", (req, res) => {
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

router.get("/user/:userId", UserProfileController.getUserProfile);
router.get("/profile", UserProfileController.getProfile);
router.post("/update-profile", UserProfileController.updateProfile);

router.get("/matches", MatchController.getMatches);

router.get("/sent-invitations", BuddyController.getSentInvitations);
router.get("/pending-invitations", BuddyController.getPendingInvitations);

router.route("/buddy")
  .get(BuddyController.getBuddies)
  .post(BuddyController.addBuddy)
  .patch(BuddyController.updateBuddy)
  .delete(BuddyController.removeBuddy);

router.route("/chat")
  .get(ChatGroupController.getChatGroups)
  .post(ChatGroupController.createNewChatGroup);

router.route("/chat/:chatGroup/message")
  .get(MessageController.getChatGroupMessages)
  .post(MessageController.postChatGroupMessage);

router.route("/chat/:chatGroup/file")
  .post(upload.single("file"), MessageController.attachFile);

router.route("/file/:fileName")
  .get(MessageController.getfileUrl);

router.post("/feedback", FeedbackController.saveFeedback);

router.post("/user-settings", UserSettingsController.updateUserSettings);

export default router;
