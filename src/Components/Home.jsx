import React, { useContext } from 'react';
import mapImage from '../assets/map.jpg';
import { AuthContext } from '../Context/AuthContext';

function Home() {
  const { currentUser } = useContext(AuthContext);
  
  return (
    <div className="home-container">
      <h1>Welcome to the Map Viewer, {currentUser?.username}!</h1>
      <div className="map-container">
        <img src={mapImage} alt="Static Map" className="map-image" />
      </div>
    </div>
  );
}

export default Home;