import { Request } from './config'

// api calls

export const getComponents = () => new Promise((resolve, reject) => {

    Request.get("/component").then((res) => {
        resolve(res)
    }).catch((err) => {
        reject(err)
    })
})

export const createComponent = (component) => new Promise((resolve, reject) => {

    Request.post("/component", component).then((res) => {
        resolve(res)
        console.log(res)
    }).catch((err) => {
        reject(err.toJSON())
    })
})

export const updateComponent = (component, id) => new Promise((resolve, reject) => {

    Request.put(`/component/${id}`, component).then((res) => {
        resolve(res)
    }).catch((err) => {
        console.error(err)
        reject(err)
    })
})


export const deleteComponent = (component) => new Promise((resolve, reject) => {
    Request.delete(`/component/${component}`).then((res) => {
        resolve(res)
    }).catch((err) => {
        console.error(err)
        reject(err)
    })
})
