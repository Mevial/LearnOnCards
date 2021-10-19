import React from "react";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../bll/store";
import s from './ForgotPasswordCheckEmail.module.scss';

export const ForgotPasswordCheckEmail: React.FC = () => {

    const email = useSelector<AppStateType, string>(state => state.setPassword.email);


    return (
        <div className={s.page}>
            <div className={s.pageTitle}>Check Email</div>
            <div>
                {`We have sent an Email with instructions to ${email}`}
            </div>
        </div>
    )
}


