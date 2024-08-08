import { errors, validate } from 'com'

const { SystemError } = errors

function retrieveCommentsFromIssue(issueId) {
    validate.token(sessionStorage.token)
    validate.id(issueId, 'issueId')

    return fetch(`${import.meta.env.VITE_API_URL}/comments/${issueId}`, {
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

export default retrieveCommentsFromIssue