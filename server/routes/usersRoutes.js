const express = require("express")
const userController = require('../controllers/user-controller')
const fileUpload =require('../middleware/file-upload')
const { check } = require("express-validator")


const router = express.Router()

router.post(
  "/signup",
  [
    check("fname").not().isEmpty(),
    check("lname").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  userController.userSignup
)

router.post("/login", userController.userLogin)

router.get("/top-artists", userController.getTopArtists)

router.post(
  "/order",
  fileUpload.single("image"),
  [
    check("name").not().isEmpty(),
    check("face").not().isEmpty(),
    check("paper").not().isEmpty(),
    check("city").not().isEmpty(),
    check("district").not().isEmpty(),
    check("pin").not().isEmpty(),
    check("address1").not().isEmpty(),
    check("address2").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("mobile").isMobilePhone("any", { strictMode: false }),
  ],
  userController.orderWork
)


router.post("/verify-payment", userController.verifyPayment)

router.post("/review",userController.postReview)

router.post("/like",userController.likePost)

router.post("/comment",userController.commentPost)

router.get("/artistprofile/:artistId", userController.getArtistProfile)

router.get("/pricing/:artistId", userController.getPricing) 

router.get("/all-orders/:userId", userController.getAllOrders) 




module.exports = router