/* eslint-disable no-unused-vars */
import React , {useState} from 'react'
import {useDispatch , useSelector} from "react-redux"
import {createBlog} from "../features/blogs/blogsSlice"
import {useNavigate} from "react-router-dom"
function CreateBlog() {
  const [formData , setFormData] = useState({title:"",content:""})
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {error , loading} = useSelector((state) => state.blogs)
  const handleChange = (e) =>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    const action = await dispatch(createBlog(formData))
    if(action.type === "blogs/createBlog/fulfilled"){
      navigate("/")
    }
  }
  if(loading){
    return <div>loading ...</div>
  }

  if(error){
    return <div>{error.message}</div>
  }
  return (

    <div className="auth-container">
      <h2>Create blog</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input 
         type='text'
         name="title"
         value={formData.title}
         onChange={handleChange}
         placeholder='Title'
         required
        />
        <textarea 
        name='content' 
        value={formData.content} 
        onChange={handleChange}
        placeholder='Content'
        required
        />
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default CreateBlog