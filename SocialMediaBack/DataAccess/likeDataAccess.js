import { REQ_SUCCESS, REQ_BAD_REQUEST } from '../consts/generals.js' 

const db = {
    database: {  
        GetListByPostId: (client, postid) => {
            return new Promise((resolve, reject) => {
                client.query(`select  l.id,l.post_id,l.user_id ,u.username ,to_timestamp (l.created_at) from public."like" l inner join public."user" u on l.user_id = u.id 
                where 
                l.post_id =${postid ?? 0} order by l.created_at desc`, (cErr, cRes) => {
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
        GetListByPostIdsUserId: (client, data) => {
            return new Promise((resolve, reject) => {
                client.query(`select  * from public."like" l 
                where 
                l.post_id in (${data?.postIds ?? 0}) and l.user_id = ${data?.userid ?? 0} order by l.created_at desc`, (cErr, cRes) => {
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