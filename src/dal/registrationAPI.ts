import axios from "axios";

export const axiosInstanceLocal = axios.create({
    //baseURL: "https://neko-back.herokuapp.com/2.0/",
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true
})

type RegisterResponseType = {
    addedUser: Object
    error?: string
}
type RegisterPayloadType = {
    email: string
    password: string
}

export const registrationAPI = {
    register: (email: string, password: string) => {
        return axiosInstanceLocal.post<RegisterPayloadType, {data: RegisterResponseType}>('auth/register', {email, password})
    },
}