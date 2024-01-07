import supabaseClient from './supabaseClient.js'
import {User} from '@supabase/supabase-js'

/**
 * Retrieve the user information from the local session data.
 * @throw An error is thrown when there is no active session the user data couldn't be read.
 */
const getUser = async (): Promise<User | null>  => {
    const { data: {session}, error: sessionError } = await supabaseClient.auth.getSession()

    if (sessionError) {
        throw new Error(`The following error occurred while retrieving the session data: ${sessionError}`)
    }

    if (!session) {
        return null
    }

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser()

    if (userError) {
        throw new Error(`The following error occurred while retrieving the user data: ${userError}`)
    }

    return user
}



export default getUser
