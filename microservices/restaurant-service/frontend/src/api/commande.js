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

export const getCommandebyRestaurant = (restaurant) => new Promise((resolve, reject) => {

    Request.get(`/commande/findcommandebyrestaurant/${restaurant}`).then((res) => {
        resolve(res)
    }).catch((err) => {
        console.error(err)
        reject(err)
    })
})