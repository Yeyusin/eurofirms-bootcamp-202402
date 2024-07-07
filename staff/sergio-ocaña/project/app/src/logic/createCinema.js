import { validate, errors } from 'com'

const { SystemError } = errors

function createCinema(name, address) {
    validate.token(sessionStorage.token)
    validate.name(name)
    validate.name(address)

    return fetch(`${import.meta.env.VITE_API_URL}/cinema`, {
        method: 'POST',
        headers: { 'Content/type': 'application/json', authorization: `Bearer ${sessionStorage.token}` },
        body: JSON.stringify({ name, address })
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
export default createCinema