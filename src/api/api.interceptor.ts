import { API_URL } from '@/src/config/api.config'
import axios from 'axios'
import Cookies from 'js-cookie'
import { errorCatch, getContentType } from './api.helper'
import { toast } from 'react-toastify'
import { AuthService } from '@/src/services/auth/auth.service'
import { toastError } from '@/src/utils/toast-error'

export const axiosClassic = axios.create({
    baseURL: API_URL,
    headers: getContentType(),
})

export const axiosAuth = axios.create({
    baseURL: API_URL,
    headers: getContentType(),
})

axiosAuth.interceptors.request.use((config) => {
    const accessToken = Cookies.get('accessToken')

    if (config.headers && accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
})

axiosAuth.interceptors.response.use(
    (config) => config,
    async (error) => {
        const originalRequest = error.config

        originalRequest._isRetry = true

        if (
            error.response.status === 401 &&
            error.config &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true

            try {
                await AuthService.checkAuth();

                return axiosAuth.request(originalRequest);
            } catch (error) {
                if (errorCatch(error) === "Unauthorized") {
                    await AuthService.logout();

                    await toast.error('Session time has expired. Please log in again.')
                }
            }

            return axiosAuth.request(originalRequest)
        }

        throw error
    },
)

export default axiosAuth
