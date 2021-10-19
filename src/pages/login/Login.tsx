import React, {useState} from "react";
import s from './Login.module.scss'
import {InputText} from "../../common/components/inputText/InputText";
import {Checkbox} from "../../common/components/checkbox/Checkbox";
import {Button} from "../../common/components/button/Button";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "../../bll/reducers/loginReducer";
import {AppStateType} from "../../bll/store";
import {NavLink, Redirect} from "react-router-dom";
import {ROUTES} from "../../app/routes/Routes";
import {Preloader} from "../../common/components/preloader/Preloader";


export const Login: React.FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)

    const isLoggedIn = useSelector<AppStateType>(state => state.login.isLoggedIn)
    const error = useSelector((state:AppStateType) => state.login.loginError)
    const isLoading = useSelector((state:AppStateType) => state.login.isLoading)

    const dispatch = useDispatch()
    const loginHandler = () => {
        dispatch(loginTC({email, password, rememberMe}))
    }

    if (isLoggedIn) {
        return <Redirect to={ROUTES.PROFILE}/>
    }

    return (
        <div className={s.page}>
            <div className={s.pageTitle}>Log In</div>

            <div style={{height: '1em'}} className={s.error}>{error}</div>

            <InputText label={'Email'} error={''} className={s.input} value={email}
                       onChange={(e) => setEmail(e.currentTarget.value)}/>
            <InputText label={'Password'} type={'password'} error={''} value={password} className={s.input}
                       onChange={(e) => setPassword(e.currentTarget.value)}/>

            <Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.currentTarget.checked)}>Remember me</Checkbox>

            <div>
                <NavLink to={ROUTES.HOME}><Button disabled={isLoading} red value={'Cancel'} className={s.btn}/></NavLink>
                <Button disabled={isLoading} value={'Log in'} onClick={loginHandler} className={s.btn}/>
            </div>

            <div>
                <NavLink className={s.link} to={ROUTES.SET_PASSWORD}>Forgot your password?</NavLink>
                <NavLink className={s.link} to={ROUTES.REGISTRATION}>Sign up</NavLink>
            </div>

            {isLoading && <Preloader/>}
        </div>
    )
}
