import { verify } from "../helpers/jwt";

export default function (req, res, next) {
  const token = req.body.token || req.body.query || req.headers["x-access-token"];
  if (token) {
    const tokenObject = verify(token);
    if (tokenObject.isVerified) {
      req.decoded = tokenObject.decoded;
      next();
    } else {
      res.json({ success: false, message: "Invalid Token.", expired: true });
    }
  } else {
    res.json({ success: false, message: "No token provided." });
  }
}
