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

// export const getArticleImage = (imageName) => {
//   return new Promise((resolve, reject) => {
//     Request.get(`/getArticleImage/${imageName}`, { responseType: 'arraybuffer' })
//       .then((response) => {
//         const extension = imageName.split('.').pop(); // Get the file extension
//         const imageMime = `image/${extension}`;
//         const base64Image = btoa(
//           new Uint8Array(response.data).reduce(
//             (data, byte) => data + String.fromCharCode(byte),
//             ''
//           )
//         );
//         const dataUrl = `data:${imageMime};base64,${base64Image}`;
//         resolve(dataUrl);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// };