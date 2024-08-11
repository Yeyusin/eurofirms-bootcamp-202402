import { User, Cinema, Room } from '../data/index.js'

import { validate, errors } from 'com'

const { SystemError, MatchError } = errors

function retrieveRoomName(userId, roomId) {
    validate.id(userId)
    validate.id(roomId, 'roomId')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new MatchError('User not found')

            return Room.findById(roomId).select('name')
                .catch(error => { throw new SystemError(error.message) })
                .then(room => {
                    if (!room) throw new MatchError('Room not found')

                    const { name } = room

                    return name
                })
        })
}

export default retrieveRoomName
