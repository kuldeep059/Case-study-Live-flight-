// server.js (flight-backend)
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // Set port from environment variable

app.use(cors());
app.options('/api/flights', cors())
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');

    // Flight Schema (Data Model - No Changes Needed)
    const flightSchema = new mongoose.Schema({
      flightNumber: String,
      status: String,
      gate: String,
      departureAirport: String,
      arrivalAirport: String,
      departureTime: Date
    });

    const Flight = mongoose.model('Flight', flightSchema);

    // API Endpoint to Get Flight Data
    app.get('/api/flights', async (req, res) => {
      try {
        const flightNumber = req.query.flightNumber;
        const dateString = req.query.date; // Get date as a string

        // Check if date string is valid
        if (dateString && !/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
          return res.status(400).json({ error: 'Invalid date format. Use DD/MM/YYYY' });
        }

        const [day, month, year] = dateString ? dateString.split('/') : [];
        const date = dateString ? new Date(year, month - 1, day) : null; 

        let query = {};

        if (flightNumber) {
          // Case-insensitive search for flightNumber (using regex)
          query.flightNumber = { $regex: new RegExp(`^${flightNumber}$`, 'i') };
        }

        if (date) {
          // Query for flights within the specified date range
          query.departureTime = {
            $gte: new Date(date.setHours(0, 0, 0, 0)), // Start of the day
            $lt: new Date(date.setHours(23, 59, 59, 999)) // End of the day
          };
        }

        const flights = await Flight.find(query);
        console.log('Fetched flights:', flights);
        if (flights.length === 0) {
          return res.status(404).json({ error: 'No flights found' });
        }
        res.json(flights);
      } catch (error) {
        console.error('Error fetching flights:', error.stack);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    // Error Handling Middleware (always keep it at the end)
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ error: 'Something went wrong!' });
    });

    // Start the Server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));
