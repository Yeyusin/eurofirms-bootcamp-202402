import { User, Ticket } from '../data/index.js'

import { errors, validate } from 'com'
const { SystemError, MatchError } = errors

function deleteTicket(userId, ticketId) {
    validate.id(userId)
    validate.id(ticketId, 'ticketId')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new MatchError('user not found')

            if (user.role !== 'manager') throw new MatchError('Only manager could delete Tickets')

            return Ticket.findById(ticketId)
                .catch(error => { throw new SystemError(error.message) })
                .then(ticket => {
                    if (!ticket) throw new MatchError('ticket not found')

                    if (ticket.cinema.toString() !== user.cinema.toString()) throw new MatchError('you could only delete tickets of your cinema')

                    return Ticket.findByIdAndDelete(ticketId)
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => { })
                })
        })
}
export default deleteTicket