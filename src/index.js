// require('dotenv').config({ path: './env' })
import dotenv from 'dotenv'
// import express from "express";
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})

connectDB()








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
