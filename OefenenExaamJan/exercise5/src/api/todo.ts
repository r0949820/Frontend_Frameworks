import assertLoggedInAndGetId from './utils/assertLoggedInAndGetId.ts'
import supabaseClient from './utils/supabaseClient.ts'
import IToDoList from '../models/IToDoList.ts'
import ITask from '../models/ITask.ts'
import {QueryKey, useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult} from '@tanstack/react-query'
import {IProfile} from '../models/IProfile.ts'

//region Mutations & queries

/**
 * ---------------------------------------------------------------------------------------------------------------------
 *                                          MUTATIONS & QUERIES
 * ---------------------------------------------------------------------------------------------------------------------
 */
interface OptimisticContext<T> {
    oldData: T
    queryKey: QueryKey
}

export const useDeleteTask = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteTask,
        onSuccess: async (_, {toDoListId}) => {
            await queryClient.invalidateQueries(['tasks', toDoListId])
        },
    })
}

export const useUpdateTask = (): UseMutationResult<ITask, Error, UpdateTaskParams, OptimisticContext<ITask[]>> => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: updateTask,
        onMutate: async ({updatedTask}) => {
            const queryKey = ['tasks', updatedTask?.toDoListId]
            await queryClient.cancelQueries({queryKey})
            const oldData = queryClient.getQueryData<ITask[]>(queryKey) ?? []
            queryClient.setQueryData<ITask[]>(
                queryKey,
                old => old?.map(t => t.id === updatedTask.id ? updatedTask : t),
            )
            return {oldData, queryKey}
        },
        onError: (_, __, context) => {
            if (context) {
                queryClient.setQueryData<ITask[]>(context.queryKey, context.oldData)
            }
        },
    })
}

export const useCreateTask = (): UseMutationResult<ITask, Error, CreateTaskParams, OptimisticContext<ITask[]>> => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createTask,
        onMutate: async ({toDoListId, name, deadline}) => {
            const queryKey = ['tasks', toDoListId]
            await queryClient.cancelQueries({queryKey})
            const oldData = queryClient.getQueryData<ITask[]>(queryKey) ?? []
            const profile = queryClient.getQueryData<IProfile>(['profile'])

            if (!profile) {
                throw new Error('Not authenticated')
            }

            const newTask: ITask = {
                id: -1,
                name,
                deadline,
                toDoListId,
                complete: false,
                createdBy: profile,
            }

            queryClient.setQueryData<ITask[]>(queryKey, old => [ ... old ?? [], newTask])
            return {oldData, queryKey}
        },
        onError: (_, __, context) => {
            if (context) {
                queryClient.setQueryData<ITask[]>(context.queryKey, context.oldData)
            }
        },
        onSuccess: async (newTask, _, context) => {
            if (context) {
                queryClient.setQueryData<ITask[]>(context.queryKey, [...context.oldData, newTask])
            }
        },
    })
}

export const useGetTasksForList = (id: number): UseQueryResult<ITask[], Error> => {
    return useQuery({
        queryKey: ['tasks', id],
        queryFn: () => getTasksForList({id}),
    })
}

export const useGetList = (id: number): UseQueryResult<IToDoList, Error> => {
    return useQuery({
        queryKey: ['lists', id],
        queryFn: () => getList({id}),
    })
}

export const useDeleteList = (): UseMutationResult<void, Error, DeleteListParams, OptimisticContext<IToDoList[]>> => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteList,
        onMutate: async ({id}) => {
            const queryKey = ['toDoLists']
            await queryClient.cancelQueries({queryKey})
            const oldData = queryClient.getQueryData<IToDoList[]>(queryKey) ?? []
            queryClient.setQueryData<IToDoList[]>(queryKey, old => old?.filter(l => l.id !== id))
            return {oldData, queryKey}
        },
        onError: (_, __, context) => {
            if (context) {
                queryClient.setQueryData<IToDoList[]>(context.queryKey, context.oldData)
            }
        },
        onSuccess: async (_, {id}) => {
            await queryClient.invalidateQueries(['lists', id])
        },
    })
}

export const useGetLists = (): UseQueryResult<IToDoList[], Error> => {
    return useQuery({
        queryKey: ['lists'],
        queryFn: getLists,
    })
}

export const useCreateList = (): UseMutationResult<IToDoList, Error, CreateListParams, void> => {
return useMutation({
    mutationFn: createList,
})
}

//endregion


//region API functions


/**
 * ---------------------------------------------------------------------------------------------------------------------
 *                                          API functions
 * ---------------------------------------------------------------------------------------------------------------------
 */

/**
 * Retrieve all the To-Do lists that were created by the user, that are public, or were shared with the user.
 */
const getLists = async (): Promise<IToDoList[] | null> => {
    const id = await assertLoggedInAndGetId()

    const [
        {data: publicAndUser, error: errorOne},
        {data: shared, error: errorTwo},
    ] = await Promise.all([
        supabaseClient
            .from('toDoList')
            .select('*')
            .or(`ownerId.eq.${id},isPrivate.eq.false`),
        supabaseClient
            .from('userToDoList')
            .select('toDoList(*)')
            .eq('userId', id)
            .then(({data, error}) => ({data: data?.map(x => x.toDoList).filter(x => x !== null) ?? [], error})),
    ])

    if (errorOne) throw errorOne
    if (errorTwo) throw errorTwo

    // Can't seem to do this without the cast.
    return getOwnersForToDoList([...(publicAndUser ?? []), ...(shared ?? []) as IToDoList[]])
}

interface GetListParams {
    id: number
}

/**
 * Retrieve a single To-Do list from the database using its ID.
 *
 * @param id The id of the list that must be retrieved.
 */
const getList = async ({id}: GetListParams): Promise<IToDoList | null> => {
    const {data, error} = await supabaseClient
        .from('toDoList')
        .select('*, owner:profiles!toDoList_ownerId_fkey(*)')
        .eq('id', id)

    if (error) {
        throw error
    }

    return (await getOwnersForToDoList(data))[0]
}

interface DeleteListParams {
    id: number
}

/**
 * Delete a specific list from the database.
 *
 * @param id The id of the list which must be deleted.
 */
const deleteList = async ({id}: DeleteListParams): Promise<void> => {
    await new Promise(r => setTimeout(r, 500))

    const {error, count} = await supabaseClient
        .from('toDoList')
        .delete({count: 'exact'})
        .eq('id', id)

    if (error) {
        throw error
    }

    if (count === 0) {
        throw new Error(`Nothing was deleted, you most likely don't have the rights to delete this list.`)
    }
}

interface CreateListParams {
    name: string
    isPrivate: boolean
    sharedUsers: string[]
}

/**
 * Create a new To-Do list.
 *
 * @param name          The name of the new To-Do list.
 * @param isPrivate     Whether the list should be private or not.
 * @param sharedUsers   The ID's users with whom the list must be shared. These will only be taken into account when
 * the list is private.
 */
const createList = async ({name, isPrivate, sharedUsers}: CreateListParams): Promise<IToDoList> => {
    const ownerId = await assertLoggedInAndGetId()

    await new Promise(r => setTimeout(r, 2000))

    const {data: toDoList, error} = await supabaseClient
        .from('toDoList')
        .insert({name, ownerId, isPrivate})
        .select('*, owner:profiles!toDoList_ownerId_fkey(*)')
        .single()

    if (error) {
        throw error
    }

    if (isPrivate) {
        const {error: joinError} = await supabaseClient
            .from('userToDoList')
            .insert(sharedUsers.map(u => ({userId: u, toDoListId: toDoList.id})))

        if (joinError) {
            throw joinError
        }
    }

    return toDoList
}

interface UpdateTaskParams {
    updatedTask: ITask
}

/**
 * Update a task in the To-Do list.
 *
 * @param updatedTask The updated task.
 */
const updateTask = async ({updatedTask}: UpdateTaskParams): Promise<ITask> => {
    const id = await assertLoggedInAndGetId()

    const updates = {
        ...updatedTask,
        createdBy: typeof (updatedTask.createdBy) === 'string' ? updatedTask.createdBy : updatedTask.createdBy?.id,
        completedBy: updatedTask.complete ? id : null,
        deadline: updatedTask.deadline.toISOString(),
    }

    const {data, error} = await supabaseClient
        .from('tasks')
        .update(updates)
        .eq('id', updates.id)
        .select('*, completedBy:profiles!tasks_completedBy_fkey(*), createdBy:profiles!tasks_createdBy_fkey(*)')
        .single()

    if (error) {
        throw error
    }

    return {
        ...data,
        deadline: new Date(data.deadline),
    }
}

interface CreateTaskParams {
    name: string
    toDoListId: number
    deadline: Date
}

/**
 * Create a new task.
 *
 * @param name       The name of the task.
 * @param deadline   The deadline for the task.
 * @param toDoListId The id of the list to which the task belongs.
 */
const createTask = async ({name, deadline, toDoListId}: CreateTaskParams): Promise<ITask> => {
    const id = await assertLoggedInAndGetId()

    const task = {
        toDoListId,
        complete: false,
        createdBy: id,
        deadline: deadline.toISOString(),
        name,
    }

    const {error, data} = await supabaseClient
        .from('tasks')
        .insert(task)
        .select('*, completedBy:profiles!tasks_completedBy_fkey(*), createdBy:profiles!tasks_createdBy_fkey(*)')
        .single()

    if (error) {
        throw error
    }

    return {
        ...data,
        deadline: new Date(data.deadline),
    }
}

interface DeleteTaskParams {
    id: number
    toDoListId: number
}

/**
 * Delete a task from the database.
 *
 * @param id The id of the task which must be deleted.
 */
const deleteTask = async ({id}: DeleteTaskParams): Promise<void> => {
    const {error} = await supabaseClient
        .from('tasks')
        .delete()
        .eq('id', id)

    if (error) {
        throw error
    }
}

interface GetTasksForListParams {
    id: number
}

/**
 * Retrieve all the tasks for a given To-Do list.
 *
 * @param id The id of the list for which the tasks must be retrieved.
 */
const getTasksForList = async ({id}: GetTasksForListParams): Promise<ITask[]> => {
    const {data, error} = await supabaseClient
        .from('tasks')
        .select('*, completedBy:profiles!tasks_completedBy_fkey(*), createdBy:profiles!tasks_createdBy_fkey(*)')
        .eq('toDoListId', id)
        .order('id')

    if (error) {
        throw error
    }

    return data.map(t => ({...t, deadline: new Date(t.deadline)}))
}

/**
 * Add the owner property to a ToDoList object.
 * Can't retrieve this directly because of a problem with the supabase client.
 *
 * @param toDoLists An array of IToDoList objects for which the profile must be retrieved.
 */
const getOwnersForToDoList = async (toDoLists: IToDoList[]): Promise<IToDoList[]> => {
    const results = []
    for (const list of toDoLists) {
        results.push(supabaseClient
            .from('profiles')
            .select('*')
            .eq('id', list.ownerId)
            .single()
            .then(x => ({...list, owner: x.data})),
        )
    }
    return await Promise.all(results)
}

//endregion
