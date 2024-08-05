import { User, Issue } from '../data/index.js'
import { validate, errors } from 'com'

const { MatchError, SystemError } = errors

function deleteIssue(userId, issueId) {
    validate.id(userId)
    validate.id(issueId, 'issueId')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new MatchError('user not found')

            return Issue.findById(issueId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(issue => {
                    if (!issue) throw new MatchError('issue not found')

                    if (user.role !== 'manager' && issue.author.toString() !== userId) throw new MatchError('You couldn´t have permission to delete this issue')

                    return Issue.findByIdAndDelete(issueId)
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => { })
                })
        })
}
export default deleteIssue