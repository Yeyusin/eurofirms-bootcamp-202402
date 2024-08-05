import { User, Issue } from '../data/index.js'

import { validate, errors } from 'com'

const { SystemError, MatchError } = errors

function closeIssue(userId, issueId) {
    validate.id(userId)
    validate.id(issueId, 'issueId')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new MatchError('User not found')

            if (user.role !== 'manager') throw new MatchError('You don t have privileges to close Issues')

            if (!user.cinema) throw new MatchError('You need asign a cinema first, after it you can handle issues')

            return Issue.findById(issueId)
                .catch(error => { throw new SystemError(error.message) })
                .then(issue => {
                    if (!issue) throw new MatchError('Issue not found')

                    if (issue.status === 'closed') throw new MatchError('Issue already closed')

                    if (issue.cinema.toString() !== user.cinema.toString()) throw new MatchError('You could only close your cinema tickets')

                    issue.status = 'closed'

                    return issue.save()
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => { })
                })
        })
}
export default closeIssue