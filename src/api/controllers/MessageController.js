import Chat from "../models/Chat";
import { getPresignedUrl, uploadFile } from "../helpers/fileUpload";

export default {

  /**
   * API to get group chat/ individual chat messages
   * @param {*} req Request Object
   * @param {*} res Response Object
   */
  getChatGroupMessages(req, res) {
    // TODO: Add a check to verify user has access to the chatGroup
    const { chatGroup } = req.params;

    Chat.find({ chatGroup })
      .populate("chatGroup")
      .populate({ path: "sender", select: "_id name email" })
      .sort("timestamp")
      .exec((err, chatMessages) => {
        if (err) {
          throw err;
        } else {
          res.json({ chatMessages });
        }
      });
  },

  /**
   * API to post new message in a chat group
   * @param {*} req Request Object
   * @param {*} res Response Object
   * Sample Data Payload: {"message": "Message Text"}
   */
  postChatGroupMessage(req, res) {
    const userId = req.decoded.id;

    const { chatGroup } = req.params;
    const { message } = req.body;
    if (!message || message === "") {
      res.status(400).json("Invalid Input");
    }
    const chat = new Chat();
    chat.chatGroup = chatGroup;
    chat.sender = userId;
    chat.message = message;

    chat.save((err) => {
      if (err) {
        throw err;
      } else {
        res.status(201).json(chat);
      }
    });
  },

  /**
   * API to post new file in a chat group
   * @param {*} req Request Object
   * @param {*} res Response Object
   * Sample Data Payload: {"file": Attached File}
   */
  attachFile(req, res) {
    const userId = req.decoded.id;
    const { chatGroup } = req.params;
    uploadFile(req.file).then((response) => {
      if (response.success !== true) {
        res.json(response);
        return;
      }
      const chat = new Chat();
      chat.chatGroup = chatGroup;
      chat.sender = userId;
      chat.file = response.fileName;

      chat.save((err) => {
        if (err) {
          throw err;
        } else {
          res.status(201).json(chat);
        }
      });
    });
  },

  /**
   * API to get pre signed URL for the file
   * @param {*} req Request Object
   * @param {*} res Response Object
   */
  getfileUrl(req, res) {
    const { fileName } = req.params;
    const fileUrl = getPresignedUrl(fileName);
    res.json(fileUrl);
  },

};
