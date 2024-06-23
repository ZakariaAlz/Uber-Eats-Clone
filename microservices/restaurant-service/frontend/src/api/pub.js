import { Request } from './config'

// api calls

export const getPubs = () => new Promise((resolve, reject) => {

    Request.get("/pub").then((res) => {
        resolve(res)
    }).catch((err) => {
        reject(err)
    })
})

export const createPub = (pub) => new Promise((resolve, reject) => {

    Request.post("/pub", pub).then((res) => {
        resolve(res)
        console.log(res)
    }).catch((err) => {
        reject(err.toJSON())
    })
})

export const paiementPub = (pub, id) => new Promise((resolve, reject) => {

    Request.put(`/pub/paiement/${id}`, pub).then((res) => {
        resolve(res)
    }).catch((err) => {
        console.error(err)
        reject(err)
    })
})

export const updatePub = (pub, id) => new Promise((resolve, reject) => {

    Request.put(`/pub/${id}`, pub).then((res) => {
        resolve(res)
    }).catch((err) => {
        console.error(err)
        reject(err)
    })
})

export const deletePub = (pub) => new Promise((resolve, reject) => {
    Request.delete(`/pub/${pub}`).then((res) => {
        resolve(res)
    }).catch((err) => {
        console.error(err)
        reject(err)
    })
})
