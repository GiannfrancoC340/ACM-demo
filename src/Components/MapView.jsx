import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import L from 'leaflet'

const redIcon = new L.Icon({
  iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
})

export default function MapView() {
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase.from('locations').select('*')
        if (error) {
          console.error("Supabase query error:", error)
          setError(error.message)
        } else {
          console.log("Fetched locations:", data)
          setLocations(data || [])
        }
      } catch (err) {
        console.error("Fetch exception:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Full page map container style that overrides the root element constraints
  const mapContainerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    padding: 0,
    margin: 0,
    zIndex: 1
  }

  if (loading) return <div>Loading map data...</div>
  if (error) return <div>Error loading map: {error}</div>

  return (
    <div style={mapContainerStyle}>
      <MapContainer 
        center={[39.8283, -98.5795]} 
        zoom={4} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {locations && locations.length > 0 ? (
          locations.map(loc => (
            <Marker 
              key={loc.id} 
              position={[loc.lat, loc.lng]} 
              icon={redIcon}
            >
              <Popup>{loc.description}</Popup>
            </Marker>
          ))
        ) : (
          <div>No locations found</div>
        )}
      </MapContainer>
    </div>
  )
}