import mongoose from 'mongoose';
import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { errors } from 'com'

dotenv.config()

const { JsonWebTokenError, TokenExpiredError } = jwt
const { MatchError, ContentError, DuplicityError } = errors
const { PORT, MONGO_URL, JWT_SECRET } = process.env

mongoose.connect(MONGO_URL)
    .then(() => {
        console.log('DB conected')

        const server = express()

        const jsonBodyParser = express.json

        server.use(cors())

        server.post('/customer', jsonBodyParser, (req, res) => {
            const { name, birthdate, email, username, password } = req.body
        })
    })