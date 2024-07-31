// src/App.js
import React from 'react';
import Navbar from './components/navbar';
import Hero from './components/Hero';
import FlightStatus from './components/FlightStatus';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <section className="flight-status-section">
        <center><h2 className="flight-status-heading">Current Flight Status</h2></center>
        <FlightStatus /> 
        <Footer /> 
      </section>

    </div>
  );
}

export default App;
