const HttpError = require("../models/http-errors")
const { validationResult } = require("express-validator")
const Artist = require("../models/artist-model")
const Post = require("../models/post-model")
const Pricing = require("../models/pricing-model")
const Order = require("../models/order-model")
const mongoose = require('mongoose')
const bcrypt =require('bcryptjs')
const jwt=require('jsonwebtoken')


const artistHomePage = async (req, res, next) => {

  let posts;
  
  try
  {
    posts = await Post.find({})
      .populate("artistId", "-email -password -mobile")
      .populate("comments.artistId", "-email -password -mobile")
      .populate("likes.artistId", "-email -password -mobile").lean().exec()
    posts.sort((a, b) => b.createdAt - a.createdAt)
    posts.forEach((post) => {
      post.comments.sort((a, b) => b.createdAt - a.createdAt)
      post.likes.sort((a, b) => b.createdAt - a.createdAt)
    })
  } catch {
    return next(new HttpError('something went wrong couldnt load posts', 500))
  }
  res.json(posts);
}



const suggestedUsers = async (req, res, next) => {

  const loggedInUserId = req.artistData.artistId 

  let suggestions

  try {
    suggestions = await Artist.find({}).lean().exec()
  } catch (error) {
    return next(
      new HttpError("Something went wrong, couldn't load artists", 500)
    )
  }

  
  const loggedInUser = suggestions.find((user) =>
    user._id.equals(loggedInUserId)
  )

  const followingIds = loggedInUser.following.map((id) => id.toString())

  let usersNotFollowed = suggestions.filter(
    (user) => !followingIds.includes(user._id.toString())
  )
  usersNotFollowed=usersNotFollowed.filter(users=> !users._id.equals(loggedInUserId))

  res.json(usersNotFollowed)
}



const artistProfile = async(req,res,next) => {
  const artistId = req.params.artistId
  let artistDetails
  try
  {
    artistDetails = await Artist.findById(artistId).populate('posts').populate('reviews').lean().exec()
  } catch {
    return next(new HttpError('something went wrong couldnt fetch artist details',500))
  }
  res.json(artistDetails)
}



const artistSignUp = async (req, res, next) => {
  const validation = validationResult(req)

  if (!validation.isEmpty()) {
    return next(new HttpError("please provide valid datas", 422))
  }

  const { fname, lname, email, password, mobile } = req.body

  let alreadyExist
  try {
    alreadyExist = await Artist.findOne({ email: email })
  } catch {
    return next(new HttpError("something went wrong ", 500))
  }

  if (alreadyExist)
  {
    return next(new HttpError("Artist already exist,try loging in", 500))
  }
  let hashedPassword;
  try
  {
    hashedPassword=await bcrypt.hash(password,12)
  } catch {
    return next(new HttpError("something went wrong ", 500))
  }
    const createdArtist = new Artist({
      fname,
      lname,
      email,
      mobile,
      image:
        "https://thumbs.dreamstime.com/b/no-user-profile-picture-hand-drawn-illustration-53840792.jpg",
      password:hashedPassword,
      isVerified: false,
      isTopten: true,
      posts: [],
      reviews: [],
      followers: [],
      following: [],
    })
  
  try {
    await createdArtist.save()
  } catch {
    return next(new HttpError("something went wrong  ", 500))
  }

  let token;
  try
  {
    token = jwt.sign(
      {
        isArtist: true,
        artistId: createdArtist._id,
        email: createdArtist.email,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    )
  } catch {
    return next(new HttpError("something went wrong ", 500))
  }
  res.json({
    fname: createdArtist.fname,
    artistId: createdArtist._id,
    token,
  })
}




const artistLogin = async (req, res, next) => {

    const { email, password } = req.body
   
    let emailExist;
    try {
      emailExist = await Artist.findOne({ email: email })
    } catch {
      return next(new HttpError("something went wrong please try again", 500))
    }

    if (!emailExist)
    {
        return next (new HttpError('wrong email or password'),422)
    }

  let isValidPassword = false
  try
  {
    isValidPassword =await bcrypt.compare(password,emailExist.password)
  } catch (err){
    return next(new HttpError("something went wrong please try again"), 422)
  }

  if (!isValidPassword)
  {
    return next(new HttpError("wrong email or password"), 422)
  }


   let token
   try {
     token = jwt.sign(
       { isArtist: true, artistId: emailExist._id, email: emailExist.email },
       process.env.JWT_KEY,
       { expiresIn: "1h" }
     )
   } catch {
     return next(new HttpError("something went wrong", 500))
   }
  res.json({
    fname: emailExist.fname,
    artistId:emailExist._id,
     token,
   })
  
}

const createPost = async (req, res, next) => { 
    
    const {caption}=req.body

    const createdPost = new Post({
      caption,
      artistId:req.artistData.artistId,
      image:req.file.path,
      comments: [],
      likes: [],
    })
  
    let artist;
    try
    {
        artist = await Artist.findById(req.artistData.artistId)
    } catch {
        return next(new HttpError('oops someting went wrong,try again later'),500)
    }
    

    try
    {
        const session = await mongoose.startSession()
        session.startTransaction()
        await createdPost.save({ session: session })
        artist.posts.push(createdPost)
        await artist.save({ session: session })
        await session.commitTransaction()
    }
    catch {
        return next(new HttpError("something went wrong, posting image failed"))
    }
    res.json({message:"post created",createdPost})
}



const followArtist = async(req,res,next) => {
  const artistToFollow = req.params.artistId
  const loggedArtist = req.artistData.artistId

  let toFollow
  let follower
  try
  {
    toFollow = await Artist.findById(artistToFollow)   
    let alreadyFollowing = toFollow.followers.find(id => id.equals(loggedArtist))
    if(!alreadyFollowing){
      toFollow.followers.push(loggedArtist)
      await toFollow.save()
      follower = await Artist.findById(loggedArtist)
      follower.following.push(artistToFollow)
      await follower.save()
    } else
    {
      toFollow.followers.pull(loggedArtist)
      await toFollow.save()
      follower = await Artist.findById(loggedArtist)
      follower.following.pull(artistToFollow)
      await follower.save()
    }
  } catch {
    return next(new HttpError('something went wrong could not follow the artist'),500)
  }
  res.json({ message:'followed'})
}


const createPricing = async (req, res, next) => {
  let styles = req.body.styles;
  let artistId = req.artistData.artistId;

  const createdPricing = new Pricing({
    artistId,
    styles
  })
  try
  {
    createdPricing.save();

  } catch (err)
  {
    return next(new HttpError('something went wrong could not load Profile'),500)
  }
  res.json(createdPricing)
}



const getAllWorks = async(req,res,next) => {

  const artistId = req.params.artistId

  let works;
  let accWorks;
  try
  {
    works = await Order.find({ artistId:artistId,status:'paid' }).populate(
      "userId",
      "-email -password -mobile"
    ).lean().exec()
    accWorks = await Order.find({ artistId: artistId, status: "verified" })
      .populate("userId", "-email -password -mobile")
      .lean()
      .exec()

  } catch {
    return next(new HttpError('something went wrong',500))
  }
  res.json({works,accWorks})
}

const acceptWork=async( req,res,next)=> {
  const orderId = req.params.orderId
  console.log(orderId)
  try
  {
    await Order.findByIdAndUpdate(
      orderId,
      { status: "verified" },
      { new: true }
    )
  } catch {
    return next(new HttpError("something went wrong", 500))
  }
  res.json({message:'work accepted'})
}

const verifyArtist = async (req, res, next) => {
  const { pricing, artistAddress } = req.body
  const artistId = req.artistData.artistId
  
  try
  {
    let updated = await Artist.findByIdAndUpdate(artistId, { isVerified: true })
    console.log(updated)

  } catch {
    return next(new HttpError('something went wrong ',500))  
  }
  res.json({message:'done'})
}


exports.artistSignUp = artistSignUp;
exports.artistLogin = artistLogin;
exports.createPost = createPost;
exports.artistHomePage = artistHomePage
exports.suggestedUsers = suggestedUsers
exports.artistProfile = artistProfile
exports.followArtist = followArtist
exports.createPricing = createPricing
exports.getAllWorks = getAllWorks
exports.acceptWork = acceptWork
exports.verifyArtist = verifyArtist
