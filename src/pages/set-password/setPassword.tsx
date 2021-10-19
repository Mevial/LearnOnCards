import React from "react";
import {useSelector} from "react-redux";
import {AppStateType} from "../../bll/store";
import {ForgotPasswordCheckEmail} from "./ForgotPasswordCheckEmail/ForgotPasswordCheckEmail";
import {ForgotPassword} from "./ForgotPassword/ForgotPassword";

export const SetPassword: React.FC = React.memo(() => {

    const showModal = useSelector<AppStateType, boolean>(state => state.setPassword.showModalWindow);

    return (!showModal ? <ForgotPassword/> : <ForgotPasswordCheckEmail/>)
})




