import UserProfile from "../models/UserProfile";

export default {
  getProfile(req, res) {
    const userId = req.decoded.id.toString();
    UserProfile.findOne({ user: userId }).exec((err, userProfile) => {
      if (err) {
        throw err;
      } else {
        res.json(userProfile);
      }
    });
  },
};
