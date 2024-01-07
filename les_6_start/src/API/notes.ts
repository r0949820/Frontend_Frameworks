import assertLoggedInAndGetId from './utils/assertLoggedInAndGetId.ts'
import supabaseClient from './utils/supabaseClient.ts'
import getUser from './utils/getUser.ts'
import {INote, INoteWithDirectoryInfo} from '../models/INote.ts'
import {QueryKey, useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult} from '@tanstack/react-query'

//region Mutations & queries


/**
 * ---------------------------------------------------------------------------------------------------------------------
 *                                          MUTATIONS & QUERIES
 * ---------------------------------------------------------------------------------------------------------------------
 */

export const useGetNotesForDirectory = (folderId: number | null): UseQueryResult<INote[], Error> => {
    return useQuery({
        queryKey: ['notes', folderId],
        queryFn: () => getNotesForDirectory({folderId}),
    })
}

export const useGetNotesForUser = (): UseQueryResult<INoteWithDirectoryInfo[], Error> => {
    return useQuery({
        queryKey: ['notes'],
        queryFn: () => getNotesForUser(),
    })
}

interface UseCreateNoteContext {
    previousNotes: INote[]
    queryKey: QueryKey
}

export const useCreateNote = (): UseMutationResult<INote, Error, CreateNoteParams, UseCreateNoteContext> => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createNote,
        onMutate: async (newNote) => {
            const queryKey = ['notes', newNote.folderId]
            await queryClient.cancelQueries({queryKey})
            const previousNotes = queryClient.getQueryData<INote[]>(queryKey) ?? []
            queryClient.setQueriesData<CreateNoteParams[]>(
                {queryKey},
                old => old ? [...old, newNote] : [newNote],
            )
            return {previousNotes, queryKey}
        },
        onError: async (_, __, context) => {
            if (context) {
                queryClient.setQueryData(context.queryKey, context.previousNotes)
                await queryClient.invalidateQueries({queryKey: context.queryKey})
            }
        },
        onSuccess: (newNote, _, context) => {
            if (context) {
                const {previousNotes, queryKey} = context
                queryClient.setQueryData<INote[]>(queryKey, [...previousNotes, newNote])
            }
        },
    })
}

interface UseDeleteNoteContext {
    previousNotes: INote[] | undefined
    queryKey: QueryKey
}


export const useDeleteNote = (): UseMutationResult<void, Error, DeleteNoteParams, UseDeleteNoteContext> => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteNote,
        onMutate: async (noteToDelete) => {
            const queryKey = ['notes']

            // Any active queries must be canceled as these might interfere with the optimistic update.
            await queryClient.cancelQueries({queryKey})

            // Create a backup of the current data in the query-cache.
            const previousNotes = queryClient.getQueryData<INote[]>(queryKey)

            // Alter the cache and add the new note.
            queryClient.setQueriesData<INote[]>(
                {queryKey},
                old => old?.filter(n => n.id !== noteToDelete.id),
            )

            // Return the old data which will be passed to the onSuccess, onError and onSettled functions as the
            // last parameter for each of these functions.
            return {previousNotes, queryKey}
        },
        onError: async (_, __, context) => {
            // Reset the query-cache to the old value when the delete operation failed.
            if (context) {
                queryClient.setQueryData(context?.queryKey, context.previousNotes)
                await queryClient.invalidateQueries({queryKey: context?.queryKey})
            }
        },
        // onSuccess isn't required since all the relevant data was removed in onMutate.
    })
}

export const useGetNote = (noteId: string): UseQueryResult<INote, Error> => {
    return useQuery({
        queryKey: ['note', noteId],
        queryFn: () => getNote({noteId}),
    })
}

interface UseUpdateNoteContext {
    oldNote: INote | undefined
    queryKey: QueryKey
}

export const useUpdateNote = (): UseMutationResult<INote, Error, UpdateNoteParams, UseUpdateNoteContext> => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: updateNote,
        onMutate: async ({newNote}) => {
            const queryKey = ['note', newNote.id]
            await queryClient.cancelQueries({queryKey})
            const oldNote = queryClient.getQueryData<INote>(queryKey)
            queryClient.setQueryData<INote>(queryKey, newNote)
            return {oldNote, queryKey}
        },
        onError: async (_, __, context) => {
            if (context) {
                queryClient.setQueryData<INote>(context.queryKey, context.oldNote)
                await queryClient.invalidateQueries({queryKey: context.queryKey})
            }
        },
        // onSuccess is not required since the edited fields were written tot the DB and the DB doesn't need to
        // calculate or generate anything based on the new data.
    })
}

//endregion


//region API functions


/**
 * ---------------------------------------------------------------------------------------------------------------------
 *                                          API functions
 * ---------------------------------------------------------------------------------------------------------------------
 */


interface CreateNoteParams {
    title: string
    folderId: number | null
}

/**
 * Create a new markdown note.
 *
 * @param title     The title of the new note.
 * @param folderId  The id of the folder which contains the node, or null if the note is located at the root.
 */
const createNote = async ({title, folderId}: CreateNoteParams): Promise<INote> => {
    // Add a timeout to show the difference between an optimistic update and query invalidation.
    await new Promise(r => setTimeout(r, 2500))

    const userId = await assertLoggedInAndGetId()

    const {error, data} = await supabaseClient
        .from('notes')
        .insert({
            title,
            content: `# ${title}`,
            folderId,
            userId,
            updatedAt: Date.now(),
        })
        .select()
        .single()

    if (error) {
        throw error
    }

    return data
}

interface DeleteNoteParams {
    id: string
}

/**
 * Delete a note from the database.
 *
 * @param id The id of the note which must be deleted.
 */
const deleteNote = async ({id}: DeleteNoteParams): Promise<void> => {
    const {error} = await supabaseClient
        .from('notes')
        .delete()
        .eq('id', id)

    if (error) {
        throw error
    }
}

interface GetNotesForDirectoryParams {
    folderId: number | null
}

/**
 * Retrieve all the notes in the given directory.
 *
 * @param folderId The id of the folder for which to retrieve the notes, or null when retrieving the notes in the root
 * folder.
 */
const getNotesForDirectory = async ({folderId}: GetNotesForDirectoryParams): Promise<INote[]> => {
    const user = await getUser()

    let query = supabaseClient
        .from('notes')
        .select('*')

    if (folderId) {
        query = query.eq('folderId', folderId)
    } else {
        query = query.is('folderId', null)
    }

    if (user) {
        query = query.or(`userId.is.null,userId.eq.${user.id}`)
    } else {
        query = query.is('userId', null)
    }

    const {error, data} = await query

    if (error) {
        throw error
    }

    return data
}

/**
 * Retrieve all the notes for the currently logged-in user, including the directories to which these notes belong.
 */
const getNotesForUser = async (): Promise<INoteWithDirectoryInfo[]> => {
    const user = await getUser()

    if (!user) {
        return []
    }

    const {error, data} = await supabaseClient
        .from('notes')
        .select('*, directory:directories (*)')
        .eq('userId', user.id)

    if (error) {
        throw error
    }

    return data
}

interface GetNoteParams {
    noteId: string
}

/**
 * Retrieve a single note from the database.
 *
 * @param noteId The id of the note that must be retrieved.
 */
const getNote = async ({noteId}: GetNoteParams): Promise<INote> => {
    const {error, data} = await supabaseClient
        .from('notes')
        .select('*')
        .eq('id', noteId)
        .single()

    if (error) {
        throw error
    }

    return data
}


interface UpdateNoteParams {
    newNote: INote
}

/**
 * Update the content of a note.
 *
 * @param newNote The updated note.
 */
const updateNote = async ({newNote}: UpdateNoteParams): Promise<INote> => {
    const {error, data} = await supabaseClient
        .from('notes')
        .update({...newNote, id: undefined})
        .eq('id', newNote.id)
        .select()
        .single()

    if (error) {
        throw error
    }

    return data
}

//endregion
