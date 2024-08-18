/* eslint-disable no-unused-vars */
import React , {useEffect , useState} from 'react'
import {useDispatch , useSelector} from "react-redux"
import {fetchMyBlogs , deleteBlog} from "../features/blogs/blogsSlice"
import {Link} from "react-router-dom"
function MyBlogs() {
  const dispatch = useDispatch()
  const blogState = useSelector((state) => state.blogs)
  const {blogs , loading , error} = blogState
  const [menuOpen , setMenuOpen] = useState(null)

  const toggleMenu = (id) => {
    setMenuOpen(menuOpen === id ? null : id)
  }

  /*
    menuOpen = null
    id = 1 
    menuOpen = 1
    menuOpen = null 
    
    menuOpen = 1
    id = 2
    menuOpen = 2
    menuOpen = null

  */

  useEffect(() => {
    dispatch(fetchMyBlogs())
  },[dispatch])

  const handleDeleteBlog = async(e,id) => {
    e.preventDefault();
    const action = await dispatch(deleteBlog(id))
    if(action.type === "blogs/deleteBlog/fulfilled"){
      setMenuOpen(null)
      dispatch(fetchMyBlogs())
    }
  }
  const renderBlogActions = (blogId) => (
    <div className="blog-actions">
      <span className="menu-dots" onClick={() => toggleMenu(blogId)}>...</span>
      {menuOpen === blogId && (
        <div className="menu"> 
          <button>
            <Link to={`/update-blog/${blogId}`}>Update</Link>
          </button>
          <button onClick={(e) => handleDeleteBlog(e,blogId)}>Delete</button>
           </div>
      )}
    </div>
  )
  if(loading) {
    return <div> loading ...</div>
  }

  if(error) {
    return <div>{error.message}</div>
  }
  return (
    <div className="blog-list">
      <h2>My Blogs</h2>
      {blogs?.map((blog) => (
        <div key={blog._id} className="blog-item"> 
          <h3>{blog.title}</h3>
          <p>{blog.content.substring(0,100)}...</p>
          <Link to={`/blogs/${blog._id}`}>Read more</Link>
          {renderBlogActions(blog._id)}
        </div>
      )
      )}
    </div>
  )
}

export default MyBlogs