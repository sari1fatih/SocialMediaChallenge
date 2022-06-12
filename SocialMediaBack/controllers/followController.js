import asyncHandler from 'express-async-handler' 
import {  response } from '../utils/settings.js' 
import helper from '../utils/helper.js' 
import genericRepositoryBaseDataAccess from '../DataAccess/GenericRepositoryBaseDataAccess.js' 
import followDataAccess from '../DataAccess/followDataAccess.js' 


export const add = asyncHandler(async (req, res, next) => {  
    
    genericRepositoryBaseDataAccess.database.Add(helper.database.open(), req?.body, 'follow').then((data)=>{ 
        response(res, data)
    }).catch((data)=>{
        response(res, data) 
    })  
})

export const remove = asyncHandler(async (req, res, next) => {  
    
    genericRepositoryBaseDataAccess.database.Delete(helper.database.open(), req?.body, 'follow').then((data)=>{ 
        response(res, data)
    }).catch((data)=>{
        response(res, data) 
    })  
})
 

export const getListWhoFollowing = asyncHandler(async (req, res, next) => {   
    followDataAccess.database.GetListWhoFollowing(helper.database.open(), req?.query?.followerId).then((data)=>{ 
        response(res, data)
    }).catch((data)=>{
        response(res, data) 
    })  
})

export const getListWhoFollower = asyncHandler(async (req, res, next) => {   
    followDataAccess.database.GetListWhoFollower(helper.database.open(), req?.query?.followerId).then((data)=>{ 
        response(res, data)
    }).catch((data)=>{
        response(res, data) 
    })  
})