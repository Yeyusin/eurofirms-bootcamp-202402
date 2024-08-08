import { User, Issue, Comment } from '../data/index.js'

import { validate, errors } from 'com'

const { SystemError, MatchError } = errors

function retrieveComment(userId, issueId) {
    validate.id(userId)
    validate.id(issueId, 'issueId')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new MatchError('User not found')

            return Comment.findById(issueId).select('-__v').populate([{ path: 'issue', select: 'cinema' }, { path: 'author', select: 'name' }]).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(comment => {
                    if (!comment) throw new MatchError('Issue not found')

                    if (comment.author.toString() !== userId && (user.role !== 'manager' || user.cinema.toString() !== comment.issue.cinema.toString())) throw new MatchError('You only could only see issues that belongs you or if you´re manager of the cinema')

                    if (comment._id) {
                        comment.id = comment._id.toString()

                        delete comment._id
                    }

                    if (comment.author._id) {
                        comment.author.id = comment.author._id.toString()

                        delete comment.author._id
                    }

                    if (comment.issue) delete comment.issue

                    return comment
                })
        })
}

export default retrieveComment
