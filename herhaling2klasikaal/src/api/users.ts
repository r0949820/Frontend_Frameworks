import supabaseClient from './utils/supabaseClient.js'
import {IProfile} from '../models/IProfile.ts'
import assertLoggedInAndGetId from './utils/assertLoggedInAndGetId.ts'
import getUser from './utils/getUser.ts'


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


interface LoginOrRegisterParams {
    email: string
    password: string
    username?: string
}

const loginOrRegister = async ({email, password, username}: LoginOrRegisterParams): Promise<IProfile> => {
    if (username) {
        return await signUp({email, password, username})
    } else if (password) {
        return await signIn({email, password})
    }

    throw new Error('Invalid authentication attempt!')
}

/**
 * Retrieve the profile of the currently logged-in user.
 *
 * @return The profile of null if there is no active user.
 */
const getProfile = async (): Promise<IProfile | null> => {
    const user = await getUser()

    if (!user) {
        return null
    }

    const {data, error} = await supabaseClient
        .from('profiles')
        .select(`*`)
        .eq('id', user?.id)
        .maybeSingle()

    if (error) {
        throw error
    }

    return data
}

interface UpsertProfileParams {
    username: string
    avatar?: File | string
    firstName?: string
    name?: string
}

/**
 * Update or insert a new username into the user's profile. If no profile exists, it will be created, if one exists, it
 * will be updated.
 *
 * @param username  The username that will be used to identify the user.
 * @param avatar    The URL of the user avatar or a File to be uploaded.
 * @param firstName The first name of the user.
 * @param name      The surname of the user.
 */
const upsertProfile = async ({username, avatar, firstName, name}: UpsertProfileParams): Promise<IProfile> => {
    const id = await assertLoggedInAndGetId()
    const profile = await getProfile()

    let avatarURL = profile?.avatar ?? `https://ui-avatars.com/api/?background=random&name=${username.replace(' ', '+')}&rounded=true&format=svg`
    if (avatar && avatar instanceof File) {
        avatarURL = await uploadAvatar(avatar)
    }

    const updates = {
        id,
        updatedAt: (new Date()).toISOString(),
        username: username ?? profile?.username,
        avatar: avatarURL,
        firstName: firstName ?? profile?.firstName,
        name: name ?? profile?.name,
    }

    const {error, data} = await supabaseClient
        .from('profiles')
        .upsert(updates)
        .select('*')
        .single()

    if (error) {
        throw error
    }

    return data
}

/**
 * Upload a file to the Supabase Storage bucket. If the user already uploaded an avatar, it will be replaced.
 *
 * @param avatar The avatar that is to be uploaded.
 * @return The URL of the newly uploaded avatar.
 */
const uploadAvatar = async (avatar: File): Promise<string> => {
    if (!avatar) {
        throw new Error(`The image isn't defined.`)
    }

    if (avatar.size > 512000) {
        throw new Error(`The image is to big, it must be smaller than or equal to 512 bytes`)
    }

    const id = await assertLoggedInAndGetId()

    const path = `${id}.${avatar.type.split('/').at(-1)}`
    const {error} = await supabaseClient
        .storage
        .from('avatars')
        .upload(path, avatar, {upsert: true})

    if (error) {
        throw error
    }

    const {data: {publicUrl}} = supabaseClient
        .storage
        .from('avatars')
        .getPublicUrl(path)

    return publicUrl
}

interface AuthParams {
    email: string
    password: string
}

/**
 * Log in with an email and password.
 *
 * @param email    The user's email address.
 * @param password The user's password.
 */
const signIn = async ({email, password}: AuthParams): Promise<IProfile> => {
    const {error} = await supabaseClient.auth.signInWithPassword({email, password})

    if (error) {
        throw error
    }

    const profile = await getProfile()
    // It is safe to assume the profile exists since the user was just logged in successfully.
    // An error would have been thrown if the user hadn't logged in correctly.
    return profile as IProfile
}

interface SignUpParams extends AuthParams {
    username: string
}

/**
 * Register with an email and password, any email will do. No verification mails are sent.
 *
 * @param email     The user's email address.
 * @param password  The user's password.
 * @param username  The username for the newly created user.
 */
const signUp = async ({email, password, username}: SignUpParams): Promise<IProfile> => {
    const {error} = await supabaseClient.auth.signUp({email, password})

    if (error) {
        throw error
    }

    return await upsertProfile({username})
}

/**
 * Sign out.
 */
const signOut = async (): Promise<void> => {
    const {error} = await supabaseClient.auth.signOut()

    if (error) {
        throw error
    }
}

interface GetProfilesParams {
    username: string
}

/**
 * Retrieve all the profiles for which the username matches the given search value from the database.
 *
 * @param username A string which must be contained in the username of each returned profile.
 */
const getProfiles = async ({username}: GetProfilesParams): Promise<IProfile[]> => {
    const id = await assertLoggedInAndGetId()

    const {data, error} = await supabaseClient
        .from('profiles')
        .select('*')
        .neq('id', id)
        .ilike('username', `%${username}%`)

    if (error) {
        throw error
    }
    return data
}
//endregion
