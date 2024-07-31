import React, { useState, useEffect } from 'react';
import './FlightStatus.css'; // Import your CSS file

function FlightStatus() {
  const [flightData, setFlightData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const flightsPerPage = 5; 

  useEffect(() => {
    const fetchFlightData = async () => {
      setIsLoading(true); // Set loading state to true before fetching data
      try {
        const response = await fetch('http://localhost:5000/api/flights'); // Fetch from the proxy 
        if (!response.ok) {
          const errorData = await response.json(); // Try to get JSON error details
          throw new Error(
            `Server Error: ${response.status} - ${errorData.error || 'Unknown error'}`
          );
        }
        const data = await response.json();
        setFlightData(data);
      } catch (error) {
        console.error('Error fetching flight data:', error);
        setError(error.message); // Set the error state
      } finally {
        setIsLoading(false); // Set loading state to false after fetching (success or error)
      }
    };

    fetchFlightData();

    // Set up polling for real-time updates (consider WebSockets in production)
    const intervalId = setInterval(fetchFlightData, 30000); 
    return () => clearInterval(intervalId);
  }, []); 

  const handleNext = () => {
    setStartIndex((prevIndex) =>
      prevIndex + flightsPerPage >= flightData.length ? 0 : prevIndex + flightsPerPage
    );
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) =>
      prevIndex - flightsPerPage < 0 ? flightData.length - (flightData.length % flightsPerPage) : prevIndex - flightsPerPage
    );
  };

  const flightsToDisplay = flightData.slice(startIndex, startIndex + flightsPerPage);

  if (isLoading) {
    return <p>Loading flight data...</p>;
  }

  if (error) {
    return <p className='error'>Error: {error}</p>;
  }

  return (
    <div>
      <div className="flight-status-grid">
        {flightsToDisplay.map(flight => (
          <div key={flight._id || flight.flightNumber} className={`flight-status ${flight.status.toLowerCase()}`}>
            <h3>{flight.flightNumber}</h3>
            <p>Status: {flight.status}</p>
            <p>Gate: {flight.gate || "N/A"}</p> 
            <p>Departure: {flight.departureAirport}</p>
            <p>Arrival: {flight.arrivalAirport}</p>
            <p>Departure Time: {new Date(flight.departureTime).toLocaleString()}</p>
          </div>
        ))}
      </div>

      {flightData.length > flightsPerPage && (
        <div className="carousel-controls">
          <button onClick={handlePrev}>Previous</button>
          <button onClick={handleNext}>Next</button>
        </div>
      )}
    </div>
  );
}

export default FlightStatus;

