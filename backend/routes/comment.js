const express = require("express")
const {getComments,createComment,updateComment,deleteComment} = require("../controllers/commentController")
const authMiddleware = require("../middleware/authMiddleware")
const router = express.Router()

router.get("/",getComments)
router.post("/",authMiddleware,createComment)
router.put("/:id",authMiddleware,updateComment)
router.delete("/:id",authMiddleware,deleteComment)

module.exports = router