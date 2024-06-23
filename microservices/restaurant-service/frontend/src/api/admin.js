import { Request } from './config'

// api calls

export const getAdmins = () => new Promise((resolve, reject) => {

    Request.get("/admin").then((res) => {
        resolve(res)
    }).catch((err) => {
        reject(err)
    })
})


export const createAdmin = (admin) => new Promise((resolve, reject) => {

    Request.post("/admin", admin).then((res) => {
        resolve(res)
        console.log(res)
    }).catch((err) => {
        reject(err.toJSON())
    })
})


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
