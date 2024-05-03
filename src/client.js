
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://ljyuffuvwkijommtenvc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqeXVmZnV2d2tpam9tbXRlbnZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ5MTcyMTksImV4cCI6MjAyMDQ5MzIxOX0.t1VLW-GXy-7QinCoqZitgKx14zQu5vfCNiq7j3A2r8A'
export const supabase = createClient(supabaseUrl, supabaseKey);

