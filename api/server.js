/*
    AstroPet v2
*/

// Setup express
const express = require("express")
const app = express()
const log = require("./utils/log")
const cookieParser = require("cookie-parser")
const logEverything = require("./middleware/logger")

// Environment Variables
const { PORT, MONGO_HOST, MONGO_USERNAME, MONGO_PASSWORD, MONGO_PORT } = require("./config/config")

// Before anything happens, setup cors
const cors = require('cors');
app.use(cors());

// Connect to mongodb database
const mongoose = require("mongoose")
const connectionString = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/`
connectToDB = () => {
    log('Conecting to database!', 'cyan')

    mongoose.connect(connectionString, {
        useNewUrlParser: true
    })
        .then(() => {
            log('Successfully connected to database!', 'green');
        })
        .catch((err) => {
            log('Error connecting to the database!', 'red');
            setTimeout(connectToDB, 5000);
        });
}

connectToDB(true)

// Express middleware
app.use(express.json()) // Allow req.body to be JSON
app.use(cookieParser()) // Allow req.cookies to exist
app.use((req, res, next) => {
    log(`\nRequest Recieved:\n[${req.method || "unknown method"} => ${req.url || "unknown URL???"}]: ${JSON.stringify(req.body) || "no request body"}\n`, 'cyan')
    next()
}) // Log EVERYTHING

// Authentication Routes
const authRoutes = require("./routes/auth")
app.use("/v1/auth/", authRoutes)

// Listen on a port!
app.listen(PORT, () => log(`Server listening on port ${PORT}!`, 'green'))
