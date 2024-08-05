import { User, Cinema, Room, Issue } from '../data/index.js'

import { validate, errors } from 'com'

const { SystemError, MatchError } = errors

function callbackFunction(author, cinema, location, type, description, room) {
    const issue = {
        author,
        cinema,
        location,
        type,
        description,
        date: new Date
    }
    if (room) issue.room = room

    return Issue.create(issue)
        .catch(error => { throw new SystemError(error.message) })
        .then(issue => { })
}

function createIssue(userId, cinemaId, location, type, description, roomId) {
    validate.id(userId)
    validate.id(cinemaId, 'cinemaId')
    validate.text(location)
    validate.type(type)
    validate.text(description)

    if (roomId)
        validate.id(roomId, 'roomId')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new MatchError('User not found')

            if (user.role == ! 'customer') throw new MatchError('You need asign a cinema first, so you can edit it')

            return Cinema.findById(cinemaId)
                .catch(error => { throw new SystemError(error.message) })
                .then(cinema => {
                    if (!cinema) throw new MatchError('Cinema not found')

                    if (roomId) {
                        return Room.findById(roomId)
                            .catch(error => { throw new SystemError(error.message) })
                            .then(room => {
                                if (!room) throw new MatchError('Room not found')

                                if (room.cinema.toString() !== cinemaId) throw new MatchError('The Room doesn´t belong to the Cinema')

                                callbackFunction(userId, cinemaId, location, type, description, roomId)
                            })
                    }
                    else {
                        callbackFunction(userId, cinemaId, location, type, description, roomId)
                    }
                })
        })

} export default createIssue