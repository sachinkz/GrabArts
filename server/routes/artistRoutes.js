const express = require("express")
const artistController = require("../controllers/artist-controller")
const fileUpload = require('../middleware/file-upload')
const { check } = require("express-validator")
const checkAuth = require('../middleware/chech-auth')

const router = express.Router()

router.post(
  "/signup",
  [
    check("fname").not().isEmpty(),
    check("lname").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
    check("mobile").isLength({ min: 10, max: 10 }),
  ],
  artistController.artistSignUp
)

router.post("/login", artistController.artistLogin)
  
router.use(checkAuth);  //Autherized routes below the authorization middleware

router.get("/home", artistController.artistHomePage)

router.get("/suggestions", artistController.suggestedUsers)

router.post("/post", fileUpload.single("image"), artistController.createPost)

router.get('/profile/:artistId', artistController.artistProfile)

router.get('/follow/:artistId',artistController.followArtist) 

router.post('/pricing', artistController.createPricing) 

router.get('/works/:artistId', artistController.getAllWorks) 

router.get('/accept/:orderId', artistController.acceptWork) 

router.get("/verification", artistController.verifyArtist) 


module.exports = router;
