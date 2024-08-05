import { errors, validate } from 'com'

const { SystemError } = errors

function closeIssue(issueId) {
    validate.token(sessionStorage.token, 'manager')
    validate.id(issueId, 'issueId')

    return fetch(`${import.meta.env.VITE_API_URL}/issues/${issueId}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${sessionStorage.token}` },
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

export default closeIssue