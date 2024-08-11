import { errors, validate, utils } from 'com'

const { SystemError } = errors

function retrieveUser() {
    validate.token(sessionStorage.token)

    const { sub: userId } = utils.extractPayload(sessionStorage.token)

    validate.id(userId)

    return fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${sessionStorage.token}` }
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (res.status === 200) {
                return res.json()
                    .catch(error => { throw new SystemError(error.message) })
                    .then(user => {
                        if ('cinema' in user) sessionStorage.cinema = true
                        return user
                    })

            }

            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default retrieveUser