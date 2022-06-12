import { REQ_SUCCESS, REQ_BAD_REQUEST } from '../consts/generals.js' 

const db = {
    database: { 
        // kim takip ediyor
        GetListWhoFollowing: (client, followerId) => {
            return new Promise((resolve, reject) => {

                client.query(`select u.id,u.username ,u.email ,u.full_name ,u.profile_picture ,u.bio,to_timestamp (u.created_at)  from follow f inner join 
                public."user" u ON f.following_id  =u.id 
                where 
                f.follower_id =${followerId ?? 0}`, (cErr, cRes) => {
                    if (!cErr) {
                        var dataObj = { status: REQ_SUCCESS, json: cRes.rows }
                        resolve(dataObj)
                    } else {
                        var dataObj = { status: REQ_BAD_REQUEST, json: cErr.message }
                        reject(dataObj)
                    }
                    client.end
                })

            })
        },
        // takipçiler kim
        GetListWhoFollower: (client, followerId) => {
            return new Promise((resolve, reject) => {

                client.query(`select u.id,u.username ,u.email ,u.full_name ,u.profile_picture ,u.bio,to_timestamp (u.created_at)  from follow f inner join 
                public."user" u ON f.follower_id  =u.id 
                where 
                f.following_id =${followerId ?? 0}`, (cErr, cRes) => {
                    if (!cErr) { 
                        var dataObj = { status: REQ_SUCCESS, json: cRes.rows }
                        resolve(dataObj)
                    } else {
                        var dataObj = { status: REQ_BAD_REQUEST, json: cErr.message }
                        reject(dataObj)
                    }
                    client.end
                })

            })
        },

    },
    common: {

    }

}
export default db;