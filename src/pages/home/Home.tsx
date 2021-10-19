import React from "react";
import s from './Home.module.scss'
import {Button} from "../../common/components/button/Button";
import {NavLink} from "react-router-dom";
import {ROUTES} from "../../app/routes/Routes";

export const Home: React.FC = () => {
    return (
        <div className={s.page}>
            <div className={s.pageTitle}>All pages</div>

            <NavLink to={ROUTES.LOGIN}><Button value={'login'} className={s.btn}/></NavLink>
            <NavLink to={ROUTES.PROFILE}><Button value={'profile'} className={s.btn}/></NavLink>
            <NavLink to={ROUTES.REGISTRATION}><Button value={'registration'} className={s.btn}/></NavLink>
            <NavLink to={ROUTES.PASSWORD_RECOVERY}><Button value={'password-recovery'} className={s.btn}/></NavLink>
            <NavLink to={ROUTES.SET_PASSWORD}><Button value={'set-password'} className={s.btn}/></NavLink>
            <NavLink to={ROUTES.ERROR_PAGE}><Button value={'404'} className={s.btn}/></NavLink>
        </div>
    )
}
