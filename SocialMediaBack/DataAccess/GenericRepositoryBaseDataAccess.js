import { REQ_SUCCESS, REQ_BAD_REQUEST } from '../consts/generals.js'
import helper from '../utils/helper.js'
import { ADD_MESSAGE, UPDATE_MESSAGE, DELETE_MESSAGE } from '../consts/generals.js'


const db = {
    database: {
        GetListCount: (client, body, tabloName) => {
            return new Promise((resolve, reject) => {
                client.query(`Select Count(*)  from public.${tabloName} where id=${body?.id}`, (cErr, cRes) => {
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
        GetList: (client, data, tabloName) => {
            return new Promise((resolve, reject) => {
                client.query(`Select ${db.common.getColumnWithId(data)},to_timestamp (created_at) from public.${tabloName} where  (${data?.id} =-1 Or id=${data?.id}) AND  (${data?.ids.length} = 1 Or id in (${data?.ids.join()})) order by created_at desc`, (cErr, cRes) => {
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
        Add: (client, body, tabloName) => {
            return new Promise((resolve, reject) => {
                client.query(`Insert into public.${tabloName}(${db.common.getColumn(body)},created_at) values(${db.common.getColumnIndex(body)},EXTRACT(EPOCH FROM ('${helper.dataTrans.dateTimeByNowForAddDatabase()}' AT TIME ZONE 'UTC'))  )`, db.common.getColumnValueForInjection(body), (cErr, cRes) => {

                    if (!cErr) {
                        var dataObj = { status: REQ_SUCCESS, json: ADD_MESSAGE }
                        resolve(dataObj)
                    } else {
                        var dataObj = { status: REQ_BAD_REQUEST, json: cErr.message }
                        reject(dataObj)
                    }
                    client.end
                })

            })
        },
        Update: (client, body, tabloName) => {
            return new Promise((resolve, reject) => {
                client.query(`Update  public.${tabloName} set ${db.common.getColumnValueForUpdate(body)} where id=${body?.id}`, db.common.getColumnValueForInjection(body), (cErr, cRes) => {

                    if (!cErr) {
                        var dataObj = { status: REQ_SUCCESS, json: UPDATE_MESSAGE }
                        resolve(dataObj)
                    } else {
                        var dataObj = { status: REQ_BAD_REQUEST, json: cErr.message }
                        reject(dataObj)
                    }
                    client.end
                })

            })
        },
        Delete: (client, body, tabloName) => {
            return new Promise((resolve, reject) => {
                client.query(`Delete from public.${tabloName} where id=$1`, [body?.id], (cErr, cRes) => {

                    if (!cErr) {
                        console.log('1 ', cErr)
                        var dataObj = { status: REQ_SUCCESS, json: DELETE_MESSAGE }
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
        /*Insert*/
        getColumn: (data) => {
            var result = {}
            Object.keys(data).filter(x => x != 'id').sort().forEach((value, index) => {
                if (!!data[value])
                    result[value] = value
            })

            return Object.keys(result).sort().join();
        },
        /*Select*/
        getColumnWithId: (data) => {
            var result = {}
            Object.keys(data).filter(x => x != 'ids').sort().forEach((value, index) => {
                if (!!data[value])
                    result[`COALESCE(NULLIF(${value} ,${ typeof (data[value]) == 'number' ? 0 : "\'Default\'"}), ${ typeof (data[value]) == 'number' ? 0 : "\'Default\'"}) as ${value}`] = index
            })
            return Object.keys(result).sort().join();
        },
        //Add Values $1 , $2 gibi
        getColumnIndex: (data) => {
            var result = {}
            Object.keys(data).filter(x => x != 'id').sort().forEach((value, index) => {
                if (!!data[value])
                    result[`$${index + 1}`] = `$${index}`
            })

            return Object.keys(result).sort().join();
        },
        getColumnValue: (data) => {
            var columnsValue = []
            Object.keys(data).sort().forEach(value => {
                if (!!data[value])
                    columnsValue.push(`'${data[value]}'`)
            })
            return columnsValue.join()
        },
        // Insert ve update sql injectiton için yapıldı
        getColumnValueForInjection: (data) => {
            var columnsValue = []
            Object.keys(data).filter(x => x != 'id').sort().forEach(value => {
                if (!!data[value])
                    columnsValue.push(`${data[value]}`)
            })
            return columnsValue
        },
        // Update
        getColumnValueForUpdate: (data) => {
            var columnsValue = []
            Object.keys(data).filter(x => x != 'id').sort().forEach((value, index) => {
                if (!!data[value])
                    columnsValue.push(`${value} = $${index + 1} `)
            })
            return columnsValue.join()
        },
    }

}
export default db;