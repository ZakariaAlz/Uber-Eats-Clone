import { Request } from './config'

// api calls

export const getCommandes = () => new Promise((resolve, reject) => {

    Request.get("/commande").then((res) => {
        resolve(res)
    }).catch((err) => {
        reject(err)
    })
})

export const createCommande = (commande) => new Promise((resolve, reject) => {

    Request.post("/commande", commande).then((res) => {
        resolve(res)
        console.log(res)
    }).catch((err) => {
        reject(err.toJSON())
    })
})

export const updateCommande = (commande, id) => new Promise((resolve, reject) => {

    Request.put(`/commande/${id}`, commande).then((res) => {
        resolve(res)
    }).catch((err) => {
        console.error(err)
        reject(err)
    })
})


export const deleteCommande = (commande) => new Promise((resolve, reject) => {
    Request.delete(`/commande/${commande}`).then((res) => {
        resolve(res)
    }).catch((err) => {
        console.error(err)
        reject(err)
    })
})

export const getCommandebyDelivery = (delivery) => new Promise((resolve, reject) => {

    Request.get(`/commande/findcommandebydelivery/${delivery}`).then((res) => {
        resolve(res)
    }).catch((err) => {
        console.error(err)
        reject(err)
    })
})

export const getCommandebyClient = (client) => new Promise((resolve, reject) => {

    Request.get(`/commande/findcommandebyclient/${client}`).then((res) => {
        resolve(res)
    }).catch((err) => {
        console.error(err)
        reject(err)
    })
})
