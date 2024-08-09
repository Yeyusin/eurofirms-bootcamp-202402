import { User, Ticket, Room } from '../data/index.js'

import { errors, validate } from 'com'
const { SystemError, MatchError } = errors

function updateTicket(userId, ticketId, roomId, seat) {
    validate.id(userId)
    validate.id(ticketId, 'ticketId')
    if (roomId) validate.id(roomId, 'roomId')
    validate.seat(seat)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new MatchError('user not found')

            if (user.role !== 'manager') throw new MatchError('Only Managers could edit Tickets')

            return Ticket.findById(ticketId)
                .catch(error => { throw new SystemError(error.message) })
                .then(ticket => {
                    if (!ticket) throw new MatchError('ticket not found')

                    if (ticket.cinema.toString() == !user.cinema.toString()) throw new MatchError('You could only asign rooms in the same cinema')

                    if (ticket.seat == !seat) ticket.seat = seat

                    if (roomId && ticket.room.toString() !== roomId) {

                        return Room.findById(roomId)
                            .catch(error => { throw new SystemError(error.message) })
                            .then(room => {
                                if (!room) throw new MatchError('room not found')

                                if (room.cinema.toString() !== ticket.cinema.toString()) throw new MatchError('You could only asign rooms in the cinema')

                                ticket.room = roomId
                            })
                    }
                    return ticket.save()
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => { })
                })
        })
}
export default updateTicket