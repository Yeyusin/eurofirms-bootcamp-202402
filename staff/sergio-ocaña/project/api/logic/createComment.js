import { User, Issue, Comment } from '../data/index.js'

import { validate, errors } from 'com'

const { SystemError, MatchError } = errors

function createComment(userId, issueId, text) {
    validate.id(userId)
    validate.id(issueId, 'issueId')
    validate.text(text)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new MatchError('User not found')

            return Issue.findById(issueId)
                .catch(error => { throw new SystemError(error.message) })
                .then(issue => {
                    if (!issue) throw new MatchError('Issue not found')

                    if (issue.status === 'closed') throw new MatchError('You can only comments on open issues')

                    if (issue.author.toString() !== userId && (user.role !== 'manager' || user.cinema.toString() !== issue.cinema.toString())) throw new MatchError('You only could comment issues that is not created by you if you´re manager of the cinema')

                    const newComment = { author: userId, issue: issueId, text, date: new Date() }

                    return Comment.create(newComment)
                        .catch(error => { throw new SystemError(error.message) })
                        .then(comment => { })
                })
        })
}
export default createComment