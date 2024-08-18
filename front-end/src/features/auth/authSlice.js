import {createSlice , createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async({email,password} , {rejectWithValue}) =>{
        try {
            const response = await axios.post("http://localhost:4000/api/auth/login",{email,password},{
                withCredentials:true
            })
            const user = response.data.user
            return {username:user.username ,email:user.email}
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response.data)
        }
    }
)

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async({username,email,password} , {rejectWithValue}) =>{
        try {
            const response = await axios.post("http://localhost:4000/api/auth/register",{username,email,password},{
                withCredentials:true
            })
            const user = response.data.user
            return {username:user.username ,email:user.email}
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response.data)
        }
    }
)


export const logout = createAsyncThunk(
    "auth/logout",
    async(_, {rejectWithValue}) =>{
        try {
             await axios.post("http://localhost:4000/api/auth/logout",{},{
                withCredentials:true
            })
            
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response.data)
        }
    }
)

const savedUser = JSON.parse(localStorage.getItem("user"))
const authSlice = createSlice({
    name:"auth",
    initialState:{user:savedUser || null , loading:false , error:null},
    extraReducers : (builder) => {
        builder
        .addCase(loginUser.pending , (state) => {
            state.loading = true
            state.error = null
        })

        .addCase(loginUser.fulfilled , (state,action) => {
            state.loading = false
            state.user = action.payload
            localStorage.setItem("user", JSON.stringify(action.payload))
        })

        .addCase(loginUser.rejected , (state,action) => {
            state.loading = false
            state.error = action.payload
        })


        .addCase(registerUser.pending , (state) => {
            state.loading = true
            state.error = null
        })

        .addCase(registerUser.fulfilled , (state,action) => {
            state.loading = false
            state.user = action.payload
            localStorage.setItem("user", JSON.stringify(action.payload))
        })

        .addCase(registerUser.rejected , (state,action) => {
            state.loading = false
            state.error = action.payload
        })


        .addCase(logout.pending , (state) => {
            state.loading = true
            state.error = null
        })

        .addCase(logout.fulfilled , (state) => {
            state.loading = false
            state.user = null
            localStorage.removeItem("user")
        })

        .addCase(logout.rejected , (state,action) => {
            state.loading = false
            state.error = action.payload
        })


    }
})

export default authSlice.reducer