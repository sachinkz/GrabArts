const HttpError = require("../models/http-errors")
const { validationResult } = require("express-validator")
const User = require("../models/user-model")
const Artist = require("../models/artist-model")
const Order = require("../models/order-model")
const Post = require("../models/post-model")
const Review = require("../models/reviews-model")
const Pricing = require("../models/pricing-model")
const Rorder = require("../models/rpOrder-model")
const SuccessRpay = require("../models/successRpays")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const mongoose = require("mongoose")
const Razorpay=require('razorpay')



var instance = new Razorpay({
  key_id: "rzp_test_OcJOekB7dEDYqX",
  key_secret: "hj038MOLCLyzQrIuAi2G0kor",
})


const getTopArtists = async (req, res, next) => {

  let TopTens;
  try
  {
    TopTens=await Artist.find({isTopten:true}).populate('posts').lean().exec()
  } catch {
    return next (new HttpError('something went wrong',500))
  }
  res.json(TopTens)
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

const getArtistProfile = async (req, res, next) => {
  const artistId = req.params.artistId
  let artistDetails
  let artistPricing
  try {
    artistDetails = await Artist.findById(artistId)
      .populate("posts")
      .populate("reviews")
      .lean()
      .exec()
    artistPricing = await Pricing.findOne({ artistId: artistId })
  } catch {
    return next(
      new HttpError("something went wrong couldnt fetch artist details", 500)
    )
  }
  res.json({artistDetails,artistPricing})
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

const orderWork = async (req, res, next)=>{
  const validation = validationResult(req)
  if (!validation.isEmpty())
  {
    return next(new HttpError('please provide valid details', 422))
  }

  const {userId,artistId,paper,face,style,name,mobile,address1,address2,pin,city,district,suggestion} = req.body
  
  let amount
  if (paper !== '' && face !== '' &&style!=='')
  {
    let item = paper + "_" + face
    let pricing = await Pricing.findOne({ artistId: artistId })
    pricing = pricing.styles.find(s => s.style === style)
    amount=pricing[item]
  } else
  {
    return next(new HttpError('please provide the details',500))
  }

  const createdOrder = new Order({
    userId,
    artistId,
    name,
    style,
    paper,
    face,
    mobile,
    address1,
    address2,
    pin,
    city,
    district,
    suggestion,
    image: req.file.path,
    status:'not-paid',
    amount:amount
  })
  try
  {
    await createdOrder.save()
  } catch {
    return next(new HttpError('something went wrong ,could not place the Order'),500)
  }

  let razorpay
  try
  {
    var options = {
      amount: createdOrder.amount *100, // amount in the smallest currency unit
      currency: "INR",
      receipt: createdOrder._id,
    }
    razorpay = await instance.orders.create(options)
    let rpOrder = new Rorder({ ...razorpay })
    await rpOrder.save()
  } catch {
    return next(new HttpError('something went wrong ,could not place the Order'),500)
  }
  res.json({ order: createdOrder, rp: razorpay })
  
}




const verifyPayment = async (req, res, next) => {

  const { response, rporder } = req.body


  let hmac = crypto.createHmac("sha256", "hj038MOLCLyzQrIuAi2G0kor")
  hmac.update(response.razorpay_order_id + "|" + response.razorpay_payment_id)
  hmac=hmac.digest('hex')

  if (hmac === response.razorpay_signature)
  {
    let success = new SuccessRpay({ ...response })
    await success.save();


    let updatedOrder;
    try
    {
      updatedOrder = await Order.findByIdAndUpdate(
        rporder.receipt,
        { status: "paid" },
        { new: true }
      )
      console.log(updatedOrder)

      res.json({success:true,order:updatedOrder})
    } catch {
      return next (new HttpError('something went wrong ',500))
    }
  } else
  {
    res.json({message:'payment failed'})
  }

}


///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

const postReview = async (req, res, next) => {
    
  const { artistId, userId, review } = req.body
  
  const createdReview = new Review({ artistId, userId, review })
  
  let reviewExist;
  let artist;
  try
  {
    reviewExist = await Review.findOne({ userId: userId });
    artist=await Artist.findById(artistId)
  } catch {
    return next(new HttpError("something went wrong,couldnt post review"),500)
  }

  if (reviewExist)
  {
    return next(new HttpError("already posted a review"),422)
  }

  try
  {
    const session = await mongoose.startSession()
    session.startTransaction()
    await createdReview.save({ session: session })
    artist.reviews.push(createdReview)
    await artist.save({ session: session })
    await session.commitTransaction()

  } catch {
    return next(new HttpError("something went wrong,couldnt post review"),500)
  }

  res.json({message:"review posted",createdReview})
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

const likePost = async (req, res, next) => {
  const postId = req.body.postId
  const artistId = req.body.artistId


  let post;
  let exist;
  try
  {
    post = await Post.findById(postId)
    exist = post.likes.find((id) => id.artistId.equals(artistId))
  } catch {
    return next(new HttpError("something went wrong, like failed"),500)
  }

  if (!exist)
  {
    try
    {
      await Post.findByIdAndUpdate(postId, { $push: { likes: { artistId } } })
      post = await Post.findById(postId).populate("likes.artistId")
      res.json({ liked:true,likes:post.likes })

    } catch {
      return next(new HttpError("something went wrong, like failed"), 500)
    }
  } else
  {
    try
    {
      await Post.findByIdAndUpdate(postId, { $pull: { likes: { artistId } } })
      post = await Post.findById(postId).populate('likes.artistId')
      res.json({ liked: false, likes: post.likes })
      
    } catch {
      return next(new HttpError("something went wrong, like failed"), 500)
    }
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
const commentPost = async (req, res, next) => {

  const {comment,artistId,postId}=req.body

  const createdComment = {
    comment,artistId
  }

  let post
  try
  {
    post = await Post.findById(postId)
    post.comments.push(createdComment)
    post.save()
    post = await Post.findById(postId).populate("comments.artistId",'-email -password -mobile')
  } catch {
    return next(new HttpError('something went wrong',500))
  }

  res.json(post.comments)

 }

///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

const userSignup = async (req, res, next) => { 

  
  const validation = validationResult(req)

  if (!validation.isEmpty()) {
    return next(new HttpError("please provide valid datas", 422))
  }

  const { fname, lname, email, password } = req.body


  let alreadyExist
  try {
    alreadyExist = await User.findOne({ email: email })
  } catch {
    return next(new HttpError("something went wrong 1", 500))
  }

  if (alreadyExist) {
    return next(new HttpError("Artist already exist,try loging in", 500))
  }

  let hashedPassword
  try {
    hashedPassword = await bcrypt.hash(password, 12)
  } catch {
    return next(new HttpError("something went wrong ", 500))
  }

  const createdUser = new User({
    fname,
    lname,
    email,
    password: hashedPassword,
    reviews: [],
  })

  try {
    {
      await createdUser.save()
    }
  } catch (error){
    return next(new HttpError("something went wrong  3", 500))
  }

  let token
  try {
    token = jwt.sign(
      {
        isUser: true,
        userId: createdUser._id,
        email: createdUser.email,
      },
      "ClassifiedTopGsecretCode",
      { expiresIn: "1h" }
    )
  } catch(error)
  {
    return next(new HttpError("something went wrong 4", 500))
  }
  res.json({
    fname: createdUser.fname,
    userId: createdUser._id,
    token,
  })

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

const userLogin = async(req, res, next) => {

    const { email, password } = req.body

    let emailExist
    try {
      emailExist = await User.findOne({ email: email })
    } catch {
      return next(new HttpError("something went wrong please try again", 500))
    }

    if (!emailExist) {
      return next(new HttpError("wrong email or password"), 422)
    }

    let isValidPassword = false
    try {
      isValidPassword = await bcrypt.compare(password, emailExist.password)
    } catch (err) {
      return next(new HttpError("something went wrong please try again"), 422)
    }

    if (!isValidPassword) {
      return next(new HttpError("wrong email or password"), 422)
    }

    let token
    try {
      token = jwt.sign(
        { isUser: true, userId: emailExist._id, email: emailExist.email },
        "ClasssifiedTopGsecretCode",
        { expiresIn: "1h" }
      )
    } catch {
      return next(new HttpError("something went wrong", 500))
    }
    res.json({
      fname: emailExist.fname,
      userId: emailExist._id,
      token,
    })
  
}

const getPricing = async (req, res, next) => {
  const artistId = req.params.artistId
  let pricing
  try {
    pricing =await Pricing.findOne({ artistId: artistId }).lean().exec()
  } catch {
    return next(
      new HttpError("something went wrong could not find Pricing"),
      500
    )
  }
  res.json(pricing)
}



const getAllOrders =async (req,res,next) => {
  const userId = req.params.userId
  
  let allOrders
  try
  {
    allOrders = await Order.find({ userId: userId}).populate(
      "artistId",
      "-email -password -mobile"
    ).lean().exec()

    allOrders = allOrders.filter((order) => order.status !== "not-paid")
    allOrders = allOrders.sort((a, b) => b.createdAt - a.createdAt)
    
  } catch {
    return next(
      new HttpError("something went wrong could not find order history"),
      500
    )
  }
  res.json(allOrders)
}


exports.getTopArtists = getTopArtists;
exports.userSignup = userSignup;
exports.orderWork = orderWork;
exports.likePost = likePost;
exports.postReview = postReview;
exports.getArtistProfile = getArtistProfile;
exports.userLogin = userLogin;
exports.commentPost = commentPost;
exports.getPricing = getPricing;
exports.verifyPayment = verifyPayment;
exports.getAllOrders = getAllOrders