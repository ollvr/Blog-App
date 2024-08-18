/* eslint-disable no-unused-vars */
import React , {useState} from 'react'
import {useDispatch , useSelector } from "react-redux"
import {loginUser , registerUser} from "../features/auth/authSlice"
import {Link,useNavigate} from "react-router-dom"
function Auth({type}) {
    const [formData,setFormData] = useState({username:'',email:'',password:''})
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const authState = useSelector((state) => state.auth)
    const {loading,error} = authState

    const handleChange = (e) => {
        setFormData({...formData , [e.target.name] : e.target.value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        let action
        if(type === "login"){
            action = await dispatch(loginUser({email:formData.email , password : formData.password}))
        }
        else{
            action = await dispatch(registerUser(formData))
        }
        if(action.type.endsWith("fulfilled")){
            navigate("/")
        }
    }

    if(loading){
        return <div>loading</div>
    }
    if(error){
        return <div>{error.message}</div>
    }
  return (
    <div className="auth-container">
        <h2>
            {type === "login" ? "Login" : "Register"}
        </h2>
        <form onSubmit={(e) => handleSubmit(e)}>
            { type === "register" && (
                <input
                type="text"
                name="username"
                 placeholder='Name'
                 value={formData.username}
                 onChange={handleChange}
                 required
                />
            )}

            <input
             type='email'
             name='email'
             placeholder='email'
             value={formData.email}
             onChange={handleChange} 
             required
             />

            <input
             type='password'
             name='password'
             placeholder='password'
             value={formData.password}
             onChange={handleChange} 
             required
             />

             <button type='submit'>
                {type === "login" ? "login" : "register"}
             </button>

             {type === "login" &&
              <Link to="/auth/register" className="auth-link">Don't have an account ? register</Link>
             }
        </form>
    </div>
  )
}

export default Auth