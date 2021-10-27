import React, {useEffect} from 'react';
import {Routes} from "./routes/Routes";
import s from './App.module.scss'
import {Header} from "./header/Header";
import {authMe} from "../bll/reducers/profileReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../bll/store";

export const App = () => {
    const isLoggedIn = useSelector<AppStateType>(state => state.login.isLoggedIn)

    const dispatch = useDispatch()

    useEffect(() => {
        !isLoggedIn && dispatch(authMe())
    }, [])

    return (
        <div className={s.app}>
            <Header/>
            <Routes/>
        </div>
    );
}