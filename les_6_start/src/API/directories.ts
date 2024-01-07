import {useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult} from '@tanstack/react-query'
import assertLoggedInAndGetId from './utils/assertLoggedInAndGetId.ts'
import supabaseClient from './utils/supabaseClient.ts'
import getUser from './utils/getUser.ts'
import {IDirectory} from '../models/IDirectory.ts'

//region Mutations & queries

/**
 * ---------------------------------------------------------------------------------------------------------------------
 *                                          MUTATIONS & QUERIES
 * ---------------------------------------------------------------------------------------------------------------------
 */

export const useGetDirectories = (parentId: number | null): UseQueryResult<IDirectory[], Error> => {
    return useQuery({
        queryKey: ['directories', parentId],
        queryFn: () => getDirectories({parentId}),
    })
}

export const useCreateDirectory = (): UseMutationResult<IDirectory, Error, CreateDirectoryParams, void> => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createDirectory,
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({queryKey: ['directories', data.parentId]})
        },
    })
}

//endregion

//region API functions

/**
 * ---------------------------------------------------------------------------------------------------------------------
 *                                          API functions
 * ---------------------------------------------------------------------------------------------------------------------
 */

interface GetDirectoriesParams {
    parentId: number | null
}

/**
 * Retrieve the subdirectories for a specific parent directory. All the directories available to the  logged-in
 * user will be returned, including any publicly available directories.
 *
 * @param parentId The id of the directory or null when retrieving
 */
const getDirectories = async ({parentId}: GetDirectoriesParams): Promise<IDirectory[]> => {
    const user = await getUser()

    let query = supabaseClient
        .from('directories')
        .select('*')

    if (parentId) {
        query = query.eq('parentId', parentId)
    } else {
        query = query.is('parentId', null)
    }

    if (user) {
        query = query.or(`userId.is.null,userId.eq.${user.id}`)
    } else {
        query = query.is('userId', null)
    }

    const {data, error} = await query

    if (error) {
        throw error
    }

    return data
}

interface CreateDirectoryParams {
    name: string
    parentId: number | null
}

/**
 * Create a new directory that belongs to the given user.
 *
 * @param name     The name of the new directory.
 * @param parentId The id of the parent directory, or null for a root level directory.
 */
const createDirectory = async ({name, parentId}: CreateDirectoryParams): Promise<IDirectory> => {
    const userId = await assertLoggedInAndGetId()

    // Add a timeout to clearly show the difference between an optimistic update and waiting for query invalidation.
    await new Promise(r => setTimeout(r, 1500))

    const {data, error} = await supabaseClient
        .from('directories')
        .insert({name, parentId, userId: userId})
        .select()
        .single()

    if (error) {
        throw error
    }

    return data
}

//endregion
