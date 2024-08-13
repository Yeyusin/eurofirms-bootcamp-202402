import { User, Cinema, Room, Ticket } from '../data/index.js'

import { validate, errors } from 'com'

const { SystemError, MatchError } = errors

function deleteRoom(userId, cinemaId, roomId) {
    validate.id(userId)
    validate.id(cinemaId, 'cinemaId')
    validate.id(roomId, 'roomId')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new MatchError('User not found')

            if (!user.cinema) throw new MatchError('You need asign a cinema first, after that you could edit it')

            if (user.role !== 'manager') throw new MatchError('You don t have privileges')

            return Cinema.findById(cinemaId)
                .catch(error => { throw new SystemError(error.message) })
                .then(cinema => {
                    if (!cinema) throw new MatchError('Cinema not found')

                    if (cinemaId !== user.cinema.toString()) throw new MatchError('You can only modify your own cinema')

                    return Room.findById(roomId)
                        .catch(error => { throw new SystemError(error.message) })
                        .then(room => {
                            if (!room) throw new MatchError('Room not found')

                            if (room.cinema.toString() !== cinemaId) throw new MatchError('You can only delete rooms from your own cinema')

                            return Room.findByIdAndDelete(roomId)
                                .catch(error => { throw new SystemError(error.message) })
                                .then(() => {
                                    return Ticket.deleteMany({ room: roomId })
                                        .then(() => { })
                                        .catch(error => { throw new SystemError(error.message) })
                                })
                        })

                })
        })
}
export default deleteRoom