import ChatGroup from "../models/ChatGroup";
import ChatGroupMember from "../models/ChatGroupMember";

export default {

  /**
   * API to create new group chat/ individual chat
   * It creates a ChatGroup and ChatGroupMember objects for each user
   * @param {*} req Request Object
   * @param {*} res Response Object
   * Sample Data Payload: { "memberIds": ["userId1", "userId2"] }
   */
  createNewChatGroup(req, res) {
    const userId = req.decoded.id;
    const { memberIds } = req.body;
    const chatGroup = new ChatGroup();
    chatGroup.createdBy = userId;
    chatGroup.save((err) => {
      if (err) {
        throw err;
      } else {
        // Validating Input Data
        if (!(memberIds && Array.isArray(memberIds))) {
          res.status(400).json({ error: "Values missing/ Incorrect Format" });
        }
        // Create group members
        const user = new ChatGroupMember({
          chatGroup,
          member: userId,
        });
        const chatGrpMembers = memberIds.map(memberId => new ChatGroupMember({
          chatGroup,
          member: memberId,
        }));
        chatGrpMembers.push(user);

        // Save Group members
        ChatGroupMember.collection.insert(chatGrpMembers, (error, docs) => {
          if (error) {
            throw error;
          } else {
            res.status(201).json({ members: docs.ops });
          }
        });
      }
    });
  },

  /**
   * API to return all the user chat groups
   * @param {*} req Request Object
   * @param {*} res Response Object
   */
  getChatGroups(req, res) {
    const userId = req.decoded.id;

    ChatGroupMember.find({ member: userId })
      .distinct("chatGroup")
      .exec((err, chatGroups) => {
        if (err) {
          throw err;
        } else {
          ChatGroupMember.find({ chatGroup: { $in: chatGroups } })
            // .sort({ "chatGroup.lastMessageAt": "desc" })
            .populate("chatGroup")
            .populate({ path: "member", select: "_id name email" })
            .exec((error, chatGroupMembers) => {
              const result = {};
              chatGroupMembers.map((chatGrpMember) => {
                if (!result[chatGrpMember.chatGroup.id]) {
                  result[chatGrpMember.chatGroup.id] = [{ member: chatGrpMember.member }];
                } else {
                  result[chatGrpMember.chatGroup.id].push({ member: chatGrpMember.member });
                }
              });
              res.json({ chatGroups: result });
            });
        }
      });
  },

};

// ChatGroupMember.aggregate([
//   { $match: { chatGroup: { $in: chatGroups } } },
//   {
//     $group: {
//       _id: "$chatGroup",
//       members: {
//         $push: {
//           member: "$member",
//         },
//       },
//     },
//   },
// ], (error, chatGroupMembers) => {
//   console.log("IN HERE", chatGroupMembers);
//   res.json(chatGroupMembers);
// });
