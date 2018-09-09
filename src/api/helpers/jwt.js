import jwt from "jsonwebtoken";
import config from "../../config";

export function sign(fields) {
  return jwt.sign(fields, config.secret, { expiresIn: "2h" });
}

export function verify(token) {
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return { isVerified: false, decoded: null };
    }
    return { isVerified: true, decoded };
  });
}
