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

            return Issue.findById(issueId).select('-__v').lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(issue => {
                    if (!issue) throw new MatchError('Issue not found')

                    if (issue.author.toString() !== userId && (user.role !== 'manager' || user.cinema.toString() !== issue.cinema.toString())) throw new MatchError('You only could only see issues that belongs you or if you´re manager of the cinema')

                    if (issue._id) {
                        issue.id = issue._id.toString()


                        delete issue._id
                    }

                    if (typeof issue.author === 'object') issue.author = issue.author.toString()

                    if (typeof issue.cinema === 'object') issue.cinema = issue.cinema.toString()

                    if ('room' in issue && typeof issue.room === 'object') issue.room = issue.room.toString()

                    return Comment.find({ issue: issueId }).select('-__v').populate('author', 'name').sort({ date: 1 }).lean()
                        .catch(error => { throw new SystemError(error.message) })
                        .then(comments => {
                            comments.forEach(comment => {
                                if (comment._id) {
                                    comment.id = comment._id.toString()

                                    delete comment._id
                                }

                                if (comment.author._id) {
                                    comment.author.id = comment.author._id.toString()

                                    delete comment.author._id
                                }

                                if (comment.issue) delete comment.issue
                            })

                            return { comments, issue }
                        })

                })
        })
}

export default retrieveCommentsFromIssue
