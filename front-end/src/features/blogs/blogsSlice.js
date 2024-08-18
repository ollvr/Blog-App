import {createSlice , createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

export const fetchBlogs = createAsyncThunk(
    "blogs/fetchBlogs",
    async(_, {rejectWithValue}) =>{
        try {
            const response = await axios.get("http://localhost:4000/api/blogs")
            return response.data
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response.data)
        }
    }
)

export const fetchMyBlogs = createAsyncThunk(
    "blogs/fetchMyBlogs",
    async(_, {rejectWithValue}) =>{
        try {
            const response = await axios.get("http://localhost:4000/api/blogs/user",{
                withCredentials:true
            })
            return response.data
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response.data)
        }
    }
)


export const createBlog = createAsyncThunk(
    "blogs/createBlog",
    async({title,content}, {rejectWithValue}) =>{
        try {
             const response = await axios.post("http://localhost:4000/api/blogs",{title,content},{
                withCredentials:true
            })
            return response.data
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response.data)
        }
    }
)


export const updateBlog = createAsyncThunk(
    "blogs/updateBlog",
    async({id,title,content}, {rejectWithValue}) =>{
        try {
             const response = await axios.put(`http://localhost:4000/api/blogs/${id}`,{title,content},{
                withCredentials:true
            })
            return response.data
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response.data)
        }
    }
)


export const deleteBlog = createAsyncThunk(
    "blogs/deleteBlog",
    async(id, {rejectWithValue}) =>{
        try {
             await axios.delete(`http://localhost:4000/api/blogs/${id}`,{
                withCredentials:true
            })
            return id
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response.data)
        }
    }
)



const blogsSlice = createSlice({
    name:"blogs",
    initialState:{blogs:[], loading:false , error:null},
    extraReducers : (builder) => {
        builder
        .addCase(fetchBlogs.pending , (state) => {
            state.loading = true
            state.error = null
        })

        .addCase(fetchBlogs.fulfilled , (state,action) => {
            state.loading = false
            state.blogs = action.payload
        })

        .addCase(fetchBlogs.rejected , (state,action) => {
            state.loading = false
            state.error = action.payload
        })


        .addCase(fetchMyBlogs.pending , (state) => {
            state.loading = true
            state.error = null
        })

        .addCase(fetchMyBlogs.fulfilled , (state,action) => {
            state.loading = false
            state.blogs = action.payload
        })

        .addCase(fetchMyBlogs.rejected , (state,action) => {
            state.loading = false
            state.error = action.payload
        })


        .addCase(createBlog.pending , (state) => {
            state.loading = true
            state.error = null
        })

        .addCase(createBlog.fulfilled , (state,action) => {
            state.loading = false
            state.blogs.push(action.payload)
        })

        .addCase(createBlog.rejected , (state,action) => {
            state.loading = false
            state.error = action.payload
        })


        .addCase(updateBlog.pending , (state) => {
            state.loading = true
            state.error = null
        })

        .addCase(updateBlog.fulfilled , (state,action) => {
            state.loading = false
            const index = state.blogs.findIndex((blog) => blog._id === action.payload._id)
            if(index !== -1){
                state.blogs[index] = action.payload
            }
        })

        .addCase(updateBlog.rejected , (state,action) => {
            state.loading = false
            state.error = action.payload
        })


        .addCase(deleteBlog.pending , (state) => {
            state.loading = true
            state.error = null
        })

        .addCase(deleteBlog.fulfilled , (state,action) => {
            state.loading = false
            state.blogs = state.blogs.filter((blog) => blog._id !== action.payload)
        })

        .addCase(deleteBlog.rejected , (state,action) => {
            state.loading = false
            state.error = action.payload
        })


    }
})

export default blogsSlice.reducer