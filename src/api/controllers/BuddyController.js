import Buddy from "../models/Buddy";
import UserProfile from "../models/UserProfile";


const APPROVED_STATUS = "Approved";
const PENDING_STATUS = "Pending";
const REJECTED_STATUS = "Rejected";
const REMOVED_STATUS = "Removed";


const userHasBuddyPermission = (userId => Buddy.find({ user: userId })
  .exec((err, buddies) => {
    if (err) {
      throw err;
    } else {
      return true;
    }
  }));

export default {

  getSentInvitations(req, res) {
    const userId = req.decoded.id;
    Buddy.find({ user: userId, status: PENDING_STATUS })
      .exec((err, buddies) => {
        if (err) {
          throw err;
        } else {
          const userBuddyMapping = {};
          const userIdList = buddies.map((buddy) => {
            if (buddy.user.toString() === userId) {
              userBuddyMapping[buddy.addedUser] = buddy.id;
              return buddy.addedUser;
            }
            userBuddyMapping[buddy.user] = buddy.id;
            return buddy.user;
          });
          UserProfile.find({ user: { $in: userIdList } })
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
                throw err;
              } else {
                const buddyList = userProfiles.map((userProfile) => {
                  return {
                    _id: userBuddyMapping[userProfile.user.id],
                    buddyProfile: userProfile,
                  };
                });
                res.json({ buddyList });
              }
            });
        }
      });
  },

  getPendingInvitations(req, res) {
    const userId = req.decoded.id;
    Buddy.find({ addedUser: userId, status: PENDING_STATUS })
      .exec((err, buddies) => {
        if (err) {
          throw err;
        } else {
          const userBuddyMapping = {};
          const userIdList = buddies.map((buddy) => {
            if (buddy.user.toString() === userId) {
              userBuddyMapping[buddy.addedUser] = buddy.id;
              return buddy.addedUser;
            }
            userBuddyMapping[buddy.user] = buddy.id;
            return buddy.user;
          });
          UserProfile.find({ user: { $in: userIdList } })
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
                throw err;
              } else {
                const buddyList = userProfiles.map((userProfile) => {
                  return {
                    _id: userBuddyMapping[userProfile.user.id],
                    buddyProfile: userProfile,
                  };
                });
                res.json({ buddyList });
              }
            });
        }
      });
  },

  getBuddies(req, res) {
    const userId = req.decoded.id;
    Buddy.find({
      $or: [{ addedUser: userId }, { user: userId }],
      status: APPROVED_STATUS,
    })
      .exec((err, buddies) => {
        if (err) {
          throw err;
        } else {
          const userBuddyMapping = {};
          const userIdList = buddies.map((buddy) => {
            if (buddy.user.toString() === userId) {
              userBuddyMapping[buddy.addedUser] = buddy.id;
              return buddy.addedUser;
            }
            userBuddyMapping[buddy.user] = buddy.id;
            return buddy.user;
          });
          UserProfile.find({ user: { $in: userIdList } })
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
                throw err;
              } else {
                const buddyList = userProfiles.map((userProfile) => {
                  return {
                    _id: userBuddyMapping[userProfile.user.id],
                    buddyProfile: userProfile,
                  };
                });
                res.json({ buddyList });
              }
            });
          // res.json({ userBuddyMapping });
        }
      });
  },

  addBuddy(req, res) {
    const buddy = new Buddy();
    buddy.user = req.decoded.id;
    buddy.addedUser = req.body.addedUser;
    res.statusCode = 400;
    if (req.body.addedUser == null || req.body.addedUser === "") {
      res.json({ success: false, message: "Values missing." });
    } else {
      buddy.save((err) => {
        if (err) {
          res.json({ success: false, message: err.message });
        } else {
          res.statusCode = 201;
          res.json({ success: true, message: "Buddy Added successfully!" });
        }
      });
    }
  },

  updateBuddy(req, res) {
    const { buddyId, status } = req.body;
    res.statusCode = 400;
    const validStatusList = [APPROVED_STATUS, REJECTED_STATUS];
    // console.log("PERMISSION", userHasBuddyPermission(req.decoded.id));
    // if (!userHasBuddyPermission(req.decoded.id)) {
    //   res.status(401).json({ success: false, message: "Permission Denied!" });
    // }
    if (buddyId == null || buddyId === "" || status == null || status === "") {
      res.json({ success: false, message: "Values missing." });
    } else if (!validStatusList.includes(status)) {
      res.json({ success: false, message: "Invalid value for status!" });
    } else {
      Buddy.findOneAndUpdate({ _id: buddyId },
        { status })
        .exec((err, doc) => {
          if (err) {
            throw err;
          } else {
            res.statusCode = 200;
            res.json({ success: true, message: "Status Updated successfully!" });
          }
        });
    }
  },

  removeBuddy(req, res) {
    const { buddyId } = req.body;
    res.statusCode = 400;
    if (buddyId == null || buddyId === "") {
      res.json({ success: false, message: "Values missing." });
    } else {
      Buddy.findOneAndUpdate({ _id: buddyId },
        { status: REMOVED_STATUS })
        .exec((err, buddies) => {
          if (err) {
            throw err;
          } else {
            res.status(200).json({ success: true, message: "Buddy Removed!" });
          }
        });
    }
  },


};
