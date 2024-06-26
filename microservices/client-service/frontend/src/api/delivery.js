import { Request } from './config'

// api calls

export const updateDelivery = (delivery, id) => new Promise((resolve, reject) => {

    Request.put(`/delivery/${id}`, delivery).then((res) => {
        resolve(res)
    }).catch((err) => {
        console.error(err)
        reject(err)
    })
})

export const getDeliverybyemail = (email) => new Promise((resolve, reject) => {

    Request.get(`/delivery/finddeliverybyemail/${email}`).then((res) => {
        resolve(res)
    }).catch((err) => {
        console.error(err)
        reject(err)
    })
})

export const getDeliverybySqlid = (sqlId) => new Promise((resolve, reject) => {

    Request.get(`/delivery/finddeliverybysqlid/${sqlId}`).then((res) => {
        console.log(res)
        resolve(res)
    }).catch((err) => {
        console.error(err)
        reject(err)
    })
})
