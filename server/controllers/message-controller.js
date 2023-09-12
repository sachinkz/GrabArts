const HttpError = require("../models/http-errors")
const Conversations=require('../models/conversations-model')
const Messages=require('../models/messages-model')
const Artist=require('../models/artist-model')
const mongoose = require("mongoose")


const makeConversations = async (req,res,next) => {
    const newConvo = new Conversations({
        members: [req.body.senderId, req.body.receiverId],
        messages:[]
    }) 
    
    let convoExist
    try {
      convoExist = await Conversations.findOne({
        members: { $all: [req.body.senderId, req.body.receiverId] },
      })
    } catch {
        return next(new HttpError("something went wrong"), 500)

    }

    if (convoExist)
    {
        res.json(convoExist)
        return next()
    }

    let newConversation;
    try
    {
        newConversation = await newConvo.save()
    } catch (err)
    {
        return next(new HttpError("something went wrong"), 500)
    }
    res.json(newConversation)
}

const getConversations = async( req,res,next) => {
    const artistId = req.params.artistId
    
    try
    {
        const allConversations = await Conversations.find({
          members: { $in: [artistId] },
        })
        allConversations.sort((a,b)=>b.updatedAt-a.updatedAt)
        res.json(allConversations)
    } catch (err)
    {
        return next(new HttpError("something went wrong"), 500)
    }
}

const makeMessage = async(req, res, next) => {
    const chat = new Messages({
        conversationId: req.body.conversationId,
        sender: req.body.sender,
        message:req.body.message
    })
    let convo;
    try
    {
        convo= await Conversations.findById(req.body.conversationId)
    } catch {

    }

    try
    {
        const session = await mongoose.startSession()
        session.startTransaction()
        let newChat=await chat.save({ session: session })
        convo.messages.push(newChat)
        await convo.save({ session: session })
        await session.commitTransaction()
        res.json(newChat)
    } catch (err)
    {
        return next(new HttpError("something went wrong"), 500)
    }
}


const getMessages = async (req, res, next) => {
    
    const convoId = req.params.conversationId
    try
    {
        let messages = await Messages.find({ conversationId: convoId })
        res.json(messages)
    } catch (err){
        return next(new HttpError("something went wrong"), 500)
    }
}

const getArtist = async (req,res,next) => {
    const artistId = req.params.artistId
    
    try
    {
        const artist = await Artist.findById(artistId, '-password -email -mobile -posts -following -followers -reviews')
        res.json(artist)
    } catch {
        return next(new HttpError('something went wrong'),500)
    }
}

exports.makeConversations = makeConversations;
exports.getConversations = getConversations;
exports.makeMessage = makeMessage;
exports.getMessages = getMessages;
exports.getArtist = getArtist
