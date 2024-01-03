export interface ILoginData {
    username: string
    password: string
}

export interface IInitialState {
    isLoading: boolean
    isLoggedIn: boolean
}

export interface IAuthResponse {
    access_token: string
}