const express = require("express")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const connectDB = require("./config/db")
const cors = require("cors")
dotenv.config()
connectDB()
const app = express()

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


app.use("/api/auth",require("./routes/auth"))
app.use("/api/blogs",require("./routes/blog"))
app.use("/api/comments",require("./routes/comment"))


    
app.use((err,req,res,next) => {
   const statusCode = err.statusCode || 500
   console.error(err.message)
   if(process.env.NODE_ENV !== "production"){
    console.error(err.stack)
   }

   res.status(statusCode).json({
    message:err.message,
    stack:process.env.NODE_ENV === "production" ? {} : err.stack
   })
})

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})