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
    res.send("Gei de coaie sa ma iei")
    console.log("das")
});

//Database connection
try{mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("MongoDB Connected…")
})}
catch(err) {console.log("NUUUUUUUUUUUUUUUUUU")}
//Listening to the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App is running on port http://localhost:${port}`));