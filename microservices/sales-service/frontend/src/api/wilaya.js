import { Request } from './config'

// api calls

export const getWilayas = () => new Promise((resolve, reject) => {

    Request.get("/wilaya").then((res) => {
        resolve(res)
    }).catch((err) => {
        reject(err)
    })
})

