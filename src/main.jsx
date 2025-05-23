import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import 'leaflet/dist/leaflet.css'
import './App.css'

// Create the root before rendering
const root = ReactDOM.createRoot(document.getElementById('root'))

// Render the app with BrowserRouter
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)