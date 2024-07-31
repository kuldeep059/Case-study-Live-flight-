// src/components/Hero.jsx
import React, { useState } from 'react';
import './Hero.css';
import heroImage from '../images/hero-image.jpg';

function Hero() {
  const [formData, setFormData] = useState({
    flightNumber: '',
    date: '',
  });

  const [flightDetails, setFlightDetails] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dateString = formData.date;
      const formattedDateString = dateString ? dateString.split('-').reverse().join('/') : '';

      const queryString = `http://localhost:5000/api/flights?flightNumber=${formData.flightNumber}&date=${formattedDateString}`;
      console.log(queryString);
      setIsSubmitted(true); // Set submitted flag to true

      const response = await fetch(queryString); // use queryString variable

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.length > 0) {
        setFlightDetails(data[0]); // Display the first matching flight
        setError(null); // Clear any previous error
      } else {
        setFlightDetails(null);
        setError('No flights found matching the criteria.');
      }
    } catch (error) {
      console.error('Error fetching flight details:', error);
      setError(error.message);
    } finally {
      setShowPopup(true); // Show popup regardless of result
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setFlightDetails(null);
    setError(null);
    setIsSubmitted(false); // Reset submitted flag when popup is closed
  };

  return (
    <section className="hero">
      
      <img src={heroImage} alt="Hero" className="hero-image" />
      <div className="hero-content">
      <form onSubmit={handleSubmit} className="hero-form">
          <h2 className="hero-form-heading">Search by Flight Number</h2>
          <input
            type="text"
            name="flightNumber"
            placeholder="Enter Flight Number"
            value={formData.flightNumber}
            onChange={handleChange}
            required
          />
          <button type="submit">Search</button>
        </form>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close-btn" onClick={closePopup}>
              &times;
            </span>
            <h2>Flight Details</h2>
            {error ? (
              <p className="error-message">{error}</p> 
            ) : flightDetails ? ( 
              <>
                <p>Flight Number: {flightDetails.flightNumber}</p>
                <p>Status: {flightDetails.status}</p>
                <p>Gate: {flightDetails.gate || "N/A"}</p>
                <p>Departure: {flightDetails.departureAirport}</p>
                <p>Arrival: {flightDetails.arrivalAirport}</p>
                <p>
                  Departure Time:{" "}
                  {new Date(flightDetails.departureTime).toLocaleString()}
                </p>
              </>
            ) : isSubmitted ? ( // Show "Searching..." only after submission
              <p>Searching...</p>
            ) : null} 
          </div>
        </div>
      )}
    </section>
  );
}

export default Hero;
