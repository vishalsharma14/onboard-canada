import UserProfile from "../models/UserProfile";
import UserSettings from "../models/UserSettings";

export default {
  getProfile(req, res) {
    const userId = req.decoded.id.toString();
    UserProfile.findOne({ user: userId })
      .populate({ path: "user", select: "name email" })
      .populate("origin")
      .populate({
        path: "institution",
        populate: {
          path: "location",
        },
      })
      .exec((err, userProfile) => {
        if (err) {
          throw err;
        } else {
          res.json(userProfile);
        }
      });
  },

  updateProfile(req, res) {
    const requestData = req.body;

    const userId = req.decoded.id.toString();
    UserProfile.findOne({ user: userId }).exec((err, userProfile) => {
      if (err) {
        throw err;
      } else {
        userProfile.mobile = requestData.mobile ? requestData.mobile : userProfile.mobile;
        // if (requestData.mobile) {
        //   userProfile.mobile = requestData.mobile;
        // }
        if (requestData.origin) {
          userProfile.origin = requestData.origin;
        }
        if (requestData.institution) {
          userProfile.institution = requestData.institution;
        }
        if (requestData.facebookUrl) {
          userProfile.facebookUrl = requestData.facebookUrl;
        }
        userProfile.program = requestData.program ? requestData.program : userProfile.program;
        userProfile.session = requestData.session ? requestData.session : userProfile.session;
        userProfile.save((error) => {
          if (error) {
            throw error;
          } else {
            res.json(userProfile);
          }
        });
      }
    });
  },

  getUserProfile(req, res) {
    const profileUserId = req.params.userId;
    UserSettings.findOne({ user: profileUserId }).exec((err, userSettings) => {
      if (err) {
        throw err;
      } else {
        let excluded = "";
        let selectedUserFields = "name";
        if (userSettings) {
          excluded += (userSettings.settings.mobile === false ? "-mobile" : "");
          excluded += (userSettings.settings.facebookUrl === false ? " -facebookUrl" : "");
          selectedUserFields += (userSettings.settings.email === false ? "" : " email");
        } else {
          excluded = "-mobile -facebookUrl";
        }
        UserProfile.findOne({ user: profileUserId })
          .populate({ path: "user", select: selectedUserFields })
          .populate("origin")
          .populate({
            path: "institution",
            populate: {
              path: "location",
            },
          })
          .select(excluded)
          .exec((error, userProfile) => {
            if (error) {
              throw error;
            } else {
              res.json(userProfile);
            }
          });
      }
    });
  },
};
