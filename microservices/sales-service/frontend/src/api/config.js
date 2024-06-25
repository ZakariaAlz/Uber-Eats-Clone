import axios from 'axios'

export const Request = axios.create({
  baseURL: "http://localhost:5000/sales-service/api",
  headers: {
    // "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Method": "DELETE, POST, GET, OPTIONS, PUT",
    "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
    "apikey": "P6APPN48d9tn5pnYkCkvJshkbzH1Kfn",
    "role":"sale",
  }
})
