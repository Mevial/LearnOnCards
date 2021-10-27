import {Dispatch} from "redux";
import {registrationAPI} from "../../dal/registrationAPI";

type initialRegistrationStateType = typeof initialRegistrationState
let initialRegistrationState = {
    isRegistered: false,
    error: '',
    isLoading: false
}

const registrationReducer = (state: initialRegistrationStateType = initialRegistrationState, action: ActionRegistrationReducerType) => {
    switch (action.type) {
        case "REGISTER/SET-SUCCESS":
            return {...state, isRegistered: action.value}
        case "REGISTER/SET-ERROR":
            return {...state, error: action.error}
        case "REGISTER/SET-LOADING":
            return {...state, isLoading: action.value}
        default:
            return state;
    }
}

export const setIsRegistered = (value: boolean) => ({type: 'REGISTER/SET-SUCCESS', value} as const)
export const setError = (error: string) => ({type: 'REGISTER/SET-ERROR', error} as const)
export const setLoading = (value: boolean) => ({type: 'REGISTER/SET-LOADING', value} as const)

//thunk
export const register = (email: string, password: string) => (dispatch: Dispatch) => {
    dispatch(setLoading(true))
    return registrationAPI.register(email, password)
        .then(res => {
            if (!res.data.error) {
                dispatch(setIsRegistered(true))
                dispatch(setError(''))
            } else {
                dispatch(setIsRegistered(false))
                dispatch(setError(res.data.error))
            }
        })
        .catch((error) => {
            dispatch(setIsRegistered(false))
            dispatch(setError(error.response.data.error + ' ' + (error.response.data.passwordRegExp || '')))
        })
        .finally(() => dispatch(setLoading(false)))
}

export type ActionRegistrationReducerType =
    ReturnType<typeof setIsRegistered>
    | ReturnType<typeof setError>
    | ReturnType<typeof setLoading>

export default registrationReducer;