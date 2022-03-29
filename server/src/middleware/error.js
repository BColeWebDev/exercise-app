const errorHandler = (err, req, res, next) => {

    // sets value if error is there else error 500
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode)

    return res.json({
        message: err.message,
    })
}
module.exports = { errorHandler }