import React, {ChangeEvent, useState} from "react";
import s from './PasswordRecovery.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {Redirect, useParams} from "react-router-dom";
import {createPasswordTC} from "../../bll/reducers/setPasswordReducer";
import {AppStateType} from "../../bll/store";
import {Button} from "../../common/components/button/Button";
import {InputText} from "../../common/components/inputText/InputText";
import {Preloader} from "../../common/components/preloader/Preloader";

export const PasswordRecovery: React.FC = () => {
    const dispatch = useDispatch();
    const [password, setPassword] = useState<string>("");

    const errorPasswordState = useSelector<AppStateType, string>(state => state.setPassword.errorPassword);
    const loadingState = useSelector<AppStateType, boolean>(state => state.setPassword.loading);


    const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value);
    }
    const {token} = useParams<{ token: string }>();
    console.log(token)

    const sendInstruction = () => {
        dispatch(createPasswordTC(password, token));
    }
    const status = useSelector<AppStateType, number>(state => state.setPassword.status)
    if (status === 200) {
        debugger
        return (<Redirect to={"/login"}/>)
    }
    return (
        <div className={s.page}>
            <div className={s.pageTitle}>Create new password</div>
            <div className={s.mainBlock}>
                <div className={s.input}>
                    <InputText
                        label={"New password"}
                        value={password}
                        onChange={passwordHandler}
                        type={"password"}
                        name={"password"}/>
                </div>
                <p style={{height: '1em', color: '#de2e2e'}}>{errorPasswordState}</p>

                <div>
                    <Button disabled={loadingState} value={"Confirm new password"} onClick={sendInstruction}/>
                </div>

                {loadingState && <Preloader/>}

            </div>
        </div>
    )
}
