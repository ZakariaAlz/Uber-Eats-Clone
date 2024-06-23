import { Request } from './config'

// api calls

export const updateAdmin = (admin, id) => new Promise((resolve, reject) => {

    Request.put(`/admin/${id}`, admin).then((res) => {
        resolve(res)
    }).catch((err) => {
        console.error(err)
        reject(err)
    })
})

export const deleteAdmin = (admin) => new Promise((resolve, reject) => {
    Request.delete(`/admin/${admin}`).then((res) => {
        resolve(res)
    }).catch((err) => {
        console.error(err)
        reject(err)
    })
})

export const getRestaurantbyemail = (email) => new Promise((resolve, reject) => {

    Request.get(`/restaurant/findrestaurantbyemail/${email}`).then((res) => {
        resolve(res)
    }).catch((err) => {
        console.error(err)
        reject(err)
    })
})

export const getRestaurantbySqlid = (sqlid) => new Promise((resolve, reject) => {

    Request.get(`/restaurant/findrestaurantbysqlid/${sqlid}`).then((res) => {
        resolve(res)
    }).catch((err) => {
        console.error(err)
        reject(err)
    })
})
