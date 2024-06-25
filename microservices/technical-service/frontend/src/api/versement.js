import { Request } from './config'

// api calls

export const getVersements = () => new Promise((resolve, reject) => {

    Request.get("/versement").then((res) => {
        resolve(res)
    }).catch((err) => {
        reject(err)
    })
})

export const createVersemnt = (versement) => new Promise((resolve, reject) => {

    Request.post("/versement", versement).then((res) => {
        resolve(res)
        console.log(res)
    }).catch((err) => {
        reject(err.toJSON())
    })
})

export const updateVersement = (versement, id) => new Promise((resolve, reject) => {

    Request.put(`/versement/${id}`, versement).then((res) => {
        resolve(res)
    }).catch((err) => {
        console.error(err)
        reject(err)
    })
})

export const deleteVersement = (versement) => new Promise((resolve, reject) => {
    Request.delete(`/versement/${versement}`).then((res) => {
        resolve(res)
    }).catch((err) => {
        console.error(err)
        reject(err)
    })
})
