import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {Test} from '../../pages/test/Test';
import {ErrorPage} from "../../pages/404/ErrorPage";
import {SetPassword} from "../../pages/set-password/setPassword";
import {Registration} from "../../pages/registration/Registration";
import {Login} from "../../pages/login/Login";
import {Profile} from "../../pages/profile/Profile";
import {PasswordRecovery} from "../../pages/password-recovery/PasswordRecovery";
import {Home} from "../../pages/home/Home";
import {Packs} from "../../pages/packs/Packs";

export enum ROUTES {
    HOME = '/',
    TEST = '/test',
    LOGIN = '/login',
    PROFILE = '/profile',
    REGISTRATION = '/registration',
    PASSWORD_RECOVERY = '/password-recovery/:token?',
    SET_PASSWORD = '/set-password',
    ERROR_PAGE = '/404',
    PACKS = '/packs'
}

export const Routes = () => {
    return (
        <Switch>
            <Route exact path={ROUTES.HOME} render={() => <Home/>}/>
            <Route path={ROUTES.TEST} render={() => <Test/>}/>
            <Route path={ROUTES.LOGIN} render={() => <Login/>}/>
            <Route path={ROUTES.PROFILE} render={() => <Profile/>}/>
            <Route path={ROUTES.REGISTRATION} render={() => <Registration/>}/>
            <Route path={ROUTES.PASSWORD_RECOVERY} render={() => <PasswordRecovery/>}/>
            <Route path={ROUTES.SET_PASSWORD} render={() => <SetPassword/>}/>
            <Route path={ROUTES.ERROR_PAGE} render={() => <ErrorPage/>}/>
            <Route path={ROUTES.PACKS} render={() => <Packs/>}/>
            <Redirect from={'*'} to={ROUTES.ERROR_PAGE}/>
        </Switch>
    )
}
