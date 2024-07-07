import { validate, errors } from 'com'

const { SystemError } = errors

function deleteCinemaToManager(cinemaId) {
    validate.token(sessionStorage.token, 'manager')
    validate.id(cinemaId, 'cinemaId')

    return fetch(`${import.meta.env.VITE_API_URL}/users/${cinemaId}/delete`, {
        method: 'PATCH',
        headers: { authorization: `Bearer ${sessionStorage.token}` },
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
export default deleteCinemaToManager