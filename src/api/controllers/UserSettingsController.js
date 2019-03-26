import UserSettings from "../models/UserSettings";


export default {

  getUserSettings(req, res) {
    const userId = req.decoded.id.toString();
    const reqData = req.body;

    UserSettings.findOne({ user: userId }).exec((err, userSettings) => {
      if (err) {
        throw err;
      } else if (userSettings) {
        res.json(userSettings);
      } else {
        const userSettingsObj = new UserSettings();
        userSettingsObj.user = userId;
        userSettingsObj.save((error) => {
          if (error) {
            throw error;
          } else {
            res.status(200).json(userSettingsObj);
          }
        });
      }
    });
  },

  updateUserSettings(req, res) {
    const userId = req.decoded.id.toString();
    const reqData = req.body;

    const settings = {
      mobile: reqData.mobile,
      facebookUrl: reqData.facebookUrl,
      email: reqData.email,
    };

    UserSettings.findOne({ user: userId }).exec((err, userSettings) => {
      if (err) {
        throw err;
      } else if (userSettings) {
        userSettings.settings = settings;
        userSettings.save((error) => {
          if (error) {
            throw error;
          } else {
            res.status(200).json(userSettings);
          }
        });
      } else {
        const userSettingsObj = new UserSettings();
        userSettingsObj.settings = settings;
        userSettingsObj.user = userId;
        userSettingsObj.save((error) => {
          if (error) {
            throw error;
          } else {
            res.status(201).json(userSettingsObj);
          }
        });
      }
    });
  },
};
