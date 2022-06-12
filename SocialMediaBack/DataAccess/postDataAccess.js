import { REQ_SUCCESS, REQ_BAD_REQUEST } from '../consts/generals.js' 

const db = {
    database: { 
        // kim takip ediyor
        getListByUserId: (client, userid) => {
            return new Promise((resolve, reject) => {

                client.query(`select id,description,user_id,image,to_timestamp (created_at) from public.post p where (${userid ?? 0}  = 0 Or p.user_id =${userid ?? 0})  order by created_at desc`, (cErr, cRes) => {
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
        } 

    },
    common: {

    }

}
export default db;