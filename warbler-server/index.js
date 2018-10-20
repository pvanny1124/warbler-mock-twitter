require('dotenv').config() //load all environment variables
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./handlers/error');
const authRoutes = require('./routes/auth');
const messagesRoutes = require('./routes/messages');

const PORT = 8081;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/users/:id/messages", messagesRoutes);
// all routes


//if no route works
app.use(function(req, res, next){
    let err = new Error("Not Found")
    err.status = 404;
    next(err);
})

app.use(errorHandler); //handles errors

app.listen(PORT, function(){
    console.log(`Server is starting on port ${PORT}`)
})