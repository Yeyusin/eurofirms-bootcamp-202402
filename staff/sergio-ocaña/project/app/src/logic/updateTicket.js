import { errors, validate } from 'com'

const { SystemError } = errors

function updateTicket(ticketId, seat, roomId) {
    validate.token(sessionStorage.token)
    validate.id(ticketId, 'ticketId')
    validate.seat(seat)

    let url = `${import.meta.env.VITE_API_URL}/tickets/update/${ticketId}`

    if (roomId) {
        validate.id(roomId, 'roomId')

        url += `/${roomId}`
    }

    return fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${sessionStorage.token}` },
        body: JSON.stringify({ seat })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (res.status === 204) return

            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default updateTicket