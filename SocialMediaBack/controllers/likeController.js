import asyncHandler from 'express-async-handler'
import { REQ_SUCCESS, NOT_FOUND } from '../consts/generals.js'
import { response } from '../utils/settings.js'
import helper from '../utils/helper.js'
import genericRepositoryBaseDataAccess from '../DataAccess/GenericRepositoryBaseDataAccess.js'
import likeDataAccess from '../DataAccess/likeDataAccess.js'
import { ADD_MESSAGE } from '../consts/generals.js'

export const getList = asyncHandler(async (req, res, next) => {
    var likeEntity = {
        id: -1,
        ids:[0],
        post_id: -1,
        user_id: -1
    }

    genericRepositoryBaseDataAccess.database.GetList(helper.database.open(), likeEntity, 'like').then((data) => {
        response(res, data)
    }).catch((data) => {
        response(res, data)
    })
})

export const getListByPostId = asyncHandler(async (req, res, next) => {
    likeDataAccess.database.GetListByPostId(helper.database.open(), req?.query?.postid).then((data) => {
        response(res, data)
    }).catch((data) => {
        response(res, data)
    })
})

export const add = asyncHandler(async (req, res, next) => {
    genericRepositoryBaseDataAccess.database.Add(helper.database.open(), req?.body, 'like').then((data) => {
        response(res, data)
    }).catch((data) => {
        if (data.json = 'duplicate key value violates unique constraint "t_like_c_post_id_c_userididx"') {
            data.json = ADD_MESSAGE
            data.status = REQ_SUCCESS
        }
        response(res, data) 
    })
})


export const remove = asyncHandler(async (req, res, next) => {

    try {
        var usersCount = await genericRepositoryBaseDataAccess.database.GetListCount(helper.database.open(), req?.body, 'like')
        if (usersCount?.json[0]?.count > 0) {
            var data = await genericRepositoryBaseDataAccess.database.Delete(helper.database.open(), req?.body, 'like')
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
