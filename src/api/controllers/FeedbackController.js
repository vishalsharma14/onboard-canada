import Feedback from "../models/Feedback";


export default {
  saveFeedback(req, res) {
    const userId = req.decoded.id.toString();

    const { type, text } = req.body;
    if (!(type && text)) {
      return res.status(400).json({ message: "Fields missing" });
    }
    const feedback = new Feedback();
    feedback.user = userId;
    feedback.type = type;
    feedback.text = text;

    feedback.save((error) => {
      if (error) {
        throw error;
      } else {
        res.status(201).json(feedback);
      }
    });
  },
};
