import { errors, validate } from 'com'

const { SystemError } = errors

function retrieveRoomsFromCinemaCustomer(cinemaId) {
    validate.token(sessionStorage.token, 'customer')
    validate.id(cinemaId, 'cinemaId')

    return fetch(`${import.meta.env.VITE_API_URL}/rooms/customer/${cinemaId}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${sessionStorage.token}` }
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (res.status === 200) return res.json()

            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default retrieveRoomsFromCinemaCustomer