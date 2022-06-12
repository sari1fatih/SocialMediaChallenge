export const errorMessage = (res, error) => {
    if (!!error?.code) {
        switch (error.code) {
            case 11000:
                res.status(404)
                throw new Error('The user exist')
                break;

            default:
                res.status(404)
                throw new Error('Try again later')
                break;
        }
    } else if (!!error?.name) {
        switch (error.name) {
            case 'CastError':
                res.status(404)
                throw new Error('Not Found')
                break;
            case 'ValidationError':
                res.status(404)
                throw new Error(error?.errors?.title?.properties?.message)
                break;
            case 'Error':
                res.status(404)
                throw new Error(error.message)
                break;
            case 'ReferenceError':
                res.status(404)
                throw new Error('Undefined variable')
                break;
            default:
                res.status(404)
                throw new Error('Try again later')
                break;
        }
    } else {
        throw new Error('Try again later')
    }
}

export const response = (res, dataObj) => {
    res.status(dataObj.status)
    res.send({ data: dataObj.json, isSuccess: dataObj?.status == 200 ? true : false })
}