import React from "react";
import s from './ErrorPage.module.scss'
import {Button} from "../../common/components/button/Button";
import { NavLink } from "react-router-dom";
import {ROUTES} from "../../app/routes/Routes";

export const ErrorPage: React.FC = () => {
    return (
        <div className={s.page}>
            <NavLink to={ROUTES.HOME}><Button value={'GO BACK HOME'} className={s.btn}/></NavLink>
        </div>
    )
}
