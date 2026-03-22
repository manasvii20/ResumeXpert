import axios from 'axios'
import { BASE_URL } from '../utils/apiPaths'
// import { response } from 'express'

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    }
})

//REQUEST INTERCEPTER
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('token')
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
)

//RESPONSE INTERCEPTER

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            // Redirect to home if 401 (Unauthorized) occurs, EXCEPT for login/register requests
            const isAuthRequest = error.config.url.includes('/api/auth/login') || error.config.url.includes('/api/auth/register');
            if (error.response.status === 401 && !isAuthRequest) {
                window.location.href = '/'
            }
            else if (error.response.status === 500) {
                console.error("Server Error")
            }
        }
        else if (error.code === 'ECONNABORTED') {
            console.error("Request timeout")
        }
        return Promise.reject(error)
    }
)

export default axiosInstance;