function createError(message,statusCode) {
    const error = new Error(message)
    error.statusCode = statusCode
    throw error 
}

module.exports = createError