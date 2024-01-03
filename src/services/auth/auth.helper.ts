import Cookies from 'js-cookie';
import { IAuthResponse, IToken } from '@/src/store/admin/admin.interface'

export const saveTokenStorage = (data: IToken) => {
    Cookies.set('accessToken', data.access_token)
}

export const saveToStorage = (data: IAuthResponse) => {
    saveTokenStorage(data)

    localStorage.setItem('isLoggedIn', 'true')
}

export const removeTokenStorage = () => {
    Cookies.remove( 'accessToken')
}