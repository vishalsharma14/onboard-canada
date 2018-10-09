import jwt from "jsonwebtoken";
import config from "../../config";

export function sign(email, id) {
  return jwt.sign({ email, id }, config.secret, { expiresIn: "2h" });
}

export function verify(token) {
  console.log("token", token);
  const response = jwt.verify(token, config.secret, (err, decoded) => {
    console.log("errr", err, decoded);
    if (err) {
      return { isVerified: false, decoded: null };
    }
    console.log("FINALLLL");
    return { isVerified: true, decoded };
  });
  return response;
}
