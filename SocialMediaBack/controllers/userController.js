import asyncHandler from 'express-async-handler'
import { REQ_SUCCESS, NOT_FOUND } from '../consts/generals.js'
import { response } from '../utils/settings.js'
import helper from '../utils/helper.js'
import genericRepositoryBaseDataAccess from '../DataAccess/GenericRepositoryBaseDataAccess.js'


export const getList = asyncHandler(async (req, res, next) => {
    var userEntity = {
        id: -1,
        ids:[0],
        username: ' ',
        email: ' ',
        full_name: ' ',
        profile_picture: ' ',
        bio: ' '
    }

    genericRepositoryBaseDataAccess.database.GetList(helper.database.open(), userEntity, 'user').then((data) => {
        response(res, data)
    }).catch((data) => {
        response(res, data)
    })
})

export const add = asyncHandler(async (req, res, next) => {
    genericRepositoryBaseDataAccess.database.Add(helper.database.open(), req?.body, 'user').then((data) => {
        response(res, data)
    }).catch((data) => {
        response(res, data)
    })
})

export const update = asyncHandler(async (req, res, next) => {
    try {
        var usersCount = await genericRepositoryBaseDataAccess.database.GetListCount(helper.database.open(), req?.body, 'user')
        if (usersCount?.json[0]?.count > 0) {
            var data = await genericRepositoryBaseDataAccess.database.Update(helper.database.open(), req?.body, 'user')
            response(res, data)
        } else {
            var dataObj = { status: REQ_SUCCESS, json: NOT_FOUND }
            response(res, dataObj)
        }
    } catch (error) {
        var dataObj = { status: REQ_BAD_REQUEST, json: error.message }
        response(res, dataObj)
    }
})

export const remove = asyncHandler(async (req, res, next) => {

    try {
        var usersCount = await genericRepositoryBaseDataAccess.database.GetListCount(helper.database.open(), req?.body, 'user')
        if (usersCount?.json[0]?.count > 0) {
            var data = await genericRepositoryBaseDataAccess.database.Delete(helper.database.open(), req?.body, 'user')
            console.log('data ', data)
            response(res, data)
        } else {
            var dataObj = { status: REQ_SUCCESS, json: NOT_FOUND }
            response(res, dataObj)
        }
    } catch (error) {
        var dataObj = { status: REQ_BAD_REQUEST, json: error.message }
        response(res, dataObj)
    }
})
