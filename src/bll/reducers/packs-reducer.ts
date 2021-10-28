import {Dispatch} from "redux";
import {packsAPI} from "../../dal/packsAPI";
import {AppStateType} from "../store";

type initialPacksStateType = typeof initialPacksState

const initialPacksState = {
    packsError: '',
    packsStatus: false,
    packs: [],
    searchName: '',
    min: 0,
    max: 24,
    sortPacks: '',
    page: 1,
    packsPerPage: 10,
    currentPage: 1,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 24,
    packCardsId: '',
    packUserId: '',
}

export const packsReducer = (state: initialPacksStateType = initialPacksState, action: ActionsPacksReducerType): initialPacksStateType => {
    switch (action.type) {
        case "PACKS/SET-PACKS-TOTAL-COUNT":
            return {
                ...state,
                cardPacksTotalCount: action.count
            }
        case "PACKS/SET-SEARCH-PACKS-NAME":
            return {
                ...state,
                searchName: action.searchName
            }

        case "PACKS/SET-MIN-MAX-PRICE-RANGE":
            return {
                ...state,
                min: action.min,
                max: action.max
            }
        case "PACKS/SET-CARDS-ID":
            return {
                ...state,
                packCardsId: action.packId
            }
        case "PACKS/SET-CURRENT-PAGE":
            return {
                ...state,
                page: action.value
            }
        case "PACKS/SET-PACK-USER-ID":
            return {
                ...state,
                packUserId: action.userId
            }
        case "PACKS/SET-PACKS":
            return {
                ...state,
                // @ts-ignore
                packs: action.packs
            }
        case "PACKS/SET-IN-ERROR":
            return {
                ...state,
                packsError: action.error
            }
        case "PACKS/SET-LOADING":
            return {
                ...state,
                packsStatus: action.status
            }

        default:
            return state;
    }
}


export const setPacksAC = (packs: Array<PackType>) => ({type: "PACKS/SET-PACKS", packs} as const)
export const setPacksTotalCountAC = (count: number) => ({type: "PACKS/SET-PACKS-TOTAL-COUNT", count} as const)
export const setSearchNamePacksAC = (searchName: string) => ({type: "PACKS/SET-SEARCH-PACKS-NAME", searchName} as const)
export const setMinMaxPriceRangeAC = (min: number, max: number) => ({
    type: "PACKS/SET-MIN-MAX-PRICE-RANGE",
    min,
    max
} as const)
export const setPackCardsIdAC = (packId: string) => ({type: "PACKS/SET-CARDS-ID", packId} as const)
export const setPackUserIdAC = (userId: string) => ({type: "PACKS/SET-PACK-USER-ID", userId} as const)
export const setCurrentPageAC = (value: number) => ({type: "PACKS/SET-CURRENT-PAGE", value} as const)
export const setErrorAC = (error: string) => ({type: "PACKS/SET-IN-ERROR", error} as const)
export const setLoadingAC = (status: boolean) => ({type: "PACKS/SET-LOADING", status} as const)

//thunk


export const getPacksTC = () => (dispatch: Dispatch<ActionsPacksReducerType>, getState: () => AppStateType) => {
    const state = getState()
    const searchName = state.packs.searchName
    const min = state.packs.min
    const max = state.packs.max
    const sortPacks = state.packs.sortPacks
    const currentPage = state.packs.page
    const packsOnPage = state.packs.packsPerPage

    dispatch(setLoadingAC(true))
    packsAPI.getPacksData(searchName, min, max, sortPacks, currentPage, packsOnPage)
        .then((res) => {
            console.log(res.cardPacks)
            dispatch(setPacksAC(res.cardPacks))
            dispatch(setPacksTotalCountAC(res.cardPacksTotalCount))
        })
        .catch(e => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            dispatch(setErrorAC(error))
        })
        .finally(() => {
            dispatch(setLoadingAC(false))
        })
}

export const deletePackTC = (idPack: string | null) => (dispatch: Dispatch<ActionsPacksReducerType>) => {
    dispatch(setLoadingAC(true))
    packsAPI.deletePack(idPack)
        .then(response => {
            // @ts-ignore
            dispatch(getPacksTC())
        })
        .catch((err) => {
            const error = err.response
                ? err.response.data.error
                : (err.message + ', more details in the console');
            dispatch(setErrorAC(error))
        })
        .finally(() => {
            dispatch(setLoadingAC(false))
        })
}

export const updatePackTС = (packId: string, name: string) => (dispatch: Dispatch<ActionsPacksReducerType>, getState: () => AppStateType) => {
    dispatch(setLoadingAC(true))
    const newPack = {
        _id: packId,
        name: name
    }

    packsAPI.updatePack(newPack)
        .then(() => {
            // @ts-ignore
            dispatch(getPacksTC())
        })
        .catch(err => {
            const error = err.response
                ? err.response.data.error
                : (err.message + ', more details in the console');
            dispatch(setErrorAC(error))
        })
        .finally(() => {
            dispatch(setLoadingAC(false))
        })
}

export const addPackTC = (name: string) => (dispatch: Dispatch<ActionsPacksReducerType>, getState: () => AppStateType) => {
    dispatch(setLoadingAC(true))

    const newCard = {
        name: name
    }
    packsAPI.addNewPack(newCard)
        .then(response => {
            console.log(response)
            // @ts-ignore
            dispatch(getPacksTC())
        })
        .catch((err) => {
            const error = err.response
                ? err.response.data.error
                : (err.message + ', more details in the console');
            console.log(error)
            dispatch(setErrorAC(error))
        })
        .finally(() => {
            dispatch(setLoadingAC(false))
        })
}

//types

export type ActionsPacksReducerType =
    ReturnType<typeof setPacksAC>
    | ReturnType<typeof setPacksTotalCountAC>
    | ReturnType<typeof setSearchNamePacksAC>
    | ReturnType<typeof setMinMaxPriceRangeAC>
    | ReturnType<typeof setPackCardsIdAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setPackUserIdAC>
    | ReturnType<typeof setErrorAC>
    | ReturnType<typeof setLoadingAC>


export type PackType = {
    _id: string
    user_id: string | null
    name: string | null
    path: string | null
    cardsCount: number | null
    grade: number | null
    shots: number | null
    rating: number | null
    type: string | null
    created: Date | null
    updated: Date | null
    __v: number | null
    deckCover: string | null
    private: boolean

}
