import { User, Ticket } from '../data/index.js'
import { validate, errors } from 'com'

const { SystemError, MatchError } = errors

function retrieveTicketById(userId, ticketId) {
    validate.id(userId)
    validate.id(ticketId, 'ticketId')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new MatchError('user not found')

            return Ticket.findById(ticketId).select('-__v').populate([{ path: 'cinema', select: 'name' }, { path: 'room', select: 'name' }, { path: 'user', select: 'name' }]).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(ticket => {
                    if (!ticket) throw new MatchError('ticket not found')

                    if (ticket._id) {
                        ticket.id = ticket._id.toString()

                        delete ticket._id
                    }

                    const { cinema, room } = ticket

                    if (cinema._id) {
                        cinema.id = cinema._id.toString()

                        delete cinema._id
                    }

                    if (room._id) {
                        room.id = room._id.toString()

                        delete room._id
                    }

                    if ('user' in ticket && user.role !== 'manager') delete ticket.user

                    if ('user' in ticket && ticket.user._id) {
                        const { user } = ticket

                        user.id = user._id.toString()

                        delete user._id
                    }

                    return ticket
                })
        })
}
export default retrieveTicketById