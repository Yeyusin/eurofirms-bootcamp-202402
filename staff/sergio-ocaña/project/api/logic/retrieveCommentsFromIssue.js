import { User, Issue, Comment } from '../data/index.js'

import { validate, errors } from 'com'

const { SystemError, MatchError } = errors

function retrieveCommentsFromIssue(userId, issueId) {
    validate.id(userId)
    validate.id(issueId, 'issueId')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new MatchError('User not found')

            return Issue.findById(issueId)
                .catch(error => { throw new SystemError(error.message) })
                .then(issue => {
                    if (!issue) throw new MatchError('Cinema not found')

                    if (issue.author.toString() !== userId && (user.role !== 'manager' || user.cinema.toString() !== issue.cinema.toString())) throw new MatchError('You only could only see issues that belongs you or if you´re manager of the cinema')

                    return Comment.find({ issue: issueId }).select('-__v').sort({ date: 1 }).lean()
                        .catch(error => { throw new SystemError(error.message) })
                        .then(comments => {
                            comments.forEach(comment => {
                                if (comment._id) {
                                    comment.id = comment._id.toString()

                                    delete comment._id
                                }
                                if (typeof comment.issue === 'object') comment.issue = comment.issue.toString()

                                if (typeof comment.author === 'object') comment.author = comment.author.toString()
                            })

                            return comments
                        })

                })
        })
}

export default retrieveCommentsFromIssue
