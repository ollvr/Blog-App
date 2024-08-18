const Blog = require("../models/Blog")
const createError = require("../utils/errorUtils")

exports.createBlog = async(req,res,next) =>{
    try {
        const {title,content} = req.body 
        if(!title || !content) {
            createError("Please provide both a title and content for your blog")
        }
        const newBlog = new Blog({title,content,author:req.user._id})
        await newBlog.save()
        res.status(201).json(newBlog)
    } catch (error) {
        next(error)
    }
}

exports.getMyBlogs = async(req,res,next) => {
    try {
        const blogs = await Blog.find({author:req.user._id})
        res.status(200).json(blogs)
    } catch (error) {
        next(error)
    }
}

exports.getBlogs = async(req,res,next) => {
    try {
        const blogs = await Blog.find().populate("author","username")
        /*

        without populate
        {
            "_id" : "blog123",
            "author":"user123",
            comments : ["comment123"]
        }

        with populate : 
         {
            "_id" : "blog123",
            "author": {"_id" : "user123" , "username" : "omar"},
            comments : ["comment123"]
        }

        */

        res.status(200).json(blogs)
    } catch (error) {
        next(error)
    }
}

exports.updateBlog = async(req,res,next) => {
    try {
        const {id} = req.params
        const blog = await Blog.findById(id)
        if(!blog){
            createError("the requested blog could not be found",404)
        }

        if(blog.author.toString() !== req.user.id){
            createError("You do not have permission to update this blog",403)
        }
        const {title,content} = req.body
        if(title) blog.title= title
        if(content) blog.content = content 
        await blog.save()
        res.status(200).json(blog)
    } catch (error) {
        next(error)
    }
}

exports.deleteBlog = async (req,res,next) => {
 try {
    const blog = await Blog.findById(req.params.id)
    if(!blog){
        createError("the requested blog could not be found",404)
    }

    if(blog.author.toString() !== req.user.id){
        createError("You do not have permission to delete this blog",403)
    }
    await blog.deleteOne()
    res.status(200).json({message:'blog deleted succefully'})

 } catch (error) {
    next(error)
 }
}