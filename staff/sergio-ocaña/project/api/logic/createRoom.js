import { User, Cinema, Room } from '../data/index.js'

import { validate, errors } from 'com'

const { SystemError, MatchError, DuplicityError } = errors

function createRoom(userId, cinemaId, name, temperature) {
    validate.id(userId)
    validate.id(cinemaId, 'cinemaId')
    validate.name(name)
    validate.temperature(temperature)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new MatchError('User not found')

            if (!user.cinema) throw new MatchError('You need asign a cinema first, so you can edit it')

            if (user.role !== 'manager') throw new MatchError('You don t have privileges to create a Room')

            return Cinema.findById(cinemaId)
                .catch(error => { throw new SystemError(error.message) })
                .then(cinema => {
                    if (!cinema) throw new MatchError('Cinema not found')

                    if (cinemaId !== user.cinema.toString()) throw new MatchError('You can only modify your own cinema')

                    return Room.findOne({ $and: [{ name }, { cinema: cinemaId }] })
                        .catch(error => { throw new SystemError(error.message) })
                        .then(room => {
                            if (room) throw new DuplicityError('You have another room with the same name')

                            const newRoom = { name, temperature, cinema: cinemaId }

                            return Room.create(newRoom)
                                .catch(error => { throw new SystemError(error.message) })
                                .then(room => { })
                        })

                })
        })
}
export default createRoom