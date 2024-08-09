import { User, Ticket } from '../data/index.js'

import { errors, validate } from 'com'
const { SystemError, MatchError } = errors

function asignTicket(userId, ticketId) {
    validate.id(userId)
    validate.id(ticketId, 'ticketId')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new MatchError('user not found')

            if (user.role === 'manager') throw new MatchError('Only Customers could asign Tickets')

            return Ticket.findById(ticketId)
                .catch(error => { throw new SystemError(error.message) })
                .then(ticket => {
                    if (!ticket) throw new MatchError('ticket not found')

                    if (ticket.user) throw new MatchError('Only could asign tickets without owner')

                    ticket.user = userId

                    return ticket.save()
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => { })
                })
        })
} export default asignTicket