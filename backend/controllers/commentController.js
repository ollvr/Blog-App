const Comment = require("../models/Comment")
const Blog = require("../models/Blog")
const createError = require("../utils/errorUtils")

exports.getComments = async(req,res,next) => {
    try {
        const {blogId} = req.query
        /*
            localhost:4000/api/comments?blogId=1584849846
        */
       if(!blogId){
        createError("Please specify a blog to view comments",400)
       }
       const blog = await Blog.findById(blogId).populate({
         path:"comments",
         populate:{path:"author",select:"username"}
       })
       /*
        [
       {
            "_id" : "comment123",
            "content":"@everyone",
            "author": {"_id" : "user123","username":"omar"},
            "blog" : "blog126359"
       }
       ]
       */
      if(!blog){
        createError("the requested blog could not be found",404)
      }
      res.status(200).json(blog.comments)
    } catch (error) {
        next(error)
    }
}

exports.createComment = async(req,res,next) =>{
  try {
    const {content , blogId} = req.body
    const blog = await Blog.findById(blogId)
    if(!blog){
      createError("the requested blog could not be found",404)
    }
    if(!content) {
      createError("Comment content cannot be empty",400)
    }
    const newComment = new Comment({content,author:req.user.id,blog:blogId})
    await newComment.save()

    blog.comments.push(newComment._id)
    await blog.save()
    res.status(201).json(newComment)
  } catch (error) {
    next(error)
  }
}

exports.updateComment = async(req,res,next) => {
  try {
    const comment = await Comment.findById(req.params.id)
    if(!comment){
      createError("the requested comment could not be found",404)
    }
    if(comment.author.toString() !== req.user.id){
      createError("you do not have permission to update this comment ",403)
    }
    const {content} = req.body
    if(content) comment.content = content
    await comment.save()
    res.status(200).json(comment)
  } catch (error) {
    next(error)
  }
}

exports.deleteComment = async(req,res,next) =>{
  try {
    const comment = await Comment.findById(req.params.id)
    if(!comment){
      createError("the requested comment could not be found",404)
    }
    if(comment.author.toString() !== req.user.id){
      createError("you do not have permission to delete this comment ",403)
    }
    await comment.deleteOne()
    const blog = await Blog.findById(comment.blog)
    blog.comments = blog.comments.filter( commentId => commentId.toString() !== req.params.id)
    await blog.save()
    res.status(200).json({message:"comment deleted succufully"})
  } catch (error) {
    next(error)
  }
}