import User from "../models/User";
import { sign } from "../helpers/jwt";
import UserProfile from "../models/UserProfile";

export default {

  /**
   * API to handle facebook callback
   * @param {*} req Request Object
   * @param {*} res Response Object
   */
  facebook(req, res) {
    // TODO: Add a check to verify user has access to the chatGroup
    User.findOne({ email: req.facebookData.email }).exec((err, user) => {
      if (err) {
        res.status(500).json({ success: false, message: err.message });
      }
      const facebookUserId = req.facebookData.id;
      const profilePicUrl = `https://graph.facebook.com/v3.0/${facebookUserId}/picture?type=large`;
      if (user) {
        const token = sign(user.email, user.id);

        res.json({
          success: true,
          message: "Facebook Login valid.",
          token,
          user: user.getUserDetails(),
          profilePic: profilePicUrl,
        });

        UserProfile.findOne({ user: user.id }).exec((error, userProfile) => {
          if (error) {
            throw error;
          }
          userProfile.profilePic = profilePicUrl;
          userProfile.save((err1) => {
            if (err1) {
              throw err1;
            }
          });
        });
      } else {
        const userObj = new User();
        userObj.email = req.facebookData.email;
        userObj.password = "O@c@demy";
        userObj.name = req.facebookData.name;
        userObj.save((err1) => {
          if (err1) {
            res.status(500).json({ success: false, message: err1.message });
          } else {
            const token = sign(userObj.email, userObj.id);
            const userProfile = new UserProfile();
            userProfile.user = userObj;
            userProfile.profilePic = profilePicUrl;
            userProfile.save((e) => {
              res.status(201).json({
                success: true,
                message: "Facebook User Successfully created.",
                token,
                user: userObj,
              });
            });
          }
        });
      }
    });
  },

};
