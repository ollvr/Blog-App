/* eslint-disable no-unused-vars */
import React from 'react'
import {useDispatch , useSelector} from "react-redux"
import {Link , useNavigate} from "react-router-dom"
import { logout } from '../features/auth/authSlice'
function Header() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const authState = useSelector((state) => state.auth)
    const {user} = authState

    const handleLogout = async() => {
        const action = await dispatch(logout())
        if(action.type == "auth/logout/fulfilled"){
            navigate("/auth/login")
        }
    }
  return (
    <header className="header">
        <nav className="nav">
            <Link to="/" className="nav-link">blogs</Link>
            <Link to="/myblogs" className="nav-link"> MyBlogs</Link>
            {
                user ? (
                    <>
                     <p className="nav-text">
                        hello {user.username}
                     </p>
                     <button onClick={handleLogout} className="nav-button">
                        logout
                     </button>
                    </>
                ) : (
                    <Link to="/auth/login" className="nav-link">Login</Link>
                )
            }
        </nav>
    </header>
  )
}

export default Header