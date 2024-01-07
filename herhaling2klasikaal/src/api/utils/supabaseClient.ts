import { Database } from '../../models/supabase.ts'
import {createClient} from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

const supabaseClient = createClient<Database>(supabaseUrl, supabaseKey)

export default supabaseClient


