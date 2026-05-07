import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'TON_URL_SUPABASE'
const supabaseKey = 'TA_CLE_ANON_PUBLIC'

export const supabase = createClient(supabaseUrl, supabaseKey)
