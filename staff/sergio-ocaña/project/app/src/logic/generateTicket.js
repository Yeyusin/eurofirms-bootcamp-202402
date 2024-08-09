import { errors } from 'com'

const { SystemError } = errors

function generateTicket() {
    return fetch(`${import.meta.env.VITE_API_URL}/tickets`, {
        method: 'POST',
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (res.status === 201) return res.json()

            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}
export default generateTicket