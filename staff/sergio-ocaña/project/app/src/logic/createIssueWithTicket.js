import { errors, validate } from 'com'

const { SystemError } = errors

function createIssueWithTicket(ticketId, type, description) {
    validate.token(sessionStorage.token, 'customer')
    validate.id(ticketId, 'ticketId')
    validate.type(type)
    validate.text(description, 'description')

    return fetch(`${import.meta.env.VITE_API_URL}/issue/ticket/${ticketId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${sessionStorage.token}` },
        body: JSON.stringify({ type, description })
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

export default createIssueWithTicket