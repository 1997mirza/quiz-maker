import axios from 'axios'

export const baseURL = process.env.REACT_APP_API_SERVER
export const apiClient = axios.create({
    baseURL
})
