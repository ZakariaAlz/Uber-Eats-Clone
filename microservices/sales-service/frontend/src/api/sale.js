import { Request } from './config'

export const getSalebyemail = (email) => new Promise((resolve, reject) => {

    Request.get(`/sale/findsalebyemail/${email}`).then((res) => {
        resolve(res)
    }).catch((err) => {
        console.error(err)
        reject(err)
    })
})

export const updateSale = (sale, id) => new Promise((resolve, reject) => {

    Request.put(`/Sale/${id}`, sale).then((res) => {
        resolve(res)
    }).catch((err) => {
        console.error(err)
        reject(err)
    })
})
