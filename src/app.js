import express from "express";
import cors from 'cors'
import cookieParser from "cookie-parser";
import userRouter from './routes/user.routes.js'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    Credential: true
}))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(express.json({
    limit: "16kb"
}))
app.use(cookieParser())

// routes import


// routes declearation
app.use("/api/v1/users", userRouter)


export default app   