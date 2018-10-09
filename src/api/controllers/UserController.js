import User from "../models/User";
import { sign } from "../helpers/jwt";

export default {
  register(req, res) {
    const user = new User();
    user.email = req.body.email;
    user.password = req.body.password;
    if (req.body.email == null || req.body.email === "" || req.body.password == null || req.body.password === "") {
      res.json({ success: false, message: "Values missing." });
    } else {
      user.save((err) => {
        if (err) {
          res.json({ success: false, message: err.message });
        } else {
          const token = sign(user.email, user.id);
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
            res.json({ success: true, message: "Password valid.", token });
          }
        } else {
          res.json({ success: false, message: "Fields missing." });
        }
      });
  },

  users(req, res) {
    try {
      const results = User.find({}).exec((err, users) => {
        console.log(users);
        res.json(users);
      });
    } catch (err) {
      throw err;
    }
  },
};
