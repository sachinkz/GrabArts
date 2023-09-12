const HttpError = require("../models/http-errors")
const { validationResult } = require("express-validator")
const TopTen = require('../models/topten-model')
const Artist = require('../models/artist-model')
const mongoose = require("mongoose")

const addToTopTen = async (req, res, next) => {
    const artistId = req.params.artistId
    const topten = new TopTen({ artistId })
    let exist, artist;
    
  try{
      exist = await TopTen.findOne({ artistId: artistId })
      artist = await Artist.findById(artistId)
  } catch {
      return next(new HttpError("something went wrong", 500))
    }
    
    if (exist)
    {
        return next(new HttpError("artist already in top 10", 500))
    }

    try
    {
        const session = await mongoose.startSession()
        session.startTransaction()
        await topten.save({ session: session })
        artist.isTopten = true;
        await artist.save({ session: session })
        await session.commitTransaction()
    } catch {
        return next(new HttpError("something went wrong", 500))
    }
    res.json({artist,exist})
}



exports.addToTopTen=addToTopTen