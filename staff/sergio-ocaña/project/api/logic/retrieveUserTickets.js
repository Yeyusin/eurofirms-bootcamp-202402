import { User, Ticket } from '../data/index.js'
import { validate, errors } from 'com'

const { SystemError, MatchError } = errors

function retrieveUserTicket(userId) {
    validate.id(userId)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new MatchError('user not found')

            if (user.role === 'manager') throw new MatchError('manager doesn`t have tickets')

            return Ticket.find({ user: userId }).select('-__v -user').populate([{ path: 'cinema', select: 'name' }, { path: 'room', select: 'name' }]).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(tickets => {
                    tickets.forEach(ticket => {
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
                    })

                    return tickets
                })
        })
}
export default retrieveUserTicket