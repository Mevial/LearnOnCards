import {applyMiddleware, combineReducers} from "redux";
import {createStore} from "redux";
import thunk from "redux-thunk";
import {loginReducer} from "./login-reducer";
import {passwordRecoveryReducer} from "./passwordRecovery-reducer";
import {profileReducer} from "./profile-reducer";
import {signInReducer} from "./signIn-reducer";
import {setNewPasswordReducer} from "./setNewPassword-reducer";

const reducers = combineReducers({
    login: loginReducer,
    registration: signInReducer,
    profile: profileReducer,
    passwordRecovery: passwordRecoveryReducer,
    newPassword: setNewPasswordReducer
});

export const store = createStore(reducers, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store;
console.log(store.getState())