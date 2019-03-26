import { verify } from "../helpers/jwt";

export default function (req, res, next) {
  const token = req.body.token || req.body.query || req.headers.authorization;
  if (token) {
    const tokenObject = verify(token.replace("Bearer ", ""));
    if (tokenObject.isVerified) {
      req.decoded = tokenObject.decoded;
      next();
    } else {
      res.statusCode = 401;
      res.json({ success: false, message: "Invalid Token.", expired: true });
    }
  } else {
    res.statusCode = 401;
    res.json({ success: false, message: "No token provided." });
  }
}
