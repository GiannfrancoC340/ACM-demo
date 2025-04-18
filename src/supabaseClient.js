import { createClient } from '@supabase/supabase-js'

const URL = 'https://vxzvlljbeexjhsqdogyk.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4enZsbGpiZWV4amhzcWRvZ3lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwMTY1MjcsImV4cCI6MjA2MDU5MjUyN30.Lq4qciSeVtEGHOb0VNk-AOhONgzpWyR0x8FUmQdV0lE';
export const supabase = createClient(URL, API_KEY);