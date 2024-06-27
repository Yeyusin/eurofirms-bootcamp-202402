import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { errors } from 'com'
import logic from './logic/index.js'

dotenv.config()

const { MatchError, ContentError, DuplicityError } = errors
const { PORT, MONGO_URL, JWT_SECRET } = process.env

mongoose.set('debug', true)

mongoose.connect(MONGO_URL)
    .then(() => {
        console.log('DB conected')

        const server = express()

        const jsonBodyParser = express.json()

        server.use(cors())

        server.post('/users/customer', jsonBodyParser, (req, res) => {
            try {
                const { name, birthdate, email, password } = req.body

                logic.registerCustomer(name, birthdate, email, password)
                    .then(() => res.status(201).send())
                    .catch(error => {
                        let status = 500

                        if (error instanceof DuplicityError)
                            status = 409

                        res.status(status).json({ error: error.constructor.name, message: error.message })
                    })
            } catch (error) {
                let status = 500

                if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
                    status = 409

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        server.post('/users/manager', jsonBodyParser, (req, res) => {
            try {
                const { name, birthdate, email, password } = req.body

                logic.registerManager(name, birthdate, email, password)
                    .then(() => res.status(201).send())
                    .catch(error => {
                        let status = 500

                        if (error instanceof DuplicityError)
                            status = 409
                        res.status(status).json({ error: error.constructor.name, message: error.message })
                    })

            } catch (error) {
                let status = 500

                if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
                    status = 400

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        server.post('/users/auth', jsonBodyParser, (req, res) => {
            try {
                const { email, password } = req.body

                logic.authenticateUser(email, password)
                    .then((userId, role) => {
                        const token = jwt.sign({ sub: userId, role }, JWT_SECRET, { expiresIn: '1h' })

                        res.status(200).json(token)
                    })
                    .catch(error => {
                        let status = 500

                        if (error instanceof MatchError)
                            status = 401

                        res.status(status).json({ error: error.constructor.name, message: error.message })
                    })

            } catch (error) {
                let status = 500

                if (error instanceof ContentError || error instanceof RangeError || error instanceof TypeError)
                    status = 400

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })
        server.listen(PORT, () => console.log(`API started on port ${PORT}`))
    })
    .catch(error => console.error(error))