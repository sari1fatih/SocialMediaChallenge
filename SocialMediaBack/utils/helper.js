import Client from 'pg'

const helper = {
    dataTrans: {
        dateTimeByNow: () => {
            var date = new Date()
            return helper.common.twoDigits(date.getDate()) + '.' + helper.common.twoDigits((date.getMonth() + 1)) + '.' + helper.common.twoDigits(date.getFullYear()) + ' ' + helper.common.twoDigits(date.getHours()) + ':' + helper.common.twoDigits(date.getMinutes()) + ':' + helper.common.twoDigits(date.getSeconds())
        },
        dateTimeByNowForAddDatabase: () => {
            var date = new Date()
            return helper.common.twoDigits(date.getFullYear()) + '-' + helper.common.twoDigits((date.getMonth() + 1)) + '-' + helper.common.twoDigits(date.getDate()) + ' ' + helper.common.twoDigits(date.getHours()) + ':' + helper.common.twoDigits(date.getMinutes()) + ':' + helper.common.twoDigits(date.getSeconds())
        },
        dateByNow: () => {
            var date = new Date()
            return helper.common.twoDigits(date.getDate()) + '.' + helper.common.twoDigits((date.getMonth() + 1)) + '.' + helper.common.twoDigits(date.getFullYear())
        },
        timeByNow: () => {
            var date = new Date()
            helper.common.twoDigits(date.getHours()) + ':' + helper.common.twoDigits(date.getMinutes())
        },
    },
    common: {
        twoDigits: (value) => {
            value = value.toString()
            if (value.length < 2) {
                value = '0' + value
            }
            return value
        },
        toEmptyFromNullOrUndefined: (value) => {
            if (!value)
                return ''
            else
                return value
        },
        toEmptyFromObjectNullOrUndefined: (data) => {
            Object.keys(data).forEach((value, index) => { 
                if (typeof (data[value]) == 'object') {
                    data[value] = data[value] ?? 'Null olduğu için default değer atandı'
                } else if (typeof (data[value]) == 'number') {
                    data[value] = data[value] ?? 0
                } 
            })
        }

    },
    database: {
        open: () => {
            const client = new Client.Client({
                host: "localhost",
                user: "admin",
                port: 5433,
                password: '1234',
                database: "socialMedia"

            })
            client.connect()

            return client;
        }
    }

}
export default helper;