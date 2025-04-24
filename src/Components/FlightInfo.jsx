import { useParams, Link } from 'react-router-dom';

export default function FlightInfo() {
  const { flightId } = useParams();
  
  // Flight data - in a real app, this would come from a database
  const flightData = {
    'flight-1': {
      route: "RDU to BCT",
      time: "2:56 PM",
      airline: "SkyWay Express",
      flightNumber: "SW1234",
      aircraft: "Cessna Citation CJ3",
      status: "On Time",
      gate: "A3",
      terminal: "Private Aviation Terminal",
      duration: "2 hours 15 minutes",
      distance: "678 miles",
      departureAirport: {
        code: "RDU",
        name: "Raleigh-Durham International Airport",
        city: "Raleigh",
        state: "North Carolina"
      },
      arrivalAirport: {
        code: "BCT",
        name: "Boca Raton Airport",
        city: "Boca Raton",
        state: "Florida"
      }
    },
    'flight-2': {
      route: "BCT to MIA",
      time: "4:30 PM",
      airline: "Florida Connect",
      flightNumber: "FC567",
      aircraft: "Pilatus PC-12",
      status: "On Time",
      gate: "B2",
      terminal: "Main Terminal",
      duration: "45 minutes",
      distance: "52 miles",
      departureAirport: {
        code: "BCT",
        name: "Boca Raton Airport",
        city: "Boca Raton",
        state: "Florida"
      },
      arrivalAirport: {
        code: "MIA",
        name: "Miami International Airport",
        city: "Miami",
        state: "Florida"
      }
    }
  };
  
  // Get the flight data for the selected flight
  const flight = flightData[flightId];
  
  if (!flight) {
    return (
      <div className="flight-not-found">
        <h2>Flight Not Found</h2>
        <p>Sorry, the flight information you requested could not be found.</p>
        <Link to="/map">Return to Map</Link>
      </div>
    );
  }
  
  return (
    <div className="flight-info-container">
      <div className="flight-header">
        <h1>{flight.route}</h1>
        <div className="flight-time">{flight.time}</div>
        <div className="flight-status">Status: <span className="status">{flight.status}</span></div>
      </div>
      
      <div className="flight-details">
        <div className="flight-card">
          <h2>Flight Details</h2>
          <table className="details-table">
            <tbody>
              <tr>
                <td>Airline:</td>
                <td>{flight.airline}</td>
              </tr>
              <tr>
                <td>Flight Number:</td>
                <td>{flight.flightNumber}</td>
              </tr>
              <tr>
                <td>Aircraft:</td>
                <td>{flight.aircraft}</td>
              </tr>
              <tr>
                <td>Duration:</td>
                <td>{flight.duration}</td>
              </tr>
              <tr>
                <td>Distance:</td>
                <td>{flight.distance}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="flight-card">
          <h2>Departure</h2>
          <div className="airport-code">{flight.departureAirport.code}</div>
          <div className="airport-name">{flight.departureAirport.name}</div>
          <div className="airport-location">{flight.departureAirport.city}, {flight.departureAirport.state}</div>
          <div className="gate-info">
            <span>Terminal: {flight.terminal}</span>
            <span>Gate: {flight.gate}</span>
          </div>
        </div>
        
        <div className="flight-card">
          <h2>Arrival</h2>
          <div className="airport-code">{flight.arrivalAirport.code}</div>
          <div className="airport-name">{flight.arrivalAirport.name}</div>
          <div className="airport-location">{flight.arrivalAirport.city}, {flight.arrivalAirport.state}</div>
        </div>
      </div>
      
      <div className="flight-actions">
        <Link to="/map" className="back-button">Back to Map</Link>
      </div>
    </div>
  );
}