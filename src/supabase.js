import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hcoklqocsuyfquhvvohz.supabase.co'

const supabaseKey = 'sb_publishable_iwwfdDeBmJZd7lsT01cs_A_MnIeX2aZ'

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)
