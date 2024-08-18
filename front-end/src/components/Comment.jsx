/* eslint-disable no-unused-vars */
import React, {useEffect , useState} from 'react'
import {useDispatch , useSelector} from "react-redux"
import {fetchComments , addComment , updateComment,deleteComment} from "../features/comments/commentSlice"

function Comment({blogId}) {
  const [commentText , setCommentText] = useState("")
  const [editingCommentId , setEditingCommentId] = useState(null)
  const [updateText , setUpdateText] = useState("")
  const [menuOpen , setMenuOpen] = useState(null)
  const dispatch = useDispatch()
  const commentState = useSelector((state) => state.comments)
  const {comments , loading , error} = commentState
  const authState = useSelector((state) => state.auth)
  const {user} = authState

  useEffect(() => {
    dispatch(fetchComments(blogId))
  },[dispatch,blogId])

  const handleCommentSubmit = async(e) => {
    e.preventDefault();
    const action = await dispatch(addComment({blogId,content:commentText}))
    if(action.type === "comments/addComment/fulfilled"){
      setCommentText("")
      dispatch(fetchComments(blogId))
    }
  }

  const handleUpdateComment = async(e,id) => {
    e.preventDefault()
    const action = await dispatch(updateComment({id,content:updateText}))
    if(action.type === "comments/updateComment/fulfilled"){
      setEditingCommentId(null)
      setUpdateText("")
      dispatch(fetchComments(blogId))
    }
  }

  const handleDeleteComment = async(e,id) => {
    e.preventDefault()
    const action = await dispatch(deleteComment(id))
    if(action.type === "comments/deleteComment/fulfilled"){
      setMenuOpen(null)
      dispatch(fetchComments(blogId))
    }
  }

  const toggleMenu = (commentId) => {
    setMenuOpen(menuOpen === commentId ? null : commentId)
  }

  const renderCommentActions = (comment) => {
    return(
    <div className="comment-actions">
      <button className="menu-button" onClick={() => toggleMenu(comment._id)}>:</button>
      {menuOpen === comment._id && (
        <div className="menu">
          <button onClick={() => {setEditingCommentId(comment._id) ; setUpdateText(comment.content)}}>update</button>
          <button onClick={(e) => handleDeleteComment(e,comment._id)}>delete</button>
        </div>
      )}
    </div>
    )
    
  }
  

  if(loading){
    return <div> loading ....</div>
  }
  if(error){
    return <div> {error.message}</div>
  }
  return (
    <div className="comments-section">
      <h3>Comment</h3>
      {comments?.map((comment) => (
        <div key={comment._id} className="comment">
            {editingCommentId === comment._id ? (
              <>
              <form>
                <textarea
                value={updateText}
                onChange={(e) => setUpdateText(e.target.value)} 
                />
                <button onClick={(e) => handleUpdateComment(e,comment._id)}>save</button>
                <button onClick={() => setEditingCommentId(null)}>cancel</button>
              </form>
              </>
            )
            :(
              <>
               <div className="comment-content">
                <p> {comment?.content}</p>
                <p>written by {comment?.author.username}</p>
                {comment?.author.username === user?.username && (
                  renderCommentActions(comment)
                )}
               </div>
              </>
            )
          }
        </div>
      ))}
      <form onSubmit={(e) => handleCommentSubmit(e)}>
        <textarea 
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        required
        />
        <button type="submit">submit</button>
      </form>
      </div>
  )
}

export default Comment