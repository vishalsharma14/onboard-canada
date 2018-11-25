import passport from "passport";
import { Strategy } from "passport-facebook";


passport.use(new Strategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:8000/auth/facebook/callback"
}, (accessToken, refreshToken, profile, done) => {
  console.log("hereeee", accessToken, refreshToken, profile);
}));

export default {

  /**
   * API to get group chat/ individual chat messages
   * @param {*} req Request Object
   * @param {*} res Response Object
   */
  getChatGroupMessages(req, res) {
    // TODO: Add a check to verify user has access to the chatGroup
    const { chatGroup } = req.params;

    Chat.find({ chatGroup })
      .populate("chatGroup")
      .populate({ path: "sender", select: "_id name email" })
      .sort("timestamp")
      .exec((err, chatMessages) => {
        if (err) {
          throw err;
        } else {
          res.json({ chatMessages });
        }
      });
  },

};
