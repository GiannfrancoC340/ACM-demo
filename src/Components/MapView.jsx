import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import L from 'leaflet'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

// Fix for the default icon
let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34]
});

// Set the default icon for all markers
L.Marker.prototype.options.icon = DefaultIcon;

// Create a custom red icon using the base64 approach
const redIconUrl = "data:image/svg+xml;base64," + btoa(`
<svg xmlns="http://www.w3.org/2000/svg" width="25" height="41" viewBox="0 0 25 41">
  <path fill="#e04141" stroke="#ffffff" stroke-width="1" d="M12.5,1C5.6,1,0,6.6,0,13.5c0,4.6,2.4,8.7,6,11c0,0,0.1,0.1,0.1,0.1l5.6,16.1c0.2,0.5,0.8,0.8,1.4,0.5c0.2-0.1,0.4-0.2,0.5-0.5L19.2,24c0,0,0.1-0.1,0.1-0.1c3.6-2.3,6-6.4,6-11C25.3,6.6,19.4,1,12.5,1z M12.5,18c-2.5,0-4.5-2-4.5-4.5s2-4.5,4.5-4.5s4.5,2,4.5,4.5S15,18,12.5,18z"/>
</svg>
`);

// Create a usable Leaflet icon from the base64 SVG
const redIcon = L.icon({
  iconUrl: redIconUrl,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34]
});

export default function MapView() {
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Boca Raton Airport coordinates
  const bocaRatonAirport = {
    lat: 26.3785,
    lng: -80.1077,
    description: "Boca Raton Airport (BCT)",
    flightCount: 2,
    flights: [
      { route: "RDU to BCT", time: "2:56 PM" },
      { route: "BCT to MIA", time: "4:30 PM" }
    ]
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase.from('locations').select('*')
        if (error) {
          console.error("Error fetching locations:", error)
          setError(`Error: ${error.message}`)
        } else {
          console.log("Fetched locations:", data)
          setLocations(data || [])
        }
      } catch (err) {
        console.error("Exception:", err)
        setError(`Exception: ${err.message}`)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <div>Loading map data...</div>
  if (error) return <div>{error}</div>

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer 
        center={[bocaRatonAirport.lat, bocaRatonAirport.lng]} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer 
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Boca Raton Airport marker with flight information */}
        <Marker 
          position={[bocaRatonAirport.lat, bocaRatonAirport.lng]} 
          icon={redIcon}
        >
          <Popup>
            <div style={{ fontFamily: 'Arial, sans-serif', padding: '5px' }}>
              <h3 style={{ marginTop: '0', color: '#e04141' }}>{bocaRatonAirport.description}</h3>
              <p>A public-use airport serving South Florida</p>
              <p style={{ fontWeight: 'bold' }}>Number of flights leaving BCT: {bocaRatonAirport.flightCount}</p>
              
              <div style={{ marginTop: '10px' }}>
                <h4 style={{ marginBottom: '5px', borderBottom: '1px solid #ccc', paddingBottom: '5px' }}>Today's Flights:</h4>
                <ul style={{ paddingLeft: '20px', margin: '5px 0' }}>
                  {bocaRatonAirport.flights.map((flight, index) => (
                    <li key={index} style={{ marginBottom: '5px' }}>
                      <strong>{flight.route}</strong> - {flight.time}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div style={{ fontSize: '0.8em', marginTop: '10px', color: '#666' }}>
                Coordinates: {bocaRatonAirport.lat.toFixed(4)}, {bocaRatonAirport.lng.toFixed(4)}
              </div>
            </div>
          </Popup>
        </Marker>
        
        {/* Map your actual location data */}
        {locations && locations.length > 0 && locations.map(loc => (
          <Marker 
            key={loc.id} 
            position={[loc.lat, loc.lng]} 
            icon={redIcon}
          >
            <Popup>{loc.description}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}