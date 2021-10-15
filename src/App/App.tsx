import React from 'react';

import {Routes} from "../components/common/routes/Routes";
import Header from "../components/common/header/Header";
import {HashRouter} from "react-router-dom";

export const App = () => {
    return (
        <div className="App">
            <HashRouter>
                <Header/>
                <Routes/>
            </HashRouter>
        </div>
    );
}

//1234