import axios from 'axios'

const instance = axios.create({
    // baseURL: 'https://neko-back.herokuapp.com/2.0',
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true
})

// api
export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, { data: ProfileType }>('auth/login', data);
    },
    logout() {
        return instance.delete<{info: string, error?: string}>('auth/me');
    },
    authMe() {
        return instance.post<{}, {data: ProfileType}>('auth/me', {})
    },
    updateMe(name: string, avatar: string) {
        return instance.put<{name: string, avatar: string}, {data: {updatedUser: ProfileType, error?: string}}>('auth/me', {name, avatar})
    },
}

// types
export type ProfileType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number
    created: Date
    updated: Date
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;
    error?: string;
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
}



