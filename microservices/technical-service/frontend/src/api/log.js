import { Request } from './config'

// api calls

export const getLogs = () => new Promise((resolve, reject) => {

    Request.get("/log").then((res) => {
        resolve(res)
    }).catch((err) => {
        reject(err)
    })
})

export const createLog = (log) => new Promise((resolve, reject) => {

    Request.post("/log", log).then((res) => {
        resolve(res)
        console.log(res)
    }).catch((err) => {
        reject(err.toJSON())
    })
})

export const updateLog = (log, id) => new Promise((resolve, reject) => {

    Request.put(`/log/${id}`, log).then((res) => {
        resolve(res)
    }).catch((err) => {
        console.error(err)
        reject(err)
    })
})

export const deleteLog = (log) => new Promise((resolve, reject) => {
    Request.delete(`/log/${log}`).then((res) => {
        resolve(res)
    }).catch((err) => {
        console.error(err)
        reject(err)
    })
})

