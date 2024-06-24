import { Request } from './config'

// api calls

export const getArticles = () => new Promise((resolve, reject) => {

    Request.get("/article").then((res) => {
        resolve(res)
    }).catch((err) => {
        reject(err)
    })
})

export const createArticle = (article) => new Promise((resolve, reject) => {

    Request.post("/article", article).then((res) => {
        resolve(res)
        console.log(res)
    }).catch((err) => {
        reject(err.toJSON())
    })
})

export const updateArticle = (article, id) => new Promise((resolve, reject) => {

    Request.put(`/article/${id}`, article).then((res) => {
        resolve(res)
    }).catch((err) => {
        console.error(err)
        reject(err)
    })
})

export const deleteArticle = (article) => new Promise((resolve, reject) => {
    Request.delete(`/article/${article}`).then((res) => {
        resolve(res)
    }).catch((err) => {
        console.error(err)
        reject(err)
    })
})

export const getArticlebyRestaurant = (restaurant) => new Promise((resolve, reject) => {

    Request.get(`/article/findarticlebyrestaurant/${restaurant}`).then((res) => {
        resolve(res)
    }).catch((err) => {
        console.error(err)
        reject(err)
    })
})
