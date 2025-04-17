import React from 'react';
import mapImage from '../assets/map.jpg';

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to the Map Viewer</h1>
      <div className="map-container">
        <img src={mapImage} alt="Static Map" className="map-image" />
      </div>
    </div>
  );
}

export default Home;