import {Dispatch} from "redux";
import {forgotPasswordAPI} from "../../dal/setPasswordAPI";


//1 типизация
type setPasswordStateType = {
    email: string,
    password: string,
    showModalWindow: boolean,
    status: number,
    errorEmail: string,
    errorPassword: string,
    loading: boolean,
}
//2 объект
let initialSetPasswordState: setPasswordStateType = {
    email: "",
    password: "",
    showModalWindow: false,
    status: 0,
    errorEmail: "",
    errorPassword: "",
    loading: false,
}
//3 actions
export const saveEmail = (email: string) => ({type: "SET-PASSWORD/SAVE_EMAIL", email} as const);
export const savePassword = (password: string) => ({type: "SET-PASSWORD/SAVE_PASSWORD", password} as const);
export const savePasswordStatusCode = (status: number) => ({type: "SET-PASSWORD/SAVE_PASSWORD_STATUS_CODE", status} as const);

export const showModalWindow = (showModalWindow: boolean) => ({type: "SET-PASSWORD/SHOW_MODAL_WINDOW", showModalWindow} as const);
export const showErrorEmail = (errorEmail: string) => ({type: "SET-PASSWORD/SHOW_ERROR_EMAIL", errorEmail} as const);
export const showErrorPassword = (errorPassword: string) => ({type: "SET-PASSWORD/SHOW_ERROR_PASSWORD", errorPassword} as const);

export const setLoading = (loading: boolean) => ({type: "SET-PASSWORD/SET_LOADING", loading} as const);

//4 reducer
export const setPasswordReducer = (state = initialSetPasswordState, action: ActionSetPasswordReducerType): setPasswordStateType => {
    switch (action.type) {
        case "SET-PASSWORD/SAVE_EMAIL": {
            return {...state, email: action.email}
        }
        case "SET-PASSWORD/SAVE_PASSWORD": {
            return {...state, password: action.password}
        }
        case "SET-PASSWORD/SHOW_MODAL_WINDOW": {
            return {...state, showModalWindow: action.showModalWindow}
        }
        case "SET-PASSWORD/SHOW_ERROR_EMAIL": {
            return {...state, errorEmail: action.errorEmail}
        }
        case "SET-PASSWORD/SHOW_ERROR_PASSWORD": {
            return {...state, errorPassword: action.errorPassword}
        }
        case "SET-PASSWORD/SAVE_PASSWORD_STATUS_CODE": {
            return {...state, status: action.status}
        }
        case "SET-PASSWORD/SET_LOADING": {
            return {...state, loading: action.loading}
        }
        default:
            return state;
    }
}

//5 actionTypes
export type ActionSetPasswordReducerType =
    | ReturnType<typeof saveEmail>
    | ReturnType<typeof showModalWindow>
    | ReturnType<typeof savePasswordStatusCode>
    | ReturnType<typeof savePassword>
    | ReturnType<typeof showErrorEmail>
    | ReturnType<typeof showErrorPassword>
    | ReturnType<typeof setLoading>;


//6 саночки

export const sendInstructionTC = (email: string, ghPagesAddress: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setLoading(true));
        forgotPasswordAPI.forgot({email, message: ghPagesAddress})
            .then((response) => {
                debugger;
                dispatch(showModalWindow(true));
                dispatch(saveEmail(email));
                console.log(response.data.info);

            })
            .catch(({...Error}) => {
                debugger;
                console.log(Error.response.data.error)
                dispatch(showErrorEmail(Error.response.data.error))
            })
            .finally(() => {
                dispatch(setLoading(false))
            })
    }
}

export const createPasswordTC = (newPassword: string, token: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setLoading(true));

        forgotPasswordAPI.setNewPassword({password: newPassword, resetPasswordToken: token})
            .then((response) => {
                debugger
                dispatch(savePasswordStatusCode(response.status));
                dispatch(showModalWindow(false));
                dispatch(savePassword(newPassword));
            })
            .catch(({...Error}) => {
                debugger;
                console.log(Error.response.data.error);
                dispatch(showErrorPassword(Error.response.data.error));
            })
            .finally(() => {
                dispatch(setLoading(false))
            })
    }
}

