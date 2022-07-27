const express = require('express');
const connectDB = require('./config/db');
const app = express ();
const PORT = process.env.PORT || 3000;

// Connect to Database
connectDB();

app.get('/', (req, res) => res.send('API Server is running.'));

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));

