import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

export default function Debug() {
  const [supabaseStatus, setSupabaseStatus] = useState('Checking...')
  const [routerStatus, setRouterStatus] = useState('Router loaded')
  
  useEffect(() => {
    // Check if Supabase is configured
    if (supabase) {
      supabase.from('locations').select('count', { count: 'exact', head: true })
        .then(({ count, error }) => {
          if (error) {
            console.error('Supabase error:', error)
            setSupabaseStatus(`Supabase error: ${error.message}`)
          } else {
            setSupabaseStatus(`Supabase connected! Found ${count} locations.`)
          }
        })
        .catch(err => {
          console.error('Fetch error:', err)
          setSupabaseStatus(`Connection error: ${err.message}`)
        })
    } else {
      setSupabaseStatus('Supabase client not initialized')
    }
  }, [])

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>React App Debug Page</h1>
      <p><strong>Router Status:</strong> {routerStatus}</p>
      <p><strong>Supabase Status:</strong> {supabaseStatus}</p>
      <div>
        <h2>Environment Check:</h2>
        <ul>
          <li>React is running ✅</li>
          <li>Component rendering ✅</li>
        </ul>
      </div>
    </div>
  )
}