// require('dotenv').config({ path: './env' })
import dotenv from 'dotenv'
// import express from "express";
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";
import app from './app.js'

dotenv.config({
    path: './env'
})


connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at port : ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log(err)
    })








/*
const app = express()
; (async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        app.on('error', (error) => {
            console.log("ERRR", error)
            throw error
        })
        app.listen(process.env.PORT, () => {
            console.log(`Server Running On Port # ${process.env.PORT}`)
        })
    } catch (error) {
        console.log(error)
        throw err
    }
})()



// app.get('/', (req, res) => {
//     res.send("Hello World")

// })

// app.listen(3000, () => {
//     console.log("Senver Running")
// })
*/


// HTTP -- Hyper Text Transfer Protocol

// Request Headers ===> From Client
// Response Header ===> From Server

// Representation header ===> encoding / compression
// Payload Header ===> Data


// Most Commen Header

// Accept : Application / JSON
// User - Agent
// Authorization
// Content - Type
// Cookie
// Cache - Control


// HTTP Method 


// Get
// Put
// Post
// Delete


// HTTP Status Code

// 1xx Informational
// 2xx Success
// 3xx Redirection
// 4xx Client Error
// 5xx Server Error