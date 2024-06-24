import { Request } from './config'


export const login = (username, password) => new Promise((resolve, reject) => {

    Request.post('/auth/sign-in', { username, password }).then((res) => {
        resolve(res)
    }).catch((err) => {
        reject(err)
    })
})

export const signup = (client_) => new Promise((resolve, reject) => {

    Request.post("/auth/client/signup", client_).then((res) => {
        resolve(res)
    }).catch((err) => {
        console.error(err)
        reject(err)
    })
})