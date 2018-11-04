import UserProfile from "../models/UserProfile";


const getMatchedResults = (userProfile, userProfiles, res) => {
  let results = [];
  userProfiles.map((userProfileObj) => {
    if (userProfileObj.institution && userProfileObj.origin
      && userProfile.institution && userProfile.origin) {
      const userObj = {
        id: userProfileObj.user.id,
        name: userProfileObj.user.name,
        email: userProfileObj.user.email,
        origin: `${userProfileObj.origin.city}, ${userProfileObj.origin.province}, ${userProfileObj.origin.country}`,
        institution: userProfileObj.institution.name,
        destination: `${userProfileObj.institution.location.city}, ${userProfileObj.institution.location.province}, ${userProfileObj.institution.location.country}`,
        score: 0,
      };
      if (userProfileObj.institution.location.equals(userProfile.institution.location)) {
        userObj.score += 4;
      } else if (userProfileObj.institution.location.country
        === userProfile.institution.location.country) {
        userObj.score += 1;
        if (userProfileObj.institution.location.province
          === userProfile.institution.location.province) {
          userObj.score += 1;
        }
      }
      if (userProfileObj.institution.equals(userProfile.institution)) {
        userObj.score += 2;
      }
      if (userProfileObj.origin.country === userProfile.origin.country) {
        userObj.score += 0.5;
        if (userProfileObj.origin.province === userProfile.origin.province) {
          userObj.score += 0.5;
          if (userProfileObj.origin.city === userProfile.origin.city) {
            userObj.score += 0.5;
          }
        }
      }
      if (userProfileObj.program === userProfile.program) {
        userObj.score += 2;
      }
      if (userProfileObj.session === userProfile.session) {
        userObj.score += 2;
      }
      results.push(userObj);
    }
  });
  results = results.sort((a, b) => {
    // Compare the 2 objects
    if (a.score < b.score) return 1;
    if (a.score > b.score) return -1;
    return 0;
  });
  res.json(results);
};

export default {

  getMatches(req, res) {
    const userId = req.decoded.id.toString();
    UserProfile.findOne({ user: userId })
      .populate("origin")
      .populate({
        path: "institution",
        populate: {
          path: "location",
        },
      })
      .exec((err, userProfile) => {
        if (err) {
          throw err;
        } else {
          UserProfile.find({ user: { $ne: userId } })
            .populate({ path: "user", select: "name email" })
            .populate("origin")
            .populate({
              path: "institution",
              populate: {
                path: "location",
              },
            })
            .exec((error, userProfiles) => {
              if (error) {
                throw error;
              } else {
                getMatchedResults(userProfile, userProfiles, res);
                // res.json({ userProfiles });
              }
            });
        }
      });
  },
};
