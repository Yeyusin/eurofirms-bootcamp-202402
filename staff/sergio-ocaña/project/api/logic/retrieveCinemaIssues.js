import { User, Issue, Cinema } from '../data/index.js'
import { validate, errors } from 'com'

const { MatchError, SystemError } = errors

function retrieveCinemaIssues(userId) {
    validate.id(userId)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new MatchError('user not found')

            if (user.role !== 'manager') throw new MatchError('only manager could search by cinema')

            const cinemaId = user.cinema.toString()

            return Cinema.findById(cinemaId)
                .catch(error => { throw new SystemError(error.message) })
                .then(cinema => {
                    if (!cinema) throw new MatchError('Cinema not found')

                    return Issue.find({ cinema: cinemaId }).populate([{ path: 'author', select: 'name' }, { path: 'cinema', select: 'name' }]).sort({ date: -1 }).select('-__v ').lean()
                        .catch(error => { throw new SystemError(error.message) })
                        .then(issues => {
                            issues.forEach(issue => {
                                if (issue._id) {
                                    issue.id = issue._id.toString()

                                    delete issue._id
                                }

                                if (issue.author._id) {
                                    issue.author.id = issue.author._id.toString()

                                    delete issue.author._id
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
        })
}
export default retrieveCinemaIssues