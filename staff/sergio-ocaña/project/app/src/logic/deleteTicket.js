import { errors, validate } from 'com'

const { SystemError } = errors

function deleteRoom(ticketId) {
    validate.token(sessionStorage.token)
    validate.id(ticketId, 'ticketId')

    return fetch(`${import.meta.env.VITE_API_URL}/tickets/${ticketId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${sessionStorage.token}` },
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
export default deleteRoom