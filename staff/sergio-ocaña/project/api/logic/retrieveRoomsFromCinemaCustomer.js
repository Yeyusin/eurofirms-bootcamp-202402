import { User, Cinema, Room } from '../data/index.js'

import { validate, errors } from 'com'

const { SystemError, MatchError } = errors

function retrieveRoomsFromCinemaCustomer(userId, cinemaId) {
    validate.id(userId)
    validate.id(cinemaId, 'cinemaId')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new MatchError('User not found')

            return Cinema.findById(cinemaId)
                .catch(error => { throw new SystemError(error.message) })
                .then(cinema => {
                    if (!cinema) throw new MatchError('Cinema not found')

                    return Room.find({ cinema: cinemaId }).select('-__v -temperature').sort({ name: 1 }).lean()
                        .catch(error => { throw new SystemError(error.message) })
                        .then(rooms => {
                            rooms.forEach(room => {
                                if (room._id) {
                                    room.id = room._id.toString()

                                    delete room._id
                                }
                                if (typeof room.cinema === 'object')
                                    room.cinema = room.cinema.toString()
                            })

                            return rooms
                        })

                })
        })
}

export default retrieveRoomsFromCinemaCustomer
