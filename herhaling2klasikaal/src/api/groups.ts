import assertLoggedInAndGetId from './utils/assertLoggedInAndGetId.ts'
import supabaseClient from './utils/supabaseClient.ts'
import IGroup from '../models/IGroup.ts'
import IPost from '../models/IPost.ts'
import {IProfile} from '../models/IProfile.ts'

//region Mutations & queries

/**
 * ---------------------------------------------------------------------------------------------------------------------
 *                                          MUTATIONS & QUERIES
 * ---------------------------------------------------------------------------------------------------------------------
 */


//endregion


//region API functions


/**
 * ---------------------------------------------------------------------------------------------------------------------
 *                                          API functions
 * ---------------------------------------------------------------------------------------------------------------------
 */


/**
 * Retrieve an array of all groups to which the current user is subscribed.
 */
const getAllSubscribedGroups = async (): Promise<IGroup[]> => {
    const id = await assertLoggedInAndGetId()

    const {data, error} = await supabaseClient
        .from('subscription')
        .select('group:group(*, owner:profiles(*))')
        .eq('userId', id)

    if (error) {
        throw error
    }

    // It is safe to perform the following casts. The foreign key groupId doesn't allow nulls, so the
    // "group is possible null" error can be safely ignored.
    return data.map(g => ({...g.group, createdAt: new Date(g.group?.createdAt as string)})) as IGroup[]
}

interface GetAppPublicGroupsParams {
    searchTerm?: string
}

/**
 * Retrieve an array of all public groups that start with the specified search term.
 *
 * @param searchTerm The text with which a group's name must begin. When empty or undefined, all public groups
 * will be returned.
 */
const getAllPublicGroups = async ({searchTerm}: GetAppPublicGroupsParams): Promise<IGroup[]> => {
    const {data, error} = await supabaseClient
        .from('group')
        .select('*, owner:profiles(*)')
        .ilike('name', `${searchTerm ?? ''}%`)
        .eq('isPrivate', false)

    if (error) {
        throw error
    }

    return data.map(g => ({...g, createdAt: new Date(g.createdAt)}))
}

interface CreateGroupParams {
    name: string
    description: string
    isPrivate: boolean
}

/**
 * Create a new group.
 *
 * @param name        The name of the new group.
 * @param description A description for the new group.
 * @param isPrivate  If true, the group will only be accessible to the user that created it
 * (and whoever (s)he adds).
 * @return The the newly created group.
 */
const createGroup = async ({name, description, isPrivate}: CreateGroupParams): Promise<IGroup> => {
    const owner = await assertLoggedInAndGetId()

    const {data, error} = await supabaseClient
        .from('group')
        .insert({owner, name, isPrivate, description})
        .select('*, owner:profiles(*)')
        .single()

    if (error) {
        throw error
    }

    await joinGroup({groupId: data.id})

    return {...data, createdAt: new Date(data.createdAt)}
}

interface JoinLeaveGroupParams {
    groupId: string
}

/**
 * Add the current user to the requested group.
 *
 * @param groupId The group to which the current user must be subscribed.
 */
const joinGroup = async ({groupId}: JoinLeaveGroupParams): Promise<void> => {
    const userId = await assertLoggedInAndGetId()

    const {error} = await supabaseClient
        .from('subscription')
        .insert({userId, groupId})

    if (error) {
        throw error
    }
}

/**
 * Remove the current user from the given group.
 *
 * @param groupId The id of the group from which the current user must be removed.
 */
const leaveGroup = async ({groupId}: JoinLeaveGroupParams) => {
    const userId = await assertLoggedInAndGetId()

    const {error} = await supabaseClient
        .from('subscription')
        .delete()
        .eq('userId', userId)
        .eq('groupId', groupId)

    if (error) {
        throw error
    }
}

interface GetGroupParams {
    id: string
}

/**
 * Retrieve a specific group using its id.
 *
 * @param id The id of the group which must be retrieved.
 */
const getGroup = async ({id}: GetGroupParams): Promise<IGroup> => {
    const {data, error} = await supabaseClient
        .from('group')
        .select('*, owner:profiles(*)')
        .eq('id', id)
        .single()

    if (error) {
        throw error
    }

    return {...data, createdAt: new Date(data.createdAt)}
}


interface GetPostsForGroupParams {
    groupId: string
}

/**
 * Retrieve all the posts that were created in a given group.
 *
 * @param groupId The id of the group for which to fetch the posts.
 */
const getPostsForGroup = async ({groupId}: GetPostsForGroupParams): Promise<IPost[]> => {
    const {data, error} = await supabaseClient
        .from('posts')
        .select('*, user:profiles(*)')
        .eq('groupId', groupId)
        .is('parentId', null)
        .order('createdAt', {ascending: false})

    if (error) {
        throw error
    }

    return data.map(p => ({...p, createdAt: new Date(p.createdAt)}))
}

interface GetGroupMembersParams {
    groupId: string
}

/**
 * Retrieve all the members of a specific group.
 *
 * @param groupId The id of the group for which the members must be retrieved.
 */
const getGroupMembers = async ({groupId}: GetGroupMembersParams): Promise<IProfile[]> => {
    const {data, error} = await supabaseClient
        .from('subscription')
        .select('user:profiles(*)')
        .eq('groupId', groupId)

    if (error) {
        throw error
    }

    // It is safe to assume that the user property will never be null since the foreign key is required.
    return data.map(s => s.user) as IProfile[]
}

interface AddUserToGroupParams {
    groupId: string
    userId: string
}

/**
 * Add a given user to a given group.
 *
 * @param groupId The group to which the given user must be subscribed.
 * @param userId  The id of the user that is to be added to the group.
 */
const addUserToGroup = async ({groupId, userId}: AddUserToGroupParams) => {
    const {error} = await supabaseClient
        .from('subscription')
        .insert({userId, groupId})

    if (error) {
        throw error
    }
}

interface CreatePostParams {
    title: string
    content: string
    groupId: string
}

/**
 * Create a new post in a specified group.
 *
 * @param title   The title of the post.
 * @param content The content of the post
 * @param groupId The id of the group.
 */
const createPost = async ({content, groupId, title}: CreatePostParams): Promise<IPost> => {
    const userId = await assertLoggedInAndGetId()

    const newPost = {
        title,
        content,
        groupId,
        userId,
    }

    const {error, data} = await supabaseClient
        .from('posts')
        .insert(newPost)
        .select('*, user:profiles(*)')
        .single()

    if (error) {
        throw error
    }

    return {...data, createdAt: new Date(data.createdAt)}
}

interface DeletePostParams {
    id: string
    groupId: string
}

/**
 * Delete the post (or comment) with the specified id.
 *
 * @param id The id of the post (or comment) that is to be deleted.
 * @return {Promise<void>}
 */
const deletePost = async ({id}: DeletePostParams): Promise<void> => {
    const {error} = await supabaseClient
        .from('posts')
        .delete()
        .eq('id', id)

    if (error) {
        throw error
    }
}

interface DeleteUserFromGroupParams {
    groupId: string
    userId: string
}

/**
 * Remove a given user from the given group.
 *
 * @param groupId The id of the group from which the current user must be removed.
 * @param userId  The id of the user which must be removed from the group.
 */
const removeUserFromGroup = async ({groupId, userId}: DeleteUserFromGroupParams): Promise<void> => {
    const {error} = await supabaseClient
        .from('subscription')
        .delete()
        .eq('userId', userId)
        .eq('groupId', groupId)

    if (error) {
        throw error
    }
}

interface GetPostParams {
    id: string
}

/**
 * Retrieve the post with the given id and all the first level comments for this post, ordered from newest to oldest.
 *
 * @param id The id of the post that must be retrieved.
 */
const getPost = async ({id}: GetPostParams): Promise<IPost | null> => {
    const [
        {data: posts, error: postError},
        {data: comments, error: commentError},
    ] = await Promise.all([
        supabaseClient
            .from('posts')
            .select('*, user:profiles(*)')
            .eq('id', id)
            .single(),
        supabaseClient
            .from('posts')
            .select('*, user:profiles(*)')
            .eq('parentId', id)
            .order('createdAt'),
    ])

    if (postError) {
        throw postError
    }

    if (commentError) {
        throw commentError
    }

    if (!posts) {
        return null
    }

    return {
        ...posts,
        createdAt: new Date(posts.createdAt),
        comments: comments?.map(c => ({...c, createdAt: new Date(c.createdAt)})),
    }
}

interface CreateCommentParams {
    content: string
    groupId: string
    parentId: string
}

/**
 * Create a new comment for a given post.
 *
 * @param content  The content of the comment.
 * @param groupId  The id of the group in which the comment is to be placed.
 * @param parentId The id of the parent post, the post/comment to which the comment is reply.
 */
const createComment = async ({content, groupId, parentId}: CreateCommentParams): Promise<IPost> => {
    const userId = await assertLoggedInAndGetId()

    const newComment = {
        content,
        groupId,
        userId,
        parentId,
    }

    const {data, error} = await supabaseClient
        .from('posts')
        .insert(newComment)
        .select('*, user:profiles(*)')
        .single()

    if (error) {
        throw error
    }

    return {...data, createdAt: new Date(data.createdAt)}
}

interface DeleteCommentParams {
    parentId: string
    id: string
}

/**
 * Delete the comment with the specified id.
 *
 * @param parentId  The id of the parent post.
 * @param id        The id of the comment that is to be deleted.
 */
const deleteComment = async ({parentId, id}: DeleteCommentParams): Promise<void> => {
    const {error} = await supabaseClient
        .from('posts')
        .delete()
        .eq('id', id)
        .eq('parentId', parentId)

    if (error) {
        throw error
    }
}

//endregion
