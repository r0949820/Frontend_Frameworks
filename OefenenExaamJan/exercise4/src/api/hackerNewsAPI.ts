import axios from 'axios'
import {EndpointType} from '../models/IEndpoint.ts'
import {IItem} from '../models/IItem.ts'
import {useQuery, UseQueryResult} from '@tanstack/react-query'
import {useContext} from 'react'
import SettingContext from '../context/settingContext.ts'

//region Mutations & queries

/**
 * ---------------------------------------------------------------------------------------------------------------------
 *                                          MUTATIONS & QUERIES
 * ---------------------------------------------------------------------------------------------------------------------
 */

export const useGetItemIds = (endpoint: EndpointType): UseQueryResult<number[], Error> => {
    const {refetchInterval} = useContext(SettingContext)
    return useQuery({
        queryKey: ['stories', endpoint],
        queryFn: () => getItemIds(endpoint),
        refetchInterval,
    })
}

export const useGetItem = (id: number): UseQueryResult<IItem, Error> => {
    const {refetchInterval} = useContext(SettingContext)
    return useQuery({
        queryKey: ['item', id],
        queryFn: () => getItem(id),
        refetchInterval,
    })
}

//endregion


//region API functions


/**
 * ---------------------------------------------------------------------------------------------------------------------
 *                                          API functions
 * ---------------------------------------------------------------------------------------------------------------------
 */

const client = axios.create({
    baseURL: 'https://hacker-news.firebaseio.com/v0/',
})

/**
 * Haal de ID's van de meest populaire items op voor een gegeven endpoint.
 *
 * @param endpoint Het type story waarvoor de meest populaire items opgehaald moeten worden.
 */
const getItemIds = async (endpoint: EndpointType): Promise<number[]> => {
    const {data} = await client.get(
        `${endpoint}`,
    )
    return data
}

/**
 * Haal de details voor één specifiek item op.
 *
 * @param id Het ID voor het item dat opgehaald moet worden.
 */
const getItem = async (id: number): Promise<IItem> => {
    const {data} = await client.get(
        `/item/${id}.json`,
    )
    return data
}

//endregion
