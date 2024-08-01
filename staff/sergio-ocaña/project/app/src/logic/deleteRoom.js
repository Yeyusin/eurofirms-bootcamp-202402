import { errors, validate } from 'com'

const { SystemError } = errors

function deleteRoom(cinemaId, roomId) {
    validate.token(sessionStorage.token)
    validate.id(cinemaId, 'cinemaId')
    validate.id(roomId, 'roomId')

    return fetch(`${import.meta.env.VITE_API_URL}/rooms/${cinemaId}/${roomId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${sessionStorage.token}` },
        body: JSON.stringify({ name, temperature })
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