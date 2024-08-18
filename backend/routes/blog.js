const express = require("express")
const {createBlog,getBlogs,getMyBlogs,updateBlog,deleteBlog} = require("../controllers/blogController")
const authMiddleware = require("../middleware/authMiddleware")
const router = express.Router()

router.post("/",authMiddleware,createBlog)
router.get("/",getBlogs)
router.get("/user",authMiddleware,getMyBlogs)
router.put("/:id",authMiddleware,updateBlog)
router.delete("/:id",authMiddleware,deleteBlog)

module.exports = router