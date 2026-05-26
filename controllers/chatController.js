const Chat =
  require("../models/Chat");

exports.createChat =
  async (req, res) => {
    try {
      const chat =
        await Chat.create({
          userId:
            req.body.userId,

          title:
            "New Chat",

          messages: [],
        });

      res.json(chat);

    } catch (err) {
      res.status(500).json(err);
    }
  };
  exports.addMessage =
  async (req, res) => {
    try {
      const {
        chatId,
        role,
        content,
      } = req.body;

      const chat =
        await Chat.findById(
          chatId
        );

      chat.messages.push({
        role,
        content,
      });

      await chat.save();

      res.json(chat);

    } catch (err) {
      res.status(500).json(err);
    }
  };
  exports.getChats =
  async (req, res) => {
    try {
      const chats =
        await Chat.find({
          userId:
            req.params.userId,
        }).sort({
          updatedAt: -1,
        });

      res.json(chats);

    } catch (err) {
      res.status(500).json(err);
    }
  };