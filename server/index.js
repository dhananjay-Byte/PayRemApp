const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')
const app = express()
const port = process.env.port || 5000;

require('dotenv').config();


// Routes
const fetchingRoutes = require('./middleware/Routes');

                                                                      
// middlewares
app.use(cors());
app.use(express.json());

app.use('/v1/user',fetchingRoutes);
app.use('/v1/user/reminder',fetchingRoutes);

app.use('/',fetchingRoutes);



// Connect to MongoDB
mongoose.connect(process.env.uri)
    .then(() => console.log("Connected to MongoDB!"))
    .catch(err => console.error("Error connecting to MongoDB:", err));

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})