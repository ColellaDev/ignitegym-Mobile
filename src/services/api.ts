import axios from "axios";

import { AppError } from "@utils/AppError";

const api = axios.create({
  baseURL: 'http://192.168.15.40:3333',
  timeout: 3000
});

api.interceptors.response.use((response) => response, (error) => {
  if(error.response && error.response.data) {
    return Promise.reject(new AppError(error.response.data.message))
  } else {
    return Promise.reject(error)
  }
})

export { api };