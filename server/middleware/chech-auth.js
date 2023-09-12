const HttpError = require("../models/http-errors");
const jwt=require('jsonwebtoken')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS')
    {
        return next();
    }
    try
    {
        const token = req.headers.authorization 
        if (!token)
        {
        throw new HttpError("Authentication failed no token",401)
        }
        const decodedToken = jwt.verify(token, process.env.JWT_KEY)
        if (decodedToken.artistId)
        { 
            req.artistData={artistId:decodedToken.artistId}
        }
        if (decodedToken.userId)
        {
            req.userData = { userId: decodedToken.userId }
        }
        next();
    } catch (err)
    {
         return next(new HttpError("Authentication failed", 401))
    }
}