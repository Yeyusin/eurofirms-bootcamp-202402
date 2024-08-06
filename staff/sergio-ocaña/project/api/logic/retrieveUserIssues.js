import { User, Issue } from '../data/index.js'
import { validate, errors } from 'com'

const { MatchError, SystemError } = errors


function retrieveUserIssues(userId) {
    validate.id(userId)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new MatchError('user not found')

            if (user.role !== 'customer') throw new MatchError('only customers could search his issues')

            return Issue.find({ author: userId }).sort({ date: -1 }).populate('cinema', 'name').select('-__v -author').lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(issues => {
                    issues.forEach(issue => {
                        if (issue._id) {
                            issue.id = issue._id.toString()

                            delete issue._id
                        }

                        if (issue.cinema._id) {
                            issue.cinema.id = issue.cinema._id.toString()

                            delete issue.cinema._id
                        }

                        if ('room' in issue) if (typeof issue.room === 'object') issue.room = issue.room.toString()
                    })

                    return issues
                })
        })
}
export default retrieveUserIssues