import React from "react";
import s from './Profile.module.scss'
import unknown from '../../common/assets/images/unknown.png'
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../bll/store";
import {Redirect} from "react-router-dom";
import {ROUTES} from "../../app/routes/Routes";
import {Button} from "../../common/components/button/Button";
import {logoutTC} from "../../bll/reducers/profileReducer";
import {Preloader} from "../../common/components/preloader/Preloader";

export const Profile: React.FC = () => {
    const name = useSelector((state: AppStateType) => state.profile.name)
    const email = useSelector((state: AppStateType) => state.profile.email)
    const avatar = useSelector((state: AppStateType) => state.profile.avatar)

    const isLoggedIn = useSelector((state: AppStateType) => state.login.isLoggedIn)
    const isLoading = useSelector((state: AppStateType) => state.login.isLoading)

    const dispatch = useDispatch()

    if (!isLoggedIn) {
        return <Redirect to={ROUTES.LOGIN}/>
    }

    return (
        <div className={s.page}>
            <div className={s.pageTitle}>Profile</div>
            <div className={s.logout}>
                {isLoggedIn && <Button red value={'logout'} onClick={() => dispatch(logoutTC())}/>}
            </div>
            <div className={s.profile}>
                <img className={s.img} src={avatar || unknown} alt="avatar"/>

                <div className={s.description}>
                    <div><h3>Name: </h3><p>{name}</p></div>
                    <div><h3>Email: </h3><p>{email}</p></div>
                </div>
            </div>

            {isLoading && <Preloader/>}
        </div>
    )
}
