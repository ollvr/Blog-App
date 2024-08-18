const jwt = require("jsonwebtoken")
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const createError = require("../utils/errorUtils")

const createTokenAndSetCookie = (user,res) =>{
    const payload = {user:{id:user.id}}

    const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"1h"})

    res.cookie("token",token,{
        httpOnly:true,
        secure:false,
        sameSite:"strict"
    })

    return token
}


exports.register = async(req,res,next) => {
    const {username,email,password} = req.body
    try {
        let user = await User.findOne({email})
        if(user){
            createError("User already exist",400)
        }
        user = new User({username,email,password})
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password,salt)
        await user.save()
        createTokenAndSetCookie(user,res)
        res.status(201).json({user:{id:user.id,username:user.username,email:user.email}})
    } catch (error) {
     next(error)
    }
}

exports.login = async(req,res,next) =>{
    const {email,password} = req.body 
    try {
       
        let user =  await User.findOne({email})
        if(!user){
            createError("Invalid credentials",400)
           
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){ 
            createError("Invalid credentials",400)
        }
        createTokenAndSetCookie(user,res)
        res.status(200).json({user:{id:user.id,username:user.username,email:user.email}})
    } catch (error) {
      next(error)
    }
}


exports.logout = (req,res) =>{
    res.cookie("token",'',{
        httpOnly:true,
        expires:new Date(0),
        sameSite:"strict",
        secure:false
    })

    res.status(200).json({message:"Logged out succufully"})
}