import axios from "axios";
export const BASE_URL = "http://localhost:3000/";
const service = axios.create({
  baseURL: BASE_URL,
  timeout: 300000,
  encode : 'charset=utf-8',
  withCredentials:false
})

export default service;
