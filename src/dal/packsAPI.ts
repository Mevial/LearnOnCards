import axios from 'axios';
import {PackType} from "../bll/reducers/packs-reducer";


const instance = axios.create({
    // baseURL: 'https://neko-back.herokuapp.com/2.0/',
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true
})
export const packsAPI = {
    getPacksData: async (
        packName: string, min: number, max: number, sortPacks: string, page: number = 1, pageCount: number = 15
    ) => {
        const response = await instance.get<ResponseGetPacksType>(`cards/pack?pageCount=${pageCount}&page=${page}&packName=${packName}&sortPacks=${sortPacks}&min=${min}&max=${max}}`)
        return response.data
    },
    addNewPack: async (newPack: any) => {
        const response = await instance.post('cards/pack', {cardsPack: newPack})
        return response.data
    },
    deletePack: async (idPack: string | null) => {
        const response = await instance.delete(`cards/pack?id=${idPack}`)
        return response.data
    },
    updatePack: async (updatePack: any) => {
        const response = await instance.put('cards/pack', {cardsPack: updatePack})
        return response.data
    }
}


export type ResponseGetPacksType = {
    cardPacks: Array<PackType>
    cardPacksTotalCount: number
    minCardsCount: number | null
    maxCardsCount: number | null
    page: number | null
    pageCount: number | null
    sortPacks: string
    packUserId: string
}