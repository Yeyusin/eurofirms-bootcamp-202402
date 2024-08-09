import { Room, Ticket } from '../data/index.js'
import { errors } from 'com'

const { SystemError, MatchError } = errors

//It´s done with min value = 1
function randomNumberSeats(max) {
    return Math.floor(Math.random() * max) + 1
}

function generateTicket() {
    return Room.find().select('_id name cinema').populate('cinema', 'name').lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(rooms => {
            if (rooms.length === 0) throw new MatchError('Rooms not found, tickets is only generated with one cinema and one room atleast')

            rooms.forEach(room => {
                if (room._id) {
                    room.id = room._id.toString()

                    delete room._id
                }

                const { cinema } = room

                if (cinema._id) {
                    cinema.id = cinema._id.toString()

                    delete cinema._id
                }
            })

            //No adjustements needed and simplified operation

            const position = Math.floor(Math.random() * rooms.length)

            const roomSelected = rooms[position]

            const { cinema } = roomSelected

            const f = randomNumberSeats(15)

            const b = randomNumberSeats(33)

            const seat = `F${f}-B${b}`

            const ticket = { cinema: cinema.id, room: roomSelected.id, seat }

            return Ticket.create(ticket)
                .catch(error => { throw new SystemError(error.message) })
                .then(createdTicket => {
                    const id = createdTicket._id.toString()

                    return { id, cinema: cinema.name, room: roomSelected.name, seat }
                })
        })
}
export default generateTicket