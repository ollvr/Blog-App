/* eslint-disable no-unused-vars */
import React , {useState , useEffect}  from 'react'
import {useDispatch , useSelector} from "react-redux"
import { useParams , useNavigate } from 'react-router-dom'
import { fetchBlogs , updateBlog } from '../features/blogs/blogsSlice'
function BlogUpdate() {
  const {id} = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const blogState = useSelector((state) => state.blogs)
  const {blogs , loading , error} = blogState

  useEffect(() => {
    dispatch(fetchBlogs())
  },[dispatch])

  const blog = blogs.find((blog) => blog._id === id)

  const [formData , setFormData] = useState({
    title:"",
    content:""
  })

  useEffect(() => {
    if(blog){
      setFormData({title:blog.title , content:blog.content})
    }
  },[blog])


  const handleChange = (e) => {
    setFormData({...formData , [e.target.name] : e.target.value})
  }
  const handleUpdate = async(e) => {
    e.preventDefault();
    const action = await dispatch(updateBlog({id,...formData}))
    if(action.type === "blogs/updateBlog/fulfilled"){
      navigate(`/blogs/${id}`)
    }
  }

  if(loading && !blog){
    return <div>loading ...</div>
  }

  if(error) {
    return <div>{error.message}</div>
  }
  return (
    <div className="update-form">
      <h2>Update Blog</h2>
      <form onSubmit={(e) => handleUpdate(e)}>
        <input 
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        />
        <textarea
        name="content"
        value={formData.content}
        onChange={handleChange} 
        />
        <button type="submit">update</button>
      </form>      
    </div>
  )
}

export default BlogUpdate