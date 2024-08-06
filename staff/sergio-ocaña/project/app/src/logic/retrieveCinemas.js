import { validate, errors } from 'com'

const { SystemError } = errors

function retrieveCinemas() {
    validate.token(sessionStorage.token)

    return fetch(`${import.meta.env.VITE_API_URL}/cinemas`, {
        method: 'GET',
        headers: { authorization: `Bearer ${sessionStorage.token}` },

    })
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (res.status === 200) {
                return res.json()
                    .catch(error => { throw new SystemError(error.message) })
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
export default retrieveCinemas