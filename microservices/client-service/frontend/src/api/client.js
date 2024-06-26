import { Request } from './config'

// api calls

export const getClients = () => new Promise((resolve, reject) => {

    Request.get("/client").then((res) => {
        resolve(res)
    }).catch((err) => {
        console.error(err)
        reject(err)
    })
})


export const createClient = (client) => new Promise((resolve, reject) => {

    Request.post("/client", client).then((res) => {
        resolve(res)
    }).catch((err) => {
        console.error(err)
        reject(err)
    })
})


export const updateClient = (client, id) => new Promise((resolve, reject) => {

    Request.put(`/client/${id}`, client).then((res) => {
        resolve(res)
    }).catch((err) => {
        console.error(err)
        reject(err)
    })
})

export const deleteClient = (client) => new Promise((resolve, reject) => {

    Request.delete(`/client/${client}`).then((res) => {
        resolve(res)
    }).catch((err) => {
        console.error(err)
        reject(err)
    })
})

export const getClientbyemail = (email) => new Promise((resolve, reject) => {

    Request.get(`/client/findclientbyemail/${email}`).then((res) => {
        resolve(res)
    }).catch((err) => {
        console.error(err)
        reject(err)
    })
})


