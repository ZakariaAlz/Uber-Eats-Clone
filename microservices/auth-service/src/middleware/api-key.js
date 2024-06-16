const apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.headers['api-key'] //Get the API key from the headers

    // If the API key is missing or incorrect, return an error response
    if (!apiKey || apiKey !== process.env.API_KEY) {
        return res.status(401).json({ message: 'Unauthorized access' })
    }

    // If the API key is valid, move on to the next middleware or route handler
    next()
}

// Export the middleware function so that it can be used by other modules
module.exports = apiKeyMiddleware