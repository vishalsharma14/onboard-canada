import { verify } from "../helpers/jwt";

export default function (req, res, next) {
  const token = req.body.token || req.body.query || req.headers.authorization;
  // console.log(req.headers, "HEASD");
  // console.log("TOKEN", token);
  // console.log(req.headers.authorization);
  // console.log(req.headers.Authorization);
  if (token) {
    console.log(token);
    const tokenObject = verify(token);
    console.log("TOKEN OBJJJ", tokenObject);
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
