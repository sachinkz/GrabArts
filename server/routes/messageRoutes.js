const express = require("express")
const messageController = require("../controllers/message-controller")

const router = express.Router()

router.post("/", messageController.makeConversations)

router.get("/:artistId", messageController.getConversations)

router.post("/chat", messageController.makeMessage)

router.get("/chat/:conversationId", messageController.getMessages)

router.get("/profile/:artistId", messageController.getArtist)


module.exports = router

