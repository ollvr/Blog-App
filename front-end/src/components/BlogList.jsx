/* eslint-disable no-unused-vars */
import React , {useEffect} from 'react'
import {useDispatch , useSelector} from "react-redux"
import {fetchBlogs} from "../features/blogs/blogsSlice"
import {Link , useNavigate} from "react-router-dom"
function BlogList() {
  const dispatch = useDispatch()
  const blogState = useSelector((state) => state.blogs)
  const {blogs , loading , error} = blogState
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(fetchBlogs())
  },[dispatch])

  if(loading){
    return <div>loading ....</div>
  }

  if(error){
    return <div> {error.message}</div>
  }
  return (
    <div className="blog-list">
      <button className="create-blog-btn" onClick={() => navigate("/create-blog")}>create blog</button>
      {
        blogs.map((blog) => (
          <div key={blog._id} className="blog-item"> 
              <h3>{blog.title}</h3>
              <p>Author : {blog.author.username}</p>
              <p>{blog.content.substring(0,100)}...</p>
              <Link to={`/blogs/${blog._id}`}>Read more</Link>
          </div>
        ))
      }
    </div>
  )
}

export default BlogList