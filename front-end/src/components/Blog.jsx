/* eslint-disable no-unused-vars */
import React , {useEffect} from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchBlogs } from '../features/blogs/blogsSlice'
import Comment from "./Comment"
function Blog() {
  const {id} = useParams()
  const dispatch = useDispatch()
  const BlogState = useSelector((state) => state.blogs)
  const {blogs , loading , error} = BlogState

  const blog = blogs.find((b) => b._id === id)

  useEffect(() => {
    if(!blog){
      dispatch(fetchBlogs())
    }
  } , [dispatch,blog])

  if(loading) {
    return <div>loading ...</div>
  }
  if(error){
    return <div>{error.message}</div>
  }

  return blog ? (
    <div className="blog-container">
      <h2 className="blog-title">{blog.title}</h2>
      <p className="blog-content">{blog.content}</p>
      <Comment  blogId={id}/>
    </div>
  ) : (
    <div> blog not found</div>
  )
}


export default Blog