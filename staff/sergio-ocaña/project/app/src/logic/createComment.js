import { errors, validate } from 'com'

const { SystemError } = errors

function createComment(issueId, text) {
    validate.token(sessionStorage.token)
    validate.id(issueId, 'issueId')
    validate.text(text)

    return fetch(`${import.meta.env.VITE_API_URL}/comments/${issueId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${sessionStorage.token}` },
        body: JSON.stringify({ text })
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

export default createComment