import User from "../models/User";
import UserProfile from "../models/UserProfile";
import { sign } from "../helpers/jwt";


const createUserProfile = (user) => {
  const userProfile = new UserProfile();
  userProfile.user = user;
  userProfile.save();
};

export default {
  register(req, res) {
    const user = new User();
    user.email = req.body.email;
    user.password = req.body.password;
    user.name = req.body.name;
    res.statusCode = 400;
    if (req.body.email == null || req.body.email === ""
      || req.body.password == null || req.body.password === ""
      || req.body.name == null || req.body.name === "") {
      res.json({ success: false, message: "Values missing." });
    } else {
      user.save((err) => {
        if (err) {
          res.json({ success: false, message: err.message });
        } else {
          const token = sign(user.email, user.id);
          createUserProfile(user);
          res.statusCode = 201;
          res.json({ success: true, message: "User Successfully created.", token });
        }
      });
    }
  },

  login(req, res) {
    User.findOne({ email: req.body.email })
      .exec((err, user) => {
        res.statusCode = 401;
        if (err) {
          throw err;
        } else if (!user) {
          res.json({ success: false, message: "Failed to authenticate." });
        } else if (user && req.body.password) {
          const validPassword = user.comparePassword(req.body.password);
          if (!validPassword) {
            res.json({ success: false, message: "Password invalid." });
          } else {
            const token = sign(user.email, user.id);
            res.statusCode = 200;
            res.json({
              success: true,
              message: "Password valid.",
              token,
              user: user.getUserDetails(),
            });
          }
        } else {
          res.json({ success: false, message: "Fields missing." });
        }
      });
  },

  users(req, res) {
    User.find({})
      .exec((err, users) => {
        res.statusCode = 401;
        if (err) {
          throw err;
        } else {
          res.json(users);
        }
      });
  },

};
