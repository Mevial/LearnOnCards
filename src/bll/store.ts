import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk, {ThunkAction} from "redux-thunk";
import profileReducer from "./reducers/profileReducer";
import loginReducer from "./reducers/loginReducer";
import registrationReducer from "./reducers/registrationReducer";
import {setPasswordReducer} from "./reducers/setPasswordReducer";
import {packsReducer} from "./reducers/packs-reducer";

const reducers = combineReducers({
    profile: profileReducer,
    login: loginReducer,
    registration: registrationReducer,
    setPassword:setPasswordReducer,
    packs: packsReducer,
})

const store = createStore(reducers, applyMiddleware(thunk));

export type AppStateType = ReturnType<typeof reducers>
export type AppActionsType = any

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppActionsType>

// @ts-ignore
window.store= store

export default store;