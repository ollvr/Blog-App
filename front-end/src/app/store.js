import {configureStore} from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import blogsReducer from "../features/blogs/blogsSlice"
import commentsRducer from "../features/comments/commentSlice"

const store = configureStore({
    reducer:{
        auth:authReducer,
        blogs:blogsReducer,
        comments:commentsRducer
    }
})

export default store