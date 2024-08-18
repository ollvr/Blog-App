const errorHandler = (err,req,res,next) =>{
    const statusCode = err.statusCode || 500
   console.error(err.message)
   if(process.env.NODE_ENV !== "production"){
    console.error(err.stack)
   }

   res.status(statusCode).json({
    message:err.message,
    stack:process.env.NODE_ENV === "production" ? {} : err.stack
   })
}

module.exports = errorHandler