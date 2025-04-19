import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Login from './Components/Login'
import Signup from './Components/Signup'
import MapView from './Components/MapView' 
import ProtectedRoute from './routes/ProtectedRoute'
import './App.css'

// Simple home component
function Home() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Map App Home</h1>
      <p>Welcome to the Map Application!</p>
      <div style={{ marginTop: '20px' }}>
        <a href="/login" style={{ marginRight: '10px' }}>Login</a>
        <a href="/signup" style={{ marginRight: '10px' }}>Signup</a>
        <a href="/map">View Map</a>
      </div>
    </div>
  );
}

// Debug component to show current route
function RouteInfo() {
  const location = useLocation();
  
  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '10px', 
      right: '10px',
      padding: '10px',
      background: '#f0f0f0',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 1000 
    }}>
      <p><strong>Current Route:</strong> {location.pathname}</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route 
          path="/map" 
          element={
            <ProtectedRoute>
              <MapView /> {/* Using your actual MapView component */}
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <RouteInfo />
    </div>
  );
}

export default App;