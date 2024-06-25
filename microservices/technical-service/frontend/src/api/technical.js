import { Request } from './config'

export const getTechnicalbyemail = (email) => new Promise((resolve, reject) => {

    Request.get(`/technical/findtechnicalbyemail/${email}`).then((res) => {
        resolve(res)
    }).catch((err) => {
        console.error(err)
        reject(err)
    })
})

export const updateTechnical = (technical, id) => new Promise((resolve, reject) => {

    Request.put(`/technical/${id}`, technical).then((res) => {
        resolve(res)
    }).catch((err) => {
        console.error(err)
        reject(err)
    })
})
