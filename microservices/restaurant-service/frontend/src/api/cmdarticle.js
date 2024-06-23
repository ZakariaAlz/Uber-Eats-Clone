import { Request } from './config'

// api calls

export const getCmdArticles = () => new Promise((resolve, reject) => {

    Request.get("/cmdarticle").then((res) => {
        resolve(res)
    }).catch((err) => {
        reject(err)
    })
})

export const createCmdArticle = (cmdarticle) => new Promise((resolve, reject) => {

    Request.post("/cmdarticle", cmdarticle).then((res) => {
        resolve(res)
        console.log(res)
    }).catch((err) => {
        reject(err.toJSON())
    })
})

export const updateCmdArticle = (cmdarticle, id) => new Promise((resolve, reject) => {

    Request.put(`/cmdarticle/${id}`, cmdarticle).then((res) => {
        resolve(res)
    }).catch((err) => {
        console.error(err)
        reject(err)
    })
})

export const paiementCmdArticle = (cmdarticle, id) => new Promise((resolve, reject) => {

    Request.put(`/cmdarticle/paiement/${id}`, cmdarticle).then((res) => {
        resolve(res)
    }).catch((err) => {
        console.error(err)
        reject(err)
    })
})

export const deleteCmdArticle = (cmdarticle) => new Promise((resolve, reject) => {
    Request.delete(`/cmdarticle/${cmdarticle}`).then((res) => {
        resolve(res)
    }).catch((err) => {
        console.error(err)
        reject(err)
    })
})
