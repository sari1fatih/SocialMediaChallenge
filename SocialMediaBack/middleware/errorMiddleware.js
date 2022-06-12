import { NODE_ENV_PRODUCTION, NODE_ENV_DEVELOPMENT, REQ_NOT_FOUND, REQ_INTERNAL_SERVER_ERROR, REQ_SUCCESS } from '../consts/generals.js'

export const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(REQ_NOT_FOUND)
    next(error)
}

export const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === REQ_SUCCESS ? REQ_INTERNAL_SERVER_ERROR : res.statusCode
    res.status(statusCode)
    res.json({
        name: err.name,
        message: err.message,
        stack: process.env.NODE_ENV == NODE_ENV_PRODUCTION ? null : err.stack
    })

}