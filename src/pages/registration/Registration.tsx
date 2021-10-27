import React, {useState} from "react";
import s from './Registration.module.scss'
import {InputText} from "../../common/components/inputText/InputText";
import {Button} from "../../common/components/button/Button";
import {NavLink, Redirect} from "react-router-dom";
import {register, setError} from "../../bll/reducers/registrationReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../bll/store";
import {ROUTES} from "../../app/routes/Routes";
import {Preloader} from "../../common/components/preloader/Preloader";

export const Registration: React.FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')

    const dispatch = useDispatch()

    const isRegistered = useSelector((state: AppStateType) => state.registration.isRegistered)
    const error = useSelector((state: AppStateType) => state.registration.error)
    const isLoading = useSelector((state: AppStateType) => state.registration.isLoading)

    const submit = () => {
        if (password === confirm) {
            dispatch(register(email, password))
        } else {
            dispatch(setError('Password" and "Confirm password" should be equal.'))
        }
    }

    if (isRegistered) {
        return <Redirect to={ROUTES.LOGIN}/>
    }

    return (<>
            <div className={s.page}>
                <div className={s.pageTitle}>Sign up</div>

                <div className={s.error}>{error}</div>

                <InputText
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    label={'Email'} error={''}
                    className={s.input}/>

                <InputText
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    label={'Password'}
                    type={"password"} error={''}
                    className={s.input}/>

                <InputText
                    onChange={(e) => setConfirm(e.currentTarget.value)}
                    label={'Confirm password'} type={"password"}
                    error={''}
                    className={s.input}/>

                <div>
                    <NavLink to={ROUTES.HOME}><Button disabled={isLoading} red value={'Cancel'} className={s.btn}/></NavLink>
                    <Button onClick={submit} value={'Register'} disabled={isLoading}/>
                </div>

                {isLoading && <Preloader/>}
            </div>
        </>

    )
}
