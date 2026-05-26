const express =
  require("express");

const router =
  express.Router();

const {
  createChat,
  addMessage,
  getChats,
} = require(
  "../controllers/chatController"
);

router.post(
  "/create",
  createChat
);

router.post(
  "/message",
  addMessage
);

router.get(
  "/:userId",
  getChats
);

module.exports =
  router;