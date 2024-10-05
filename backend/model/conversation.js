const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    groupTitle: {
      type: String,
    },
    members: {
      type: [String], // Array of user IDs
      required: true,
    },
    lastMessage: {
      type: String,
    },
    lastMessageId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", conversationSchema);
