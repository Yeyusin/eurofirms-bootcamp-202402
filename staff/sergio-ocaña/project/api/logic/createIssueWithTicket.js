import { User, Ticket, Issue } from '../data/index.js'

import { validate, errors } from 'com'

const { SystemError, MatchError } = errors

function createIssueWithTicket(userId, ticketId, type, description) {
    validate.id(userId)
    validate.id(ticketId, 'ticketId')
    validate.type(type)
    validate.text(description)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new MatchError('User not found')

            if (user.role !== 'customer') throw new MatchError('Only customers could create issues')

            return Ticket.findById(ticketId).select('-__v').populate([{ path: 'cinema', select: 'name' }, { path: 'room', select: 'name' }])
                .catch(error => { throw new SystemError(error.message) })
                .then(ticket => {
                    if (!ticket) throw new MatchError('Ticket not found')

                    if (!ticket.user) throw new MatchError('Only tickets asigned could be used to create a issue')

                    if (userId !== ticket.user?.toString()) throw new MatchError('Only tickets that belongs to you could use to create a issue')

                    const { cinema, room } = ticket

                    if (!cinema) throw new MatchError('Cinema not found')

                    if (!room) throw new MatchError('Room not found')

                    const issue = {
                        author: userId,
                        cinema: cinema._id.toString(),
                        room: room._id.toString(),
                        location: room.name,
                        type,
                        description,
                        ticket: ticketId,
                        date: new Date
                    }

                    return Issue.create(issue)
                        .catch(error => { throw new SystemError(error.message) })
                        .then(issue => { })
                })
        })

} export default createIssueWithTicket