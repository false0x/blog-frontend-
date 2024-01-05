import { removeTokenStorage, saveToStorage } from './auth.helper'
import Router from 'next/router'
import { axiosAuth, axiosClassic } from '@/src/api/api.interceptor'
import { IAuthResponse } from '@/src/store/admin/admin.interface'
import { getAuthUrl } from '@/src/config/api.config'


export const AuthService = {
    async login(username: string, password: string) {
        const response = await axiosClassic.post<IAuthResponse>(
            getAuthUrl('/login'),
            { username, password },
        )

        if (response.data.access_token) saveToStorage(response.data)

        return response
    },

    async logout() {
        removeTokenStorage()
        localStorage.removeItem('isLoggedIn')

        Router.push('/')
    },

    async checkAuth() {
        return axiosAuth.post<IAuthResponse>(
            getAuthUrl('/check'),
        )
    },
}
