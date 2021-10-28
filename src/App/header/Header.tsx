import React from 'react';
import {NavLink} from "react-router-dom";
import {Button} from "../../common/components/button/Button";
import { ROUTES } from '../routes/Routes';
import s from './Header.module.scss'
import {useSelector} from "react-redux";
import {AppStateType} from "../../bll/store";

export const Header = () => {
    const isLoggedIn = useSelector((state: AppStateType) => state.login.isLoggedIn)

    return (
        <div className={s.header}>
            <div>
                <NavLink to={ROUTES.TEST}><Button value={'test-components'} className={s.btn}/></NavLink>
                <NavLink to={ROUTES.HOME}><Button value={'all-pages'} className={s.btn}/></NavLink>
            </div>
            <div>
                <NavLink to={ROUTES.PROFILE}><Button value={'Profile'} className={s.btn}/></NavLink>
            </div>
            <div>
                <NavLink style={{opacity: isLoggedIn ? '0' : '1'}} to={ROUTES.LOGIN}><Button value={'Log In'} className={s.btn}/></NavLink>
                <NavLink style={{opacity: isLoggedIn ? '0' : '1'}} to={ROUTES.REGISTRATION}><Button value={'Sign Up'} className={s.btn}/></NavLink>
                <NavLink style={{opacity: isLoggedIn ? '0' : '1'}} to={ROUTES.PACKS}><Button value={'Packs'} className={s.btn}/></NavLink>
            </div>
        </div>
    )
}
