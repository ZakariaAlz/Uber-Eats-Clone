import { Request } from './config'

export const getDeveloperbyemail = (email) => new Promise((resolve, reject) => {

    Request.get(`/Developer/finddeveloperbyemail/${email}`).then((res) => {
        resolve(res)
    }).catch((err) => {
        console.error(err)
        reject(err)
    })
})

export const updateDeveloper = (developer, id) => new Promise((resolve, reject) => {

    Request.put(`/Developer/${id}`, developer).then((res) => {
        resolve(res)
    }).catch((err) => {
        console.error(err)
        reject(err)
    })
})
