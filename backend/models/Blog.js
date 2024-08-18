const mongoose = require("mongoose")

const BlogShema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    comments: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }]
},{timestamps:true})

module.exports = mongoose.model("Blog",BlogShema)