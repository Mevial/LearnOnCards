import {authAPI, LoginParamsType} from "../../dal/loginAPI";
import {Dispatch} from "redux";
import {setAvatarAC, setEmailAC, setNameAC} from "./profileReducer";

type initialLoginStateType = typeof initialLoginState
const initialLoginState = {
    isLoggedIn: false,
    loginError: '',
    logoutStatus: 'idle',
    isLoading: false
}

const loginReducer = (state: initialLoginStateType = initialLoginState, action: ActionLoginReducerType): initialLoginStateType => {
    switch (action.type) {
        case "LOGIN/SET-IS-LOGGED-IN":
            return {
                ...state,
                isLoggedIn: action.value
            }
        case "LOGIN/SET-IN-ERROR":
            return {
                ...state,
                loginError: action.error
            }
        case "LOGIN/SET-LOADING":
            return {
                ...state,
                isLoading: action.value
            }
        default:
            return state;
    }
}

// actions
export const setIsLoggedInAC = (value: boolean) => ({type: "LOGIN/SET-IS-LOGGED-IN", value} as const)
export const setErrorAC = (error: string) => ({type: "LOGIN/SET-IN-ERROR", error} as const)
export const setLoadingAC = (value: boolean) => ({type: "LOGIN/SET-LOADING", value} as const)


//thunk
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionLoginReducerType>) => {
    dispatch(setLoadingAC(true))

    authAPI.login(data)
        .then(res => {
            dispatch(setIsLoggedInAC(true))
            dispatch(setEmailAC(res.data.email))
            dispatch(setAvatarAC(res.data.avatar || ''))
            dispatch(setNameAC(res.data.name))
        })
        .catch((err) => {
            const error = err.response
                ? err.response.data.error
                : (err.message + `, more details in the console`);
            dispatch(setErrorAC(error))
        })
    .finally(() => {
        dispatch(setLoadingAC(false))
    })
}

//types
export type ActionLoginReducerType =
    ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setErrorAC>
    | ReturnType<typeof setAvatarAC>
    | ReturnType<typeof setEmailAC>
    | ReturnType<typeof setNameAC>
    | ReturnType<typeof setLoadingAC>

export default loginReducer;