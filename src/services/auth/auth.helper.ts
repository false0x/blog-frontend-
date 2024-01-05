import Cookies from 'js-cookie'
import { IAuthResponse } from '@/src/store/admin/admin.interface'

export const saveTokenStorage = (data: IAuthResponse) => {
    Cookies.set('accessToken', data.access_token)
}

export const saveToStorage = (data: IAuthResponse) => {
    saveTokenStorage(data)

    localStorage.setItem('isLoggedIn', 'true')
}

export const removeTokenStorage = () => {
    Cookies.remove( 'accessToken')
    localStorage.setItem('isLoggedIn', 'false')
}