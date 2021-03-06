"use strict"
const mongoose = require('mongoose');
const express = require("express");
const cors=require('cors');
const app = express();
require('dotenv').config()

// middleware
app.use(express.json());
app.use(cors());

const todoRoutes = require('./routes/todos');
app.use('/todos', todoRoutes);
app.get('/', (req, res) => {
    res.send("This is a simple api")
    
});

//Database connection
try{mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB Connectedâ€¦")
})}
catch(err) {console.log(err)}
//Listening to the server
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`App is running on port http://localhost:${port}`));