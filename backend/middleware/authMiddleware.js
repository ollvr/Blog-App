const jwt = require("jsonwebtoken")
const User = require("../models/User")
const createError = require("../utils/errorUtils")
const authMiddleware = async(req,res,next) =>{
    const token = req.cookies.token
   
    try {
        if(!token){
            createError("Access denied . Please Log in to continue",401)
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = await User.findById(decoded.user.id).select("-password")
        if(!req.user){
            createError("there seems to be a problem with your login , please try logging in again",404)
        }
        next()
    } catch (error) {
        if(error.name == "JsonWebTokenError"){
            error.message = "Invalid session , please log in again"
            error.statusCode = 401
        }
        else if (error.name == "TokenExpiredError"){
            error.message = "Your session has expired , please log in again"
            error.statusCode = 401
        }
        next(error)
    }
}

module.exports = authMiddleware