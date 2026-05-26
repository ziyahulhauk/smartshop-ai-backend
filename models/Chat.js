const mongoose =
  require("mongoose");

const chatSchema =
  new mongoose.Schema(
    {
      userId: String,

      title: String,

      messages: [
        {
          role: String,
          content: String,
        },
      ],
    },

    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Chat",
    chatSchema
  );