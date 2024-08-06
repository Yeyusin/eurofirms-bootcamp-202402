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
const { JsonWebTokenError, TokenExpiredError } = jwt

mongoose.connect(MONGO_URL)
    .then(() => {
        console.log('DB conected')

        const server = express()

        const jsonBodyParser = express.json()

        server.use(cors())

        /*                           UserRoutes                        */

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
                    .then(user => {
                        const token = jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' })

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

        server.get('/users/:targetUserId', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { targetUserId } = req.params

                logic.retrieveUser(userId, targetUserId)
                    .then(user => res.json(user))
                    .catch(error => {
                        let status = 500

                        if (error instanceof MatchError)
                            status = 404

                        res.status(status).json({ error: error.constructor.name, message: error.message })
                    })
            } catch (error) {
                let status = 500

                if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
                    status = 400
                else if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
                    status = 401

                    error = new MatchError(error.message)
                }
                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        /*                          CinemaRoutes                               */

        server.post('/cinema', jsonBodyParser, (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { name, address } = req.body

                logic.createCinema(userId, name, address)
                    .then(() => res.status(201).send())
                    .catch(error => {
                        let status = 500

                        if (error instanceof MatchError)
                            status = 401

                        if (error instanceof DuplicityError)
                            status = 409
                        res.status(status).json({ error: error.constructor.name, message: error.message })
                    })

            } catch (error) {
                let status = 500

                if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
                    status = 400

                else if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
                    status = 401

                    error = new MatchError(error.message)
                }
                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        server.get('/cinemas', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                logic.retrieveCinemas(userId)
                    .then((cinemas) => res.json(cinemas))
                    .catch(error => {
                        let status = 500

                        if (error instanceof MatchError)
                            status = 401

                        res.status(status).json({ error: error.constructor.name, message: error.message })
                    })

            } catch (error) {
                let status = 500

                if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
                    status = 400

                else if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
                    status = 401

                    error = new MatchError(error.message)
                }
                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        server.get('/cinemas/:cinemaId', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { cinemaId } = req.params

                logic.retrieveCinema(userId, cinemaId)
                    .then((cinemas) => res.json(cinemas))
                    .catch(error => {
                        let status = 500

                        if (error instanceof MatchError)
                            status = 401

                        res.status(status).json({ error: error.constructor.name, message: error.message })
                    })

            } catch (error) {
                let status = 500

                if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
                    status = 400

                else if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
                    status = 401

                    error = new MatchError(error.message)
                }
                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        server.delete('/cinema/:cinemaId/delete', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { cinemaId } = req.params

                logic.deleteCinema(userId, cinemaId)
                    .then(() => res.status(204).send())
                    .catch(error => {
                        let status = 500

                        if (error instanceof MatchError)
                            status = 401
                        res.status(status).json({ error: error.constructor.name, message: error.message })
                    })

            } catch (error) {
                let status = 500

                if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
                    status = 400

                else if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
                    status = 401

                    error = new MatchError(error.message)
                }
                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        server.patch('/users/:cinemaId', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { cinemaId } = req.params

                logic.addCinemaToManager(userId, cinemaId)
                    .then(() => { res.status(200).send() })
                    .catch(error => {
                        let status = 500

                        if (error instanceof MatchError)
                            status = 401

                        res.status(status).json({ error: error.constructor.name, message: error.message })
                    })
            } catch (error) {
                let status = 500

                if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
                    status = 400
                else if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
                    status = 401

                    error = new MatchError(error.message)
                }
                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        server.patch('/users/:cinemaId/delete', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { cinemaId } = req.params

                logic.deleteCinemaToManager(userId, cinemaId)
                    .then(() => res.status(204).send())
                    .catch(error => {
                        let status = 500

                        if (error instanceof MatchError)
                            status = 401

                        res.status(status).json({ error: error.constructor.name, message: error.message })
                    })
            } catch (error) {
                let status = 500

                if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
                    status = 400
                else if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
                    status = 401

                    error = new MatchError(error.message)
                }
                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        /*                          RoomRoutes                               */

        server.post('/rooms/:cinemaId', jsonBodyParser, (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { name, temperature } = req.body

                const { cinemaId } = req.params

                logic.createRoom(userId, cinemaId, name, temperature)
                    .then(() => res.status(201).send())
                    .catch(error => {
                        let status = 500

                        if (error instanceof MatchError)
                            status = 401

                        res.status(status).json({ error: error.constructor.name, message: error.message })
                    })

            } catch (error) {
                let status = 500

                if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
                    status = 400

                else if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
                    status = 401

                    error = new MatchError(error.message)

                }
                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        server.get('/rooms/:cinemaId', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { cinemaId } = req.params

                logic.retrieveRoomsFromCinema(userId, cinemaId)
                    .then(rooms => res.json(rooms))
                    .catch(error => {

                        let status = 500

                        if (error instanceof MatchError)
                            status = 404

                        res.status(status).json({ error: error.constructor.name, message: error.message })
                    })
            } catch (error) {
                let status = 500

                if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
                    status = 400
                else if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
                    status = 401

                    error = new MatchError(error.message)
                }
                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        server.get('/rooms/customer/:cinemaId', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { cinemaId } = req.params

                logic.retrieveRoomsFromCinemaCustomer(userId, cinemaId)
                    .then(rooms => res.json(rooms))
                    .catch(error => {

                        let status = 500

                        if (error instanceof MatchError)
                            status = 404

                        res.status(status).json({ error: error.constructor.name, message: error.message })
                    })
            } catch (error) {
                let status = 500

                if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
                    status = 400
                else if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
                    status = 401

                    error = new MatchError(error.message)
                }
                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        server.patch('/rooms/:cinemaId/:roomId', jsonBodyParser, (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { cinemaId, roomId } = req.params

                const { name, temperature } = req.body

                logic.updateRoom(userId, cinemaId, roomId, name, temperature)
                    .then(() => res.status(204).send())
                    .catch(error => {
                        let status = 500

                        if (error instanceof MatchError)
                            status = 401

                        res.status(status).json({ error: error.constructor.name, message: error.message })
                    })
            } catch (error) {
                let status = 500

                if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
                    status = 400
                else if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
                    status = 401

                    error = new MatchError(error.message)
                }
                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        server.delete('/rooms/:cinemaId/:roomId', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { cinemaId, roomId } = req.params

                logic.deleteRoom(userId, cinemaId, roomId)
                    .then(() => res.status(204).send())
                    .catch(error => {
                        let status = 500

                        if (error instanceof MatchError)
                            status = 401
                        res.status(status).json({ error: error.constructor.name, message: error.message })
                    })

            } catch (error) {
                let status = 500

                if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
                    status = 400

                else if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
                    status = 401

                    error = new MatchError(error.message)
                }
                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        /*                          IssueRoutes                               */

        server.post('/issues/:cinemaId/:roomId?', jsonBodyParser, (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { cinemaId, roomId } = req.params

                const { location, type, description } = req.body

                logic.createIssue(userId, cinemaId, location, type, description, roomId)
                    .then(() => res.status(201).send())
                    .catch(error => {
                        let status = 500

                        if (error instanceof MatchError)
                            status = 401

                        res.status(status).json({ error: error.constructor.name, message: error.message })
                    })

            } catch (error) {
                let status = 500

                if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
                    status = 400

                else if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
                    status = 401

                    error = new MatchError(error.message)
                }
                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        server.get('/issues/cinema', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                logic.retrieveCinemaIssues(userId)
                    .then(issues => res.json(issues))
                    .catch(error => {

                        let status = 500

                        if (error instanceof MatchError)
                            status = 404

                        res.status(status).json({ error: error.constructor.name, message: error.message })
                    })
            } catch (error) {
                let status = 500

                if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
                    status = 400
                else if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
                    status = 401

                    error = new MatchError(error.message)
                }
                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        server.get('/issues/user', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                logic.retrieveUserIssues(userId)
                    .then(issues => res.json(issues))
                    .catch(error => {

                        let status = 500

                        if (error instanceof MatchError)
                            status = 404

                        res.status(status).json({ error: error.constructor.name, message: error.message })
                    })
            } catch (error) {
                let status = 500

                if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
                    status = 400
                else if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
                    status = 401

                    error = new MatchError(error.message)
                }
                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        server.patch('/issues/:issueId', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { issueId } = req.params

                logic.closeIssue(userId, issueId)
                    .then(() => { res.status(200).send() })
                    .catch(error => {
                        let status = 500

                        if (error instanceof MatchError)
                            status = 401

                        res.status(status).json({ error: error.constructor.name, message: error.message })
                    })
            } catch (error) {
                let status = 500

                if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
                    status = 400
                else if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
                    status = 401

                    error = new MatchError(error.message)
                }
                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        server.delete('/issues/:issueId', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { issueId } = req.params

                logic.deleteIssue(userId, issueId)
                    .then(() => res.status(204).send())
                    .catch(error => {
                        let status = 500

                        if (error instanceof MatchError)
                            status = 401
                        res.status(status).json({ error: error.constructor.name, message: error.message })
                    })

            } catch (error) {
                let status = 500

                if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
                    status = 400

                else if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
                    status = 401

                    error = new MatchError(error.message)
                }
                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        server.listen(PORT, () => console.log(`API started on port ${PORT}`))
    })
    .catch(error => console.error(error))