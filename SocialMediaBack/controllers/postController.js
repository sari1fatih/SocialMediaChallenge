import asyncHandler from 'express-async-handler'
import { REQ_SUCCESS, NOT_FOUND, REQ_BAD_REQUEST } from '../consts/generals.js'
import { response } from '../utils/settings.js'
import helper from '../utils/helper.js'
import stringExtensions from '../extensions/stringExtensions.js'
import genericRepositoryBaseDataAccess from '../DataAccess/GenericRepositoryBaseDataAccess.js'
import postDataAccess from '../DataAccess/postDataAccess.js'
import followDataAccess from '../DataAccess/followDataAccess.js'
import likeDataAccess from '../DataAccess/likeDataAccess.js'
import linq from "linq";

export const getListByUserId = asyncHandler(async (req, res, next) => {
    postDataAccess.database.getListByUserId(helper.database.open(), req?.query?.userid).then((data) => {
        response(res, data)
    }).catch((data) => {
        response(res, data)
    })
})

// no joins are allowed!!!
export const getList = asyncHandler(async (req, res, next) => {
    try {

        var followListObject = (await followDataAccess.database.GetListWhoFollower(helper.database.open(), req?.body?.user_id)).json

        var postIds = req?.body?.post_ids
        postIds.push(0)

        var postEntity = {
            id: -1,
            ids: postIds,
            user_id: -1,
            description: ' ',
            image: ' ',
        }

        var postListObject = (await genericRepositoryBaseDataAccess.database.GetList(helper.database.open(), postEntity, 'post'))?.json

        var userIdsOfPost = linq.from(postListObject)
            .select(function (x) { return x.user_id }).toArray();
        userIdsOfPost.push(0)

        var likeReq = { postIds: postIds, userid: req?.body?.user_id }

        var likeListObject = (await likeDataAccess.database.GetListByPostIdsUserId(helper.database.open(), likeReq))?.json

        var userEntity = {
            id: -1,
            ids: userIdsOfPost,
            username: ' ',
            email: ' ',
            full_name: ' ',
            profile_picture: ' ',
            bio: ' '
        }

        var userListOfPost = (await genericRepositoryBaseDataAccess.database.GetList(helper.database.open(), userEntity, 'user'))?.json

        var resultNotOrder = linq.from(postListObject)
            .select(function (postItem) {
                postItem.liked = linq.from(likeListObject).any(function (likeItem) {
                    return postItem.id == likeItem.post_id
                })
                postItem.owner = linq.from(userListOfPost).first(function (ownerItem) {
                    if (ownerItem.id == postItem.user_id) {
                        if (ownerItem.id == req?.body?.user_id) {
                            ownerItem.followed = true
                        } else {
                            ownerItem.followed = linq.from(followListObject).any(function (followItem) {
                                return followItem.id == postItem.user_id
                            })
                        }
                        delete ownerItem.bio;
                        delete ownerItem.email
                        delete ownerItem.to_timestamp
                        return ownerItem
                    }
                })
                delete postItem.user_id;
                return postItem
            }).toArray();

        var result = []
        for (let index = 0; index < postIds.length; index++) {
            const postId = postIds[index];
            var item = linq.from(resultNotOrder)
                .firstOrDefault(x => x.id == postId)
            if (!!item) {
                result.push(item)
            }
        }
        var dataObj = { status: REQ_SUCCESS, json: result }
        response(res, dataObj)
    } catch (error) {
        var dataObj = { status: REQ_BAD_REQUEST, json: error.message }
        response(res, dataObj)
    }
})

export const mergePost = asyncHandler(async (req, res, next) => {
    try {
        var resultAll = []
        linq.from(req.body.list_of_posts)
            .select(function (listPostItem) {
                //console.log('postItem 1 ',listPostItem)

                var data = linq.from(listPostItem)
                    .distinct(x => x.id)
                    .select(function (postItem) {
                        return postItem
                    }).toArray()
                resultAll = [...resultAll, ...data];

            }).toArray()

        var resultDistinct = linq.from(resultAll)
            .distinct(x => x.id)
            .select(function (postItem) {
                return postItem
            })
            .orderByDescending(x=>x.created_at)
            .thenByDescending(x=> x.id)
            .toArray()
 

        var dataObj = { status: REQ_SUCCESS, json: resultDistinct }
        response(res, dataObj)
    } catch (error) {
        var dataObj = { status: REQ_BAD_REQUEST, json: error.message }
        response(res, dataObj)
    }
})

export const add = asyncHandler(async (req, res, next) => {
    genericRepositoryBaseDataAccess.database.Add(helper.database.open(), req?.body, 'post').then((data) => {
        response(res, data)
    }).catch((data) => {
        response(res, data)
    })
})

export const update = asyncHandler(async (req, res, next) => {
    try {
        var usersCount = await genericRepositoryBaseDataAccess.database.GetListCount(helper.database.open(), req?.body, 'post')
        if (usersCount?.json[0]?.count > 0) {
            var data = await genericRepositoryBaseDataAccess.database.Update(helper.database.open(), req?.body, 'post')
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
        var usersCount = await genericRepositoryBaseDataAccess.database.GetListCount(helper.database.open(), req?.body, 'post')
        if (usersCount?.json[0]?.count > 0) {
            var data = await genericRepositoryBaseDataAccess.database.Delete(helper.database.open(), req?.body, 'post')
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
