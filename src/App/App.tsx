import React from 'react';
import {Routes} from "./routes/Routes";
import s from './App.module.scss'
import {Header} from "./header/Header";

export const App = () => {
    return (
        <div className={s.app}>
            <Header/>
            <Routes/>
        </div>
    );
}
//dsada

//dasa