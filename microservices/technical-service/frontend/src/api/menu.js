import { Request } from './config'

// api calls

export const getMenus = () => new Promise((resolve, reject) => {

    Request.get("/menu").then((res) => {
        resolve(res)
    }).catch((err) => {
        reject(err)
    })
})

export const createMenu = (menu) => new Promise((resolve, reject) => {

    Request.post("/menu", menu).then((res) => {
        resolve(res)
        console.log(res)
    }).catch((err) => {
        reject(err.toJSON())
    })
})



export const updateMenu = (menu, id) => new Promise((resolve, reject) => {

    Request.put(`/menu/${id}`, menu).then((res) => {
        resolve(res)
    }).catch((err) => {
        console.error(err)
        reject(err)
    })
})

export const deleteMenu = (menu) => new Promise((resolve, reject) => {
    Request.delete(`/menu/${menu}`).then((res) => {
        resolve(res)
    }).catch((err) => {
        console.error(err)
        reject(err)
    })
})

export const getMenubyRestaurant = (restaurant) => new Promise((resolve, reject) => {

    Request.get(`/menu/findmenubyrestaurant/${restaurant}`).then((res) => {
        resolve(res)
    }).catch((err) => {
        console.error(err)
        reject(err)
    })
})
