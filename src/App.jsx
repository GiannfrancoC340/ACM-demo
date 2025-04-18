import { Routes, Route, Navigate } from 'react-router-dom'
import Signup from './Components/Signup'
import Login from './Components/Login'
import MapView from './Components/MapView'
import ProtectedRoute from './routes/ProtectedRoute' // Make sure path case matches your folder structure
import Debug from './Components/Debug'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/debug" />} />
      <Route path="/debug" element={<Debug />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/map"
        element={
          <ProtectedRoute>
            <MapView />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App;
