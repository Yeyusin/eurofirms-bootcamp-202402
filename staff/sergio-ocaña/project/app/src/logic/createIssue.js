import { errors, validate } from 'com'

const { SystemError } = errors

function createIssue(cinemaId, location, type, description, roomId = null) {
    validate.token(sessionStorage.token, 'customer')
    validate.id(cinemaId, 'cinemaId')
    validate.text(location)
    validate.type(type)
    validate.text(description)

    let url = `${import.meta.env.VITE_API_URL}/issues/${cinemaId}`

    if (roomId) {
        validate.id(roomId, 'roomId')
        url += `/${roomId}`
    }

    return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${sessionStorage.token}` },
        body: JSON.stringify({ location, type, description })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (res.status === 201) return

            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default createIssue