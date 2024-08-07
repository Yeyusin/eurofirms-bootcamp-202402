import { User, Comment } from '../data/index.js'

import { validate, errors } from 'com'

const { SystemError, MatchError } = errors

function deleteComment(userId, commentId, text) {
    validate.id(userId)
    validate.id(commentId, 'commentId')
    validate.text(text)


    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new MatchError('User not found')

            return Comment.findById(commentId).populate('issue', 'author cinema status')
                .catch(error => { throw new SystemError(error.message) })
                .then(comment => {
                    if (!comment) throw new MatchError('comment not found')

                    if (!comment.issue) throw new MatchError('issue not found')

                    const { issue } = comment

                    if (issue.status === 'closed') throw new MatchError('You can only edit comments from open Issues')

                    if (issue.author.toString() !== userId && (user.role !== 'manager' || user.cinema.toString() !== comment.issue.cinema.toString())) throw new MatchError('You only could edit comments in issues that is created by you or if you´re manager of the cinema')

                    if (comment.author.toString() !== userId) throw new MatchError('You can only edit your comments')

                    comment.text = text

                    return comment.save()
                        .catch(error => { throw new SystemError(error.message) })
                        .then(comment => { })

                })
        })
}
export default deleteComment