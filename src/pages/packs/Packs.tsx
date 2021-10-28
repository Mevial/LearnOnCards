import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import s from './Packs.module.css'
import {Redirect} from 'react-router-dom';
import {NavLink} from "react-router-dom";

import {AppStateType} from "../../bll/store";
import {
    getPacksTC,
    setMinMaxPriceRangeAC,
    setSearchNamePacksAC
} from "../../bll/reducers/packs-reducer";
import {ROUTES} from "../../app/routes/Routes";
import {Button} from "../../common/components/button/Button";
import {Range} from "../../common/components/range/Range";



export const Packs: FC = () => {

    const minCardsCount = useSelector<AppStateType, number>(state => state.packs.minCardsCount)
    const maxCardsCount = useSelector<AppStateType, number>(state => state.packs.maxCardsCount)
    const minPrice = useSelector<AppStateType, number>(state => state.packs.min)
    const maxPrice = useSelector<AppStateType, number>(state => state.packs.max)
    const cardPacksTotalCount = useSelector<AppStateType, number>(state => state.packs.cardPacksTotalCount)


    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.login.isLoggedIn)


    useEffect(() => {
        dispatch(getPacksTC())
    }, [dispatch])

    if (!isLoggedIn) {
        return <Redirect to={ROUTES.LOGIN}/>
    }


    const getAllPacks = () => {
        dispatch(setSearchNamePacksAC(''))
        dispatch(setMinMaxPriceRangeAC(0, 24))
        dispatch(getPacksTC())
    }

    const getMyPacks = () => {
        dispatch(setSearchNamePacksAC(''))
        dispatch(setMinMaxPriceRangeAC(0, 24))
        dispatch(getPacksTC())
    }


    return (
        <div className={s.settings}>


            <div className={s.settingsBtnBox}>
                <Button value={'All packs'}
                        onClick={getAllPacks}>All packs</Button>
                <Button value={'My packs'}
                        onClick={getMyPacks}>My packs</Button>
            </div>

            <NavLink to={ROUTES.PACKS + '/add'} className={s.addPack}>
                <Button value={'Add pack'}>
                    Add pack
                </Button>
            </NavLink>
            <NavLink to={ROUTES.PACKS + '/delete'} className={s.addPack}>
                <Button value={'Delete pack'}>
                    Delete pack
                </Button>
            </NavLink>

            <NavLink to={ROUTES.PACKS + '/update'} className={s.addPack}>
                <Button value={'Update pack'}>
                    Update pack
                </Button>
            </NavLink>
            <Range/>
            {/*<Table />*/}


        </div>
    )
}
