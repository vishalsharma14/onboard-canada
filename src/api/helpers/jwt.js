import jwt from "jsonwebtoken";
import config from "../../config";

export function sign(email, id) {
  return jwt.sign({ email, id }, config.secret, { expiresIn: "2h" });
}

export function verify(token) {
  const response = jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return { isVerified: false, decoded: null };
    }
    return { isVerified: true, decoded };
  });
  return response;
}
