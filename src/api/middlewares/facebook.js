import axios from "axios";

export default function (req, res, next) {
  const { code, redirectUri } = req.body;
  const redirectUrl = `https://graph.facebook.com/v3.2/oauth/access_token?client_id=611081999307305&redirect_uri=${redirectUri}/&client_secret=dc3af539921ce14fa53da8bd2f7cf4d2&code=${code}`;

  console.log("REDIRECT", redirectUrl);
  axios.get(redirectUrl).then((response) => {
    const accessToken = response.data.access_token;
    const apiUrl = `https://graph.facebook.com/v3.0/me?access_token=${accessToken}&fields=email,picture,link,name`;
    axios.get(apiUrl).then((data) => {
      req.facebookData = data.data;
      next();
    }).catch((error) => {
      console.log("ERROR", error);
      res.status(400).json({ success: false, message: error.message });
    });
  }).catch((err) => {
    console.log("ERROR11111", err);

    res.status(400).json({ success: false, message: err.message });
  });
}
