import { Request } from './config'

// api calls

export const updateRestaurant = (restaurant, id) => new Promise((resolve, reject) => {

    Request.put(`/restaurant/${id}`, restaurant).then((res) => {
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

export const getRestaurantbySqlid = (sqlId) => new Promise((resolve, reject) => {

    Request.get(`/restaurant/findrestaurantbysqlid/${sqlId}`).then((res) => {
        console.log(res)
        resolve(res)
    }).catch((err) => {
        console.error(err)
        reject(err)
    })
})
