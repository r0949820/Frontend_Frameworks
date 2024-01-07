// Adapted from https://github.com/supabase/supabase/discussions/6177
import {createClient, Session, SupabaseClient} from '@supabase/supabase-js'

let supabase: SupabaseClient

export const getCurrentSession = async ({email, password, supabaseUrl, supabaseKey}: {
    email: string
    password: string
    supabaseUrl: string
    supabaseKey: string
}): Promise<Session | null> => {
    // If there's already a supabase client, use it, don't create a new one.
    if (!supabase) {
        supabase = createClient(supabaseUrl, supabaseKey)
    }

    // Create a session for the user.
    const {data} = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    return data.session
}
