import {Dispatch} from "redux";
import {authAPI} from "../../dal/loginAPI";
import {setIsLoggedInAC} from "./loginReducer";
import {setIsRegistered} from "./registrationReducer";

type initialProfileStateType = typeof initialProfileState
const initialProfileState = {
    email: '',
    name: '',
    avatar: '',
    isLoading: false,
    error: ''
}

const profileReducer = (state: initialProfileStateType = initialProfileState, action: ActionProfileReducerType) => {
    switch (action.type) {
        case "PROFILE/SET-NAME":
            return {...state, name: action.value}
        case "PROFILE/SET-EMAIL":
            return {...state, email: action.value}
        case "PROFILE/SET-AVATAR":
            return {...state, avatar: action.value}
        case "PROFILE/SET-LOADING":
            return {...state, isLoading: action.value}
        case "PROFILE/SET-ERROR":
            return {...state, error: action.error}
        default:
            return state;
    }
}

export const setNameAC = (value: string) => ({type: "PROFILE/SET-NAME", value} as const)
export const setEmailAC = (value: string) => ({type: "PROFILE/SET-EMAIL", value} as const)
export const setAvatarAC = (value: string) => ({type: "PROFILE/SET-AVATAR", value} as const)
export const setLoadingAC = (value: boolean) => ({type: 'PROFILE/SET-LOADING', value} as const)
export const setError = (error: string) => ({type: 'PROFILE/SET-ERROR', error} as const)

//thunk
export const authMe = () => (dispatch: Dispatch) => {
    dispatch(setLoadingAC(true))

    authAPI.authMe()
        .then(res => {
            if (!res.data.error) {
                dispatch(setNameAC(res.data.name))
                dispatch(setAvatarAC(res.data.avatar || ''))
                dispatch(setEmailAC(res.data.email))
                dispatch(setIsLoggedInAC(true))
            } else {
                //dispatch(setError(res.data.error))
            }
        })
        .catch((error) => {
            //dispatch(setError(error.response.data.error + ' ' + (error.response.data.passwordRegExp || '')))
        })
        .finally(() => {
            dispatch(setLoadingAC(false))
        })
}

export const updateMe = (name: string, avatar: string) => (dispatch: Dispatch) => {
    dispatch(setLoadingAC(true))

    authAPI.updateMe(name, avatar)
        .then(res => {
            if (!res.data.error) {
                dispatch(setAvatarAC(res.data.updatedUser.avatar || ''))
            } else {
                dispatch(setError(res.data.error))
            }
        })
        .catch((error) => {
            dispatch(setError(error.response.data.error + ' ' + (error.response.data.passwordRegExp || '')))
        })
        .finally(() => {
            dispatch(setLoadingAC(false))
        })
}

export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setLoadingAC(true))

    authAPI.logout()
        .then((res) => {
            if (!res.data.error) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setIsRegistered(false))
            }
        })
        .catch((error) => {
            dispatch(setError(error.response.data.error + ' ' + (error.response.data.passwordRegExp || '')))
        })
        .finally(() => {
            dispatch(setLoadingAC(false))
        })
}

export type ActionProfileReducerType =
    ReturnType<typeof setNameAC>
    | ReturnType<typeof setEmailAC>
    | ReturnType<typeof setAvatarAC>
    | ReturnType<typeof setLoadingAC>
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setIsRegistered>
    | ReturnType<typeof setError>

export default profileReducer;