const express = require("express")
const adminController = require("../controllers/admin-controller")
const Topten=require("../models/topten-model")
const { check } = require("express-validator")

const router = express.Router()

router.get('/topten/:artistId',adminController.addToTopTen)

module.exports = router
