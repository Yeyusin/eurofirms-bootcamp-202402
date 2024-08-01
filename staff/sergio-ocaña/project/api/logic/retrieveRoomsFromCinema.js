import { User, Cinema, Room } from '../data/index.js'

import { validate, errors } from 'com'

const { SystemError, MatchError } = errors

function retrieveRoomsFromCinema(userId, cinemaId) {
    validate.id(userId)
    validate.id(cinemaId, 'cinemaId')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new MatchError('User not found')

            if (!user.cinema) throw new MatchError('You need asign a cinema first, so you can edit it')

            return Cinema.findById(cinemaId)
                .catch(error => { throw new SystemError(error.message) })
                .then(cinema => {
                    if (!cinema) throw new MatchError('Cinema not found')

                    if (cinemaId !== user.cinema.toString()) throw new MatchError('You can only modify your own cinema')

                    return Room.find({ cinema: cinemaId }).select('-__v').sort({ name: 1 }).lean()
                        .catch(error => { throw new SystemError(error.message) })
                        .then(rooms => {
                            rooms.forEach(room => {
                                if (room._id) {
                                    room.id = room._id.toString()

                                    delete room._id
                                }
                                if (typeof room.cinema !== 'string')
                                    room.cinema = room.cinema.toString()
                            })

                            return rooms
                        })

                })
        })
}

export default retrieveRoomsFromCinema
