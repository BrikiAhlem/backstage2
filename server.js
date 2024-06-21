const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/vehucule', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Successfully connected to DB');
  })
  .catch((error) => {
    console.log('Error connecting to DB:', error);
  });

// Define the Vehicle model
const vehicleSchema = new mongoose.Schema({
  vehicleMake: String,
  vehicleModel: String,
  vehicleModelVersion: String,
  drivetrainPowerHP: Number,
  performanceAcceleration: Number,
  performanceTopspeed: Number,
  rangeWLTP: Number,
  rangeReal: Number,
  efficiencyReal: Number,
  chargePlug: String,
  chargeStandardPower: Number,
  chargeStandardPhase: Number,
  chargeStandardPhaseAmp: Number,
  fastChargePowerMax: Number,
  batteryCapacityFull: Number,
  image: String,
  id: String,
  canRead: Boolean,
  makerImage: String,
  images: String,
  prix: Number
});

const Vehicle = mongoose.model('vehucule', vehicleSchema);

// Define routes
app.get('/vehucule', async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    console.log('Vehicles fetched from DB:', vehicles);  // Log the retrieved data to verify
    res.json(vehicles);
    console.log('Fetched vehicles successfully');
  } catch (error) {
    console.error('An error occurred while fetching data:', error);
    res.status(500).send('An error occurred while fetching data');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
