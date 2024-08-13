import { Cinema, User, Room, Issue, Comment, Ticket } from '../data/index.js'
import { validate, errors } from 'com'

const { MatchError, SystemError } = errors


function deleteCinema(userId, cinemaId) {
    validate.id(userId)
    validate.id(cinemaId, 'cinemaId')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new MatchError('user not found')

            if (user.role !== 'manager') throw new MatchError('Only Managers are allowed to delete a cinema')

            return Cinema.findById(cinemaId)
                .catch(error => { throw new SystemError(error.message) })
                .then(cinema => {
                    if (!cinema) throw new MatchError('Cinema doesn´t exist')

                    return Issue.find({ cinema: cinemaId })
                        .catch(error => { throw SystemError(error.message) })
                        .then((issues) => {
                            const openIssue = issues.find(issue => issue.status === 'open')
                            if (openIssue) throw new MatchError('You can only delete a cinema without open issues')

                            const deleteIssuesIds = issues.map(issue => issue._id)

                            return Promise.all([
                                Cinema.findByIdAndDelete(cinemaId),
                                User.updateMany({ cinema: cinemaId }, { $unset: { cinema: '' } }),
                                Room.deleteMany({ cinema: cinemaId }),
                                Issue.deleteMany({ cinema: cinemaId }),
                                Comment.deleteMany({ issue: { $in: deleteIssuesIds } }),
                                Ticket.deleteMany({ cinema: cinemaId })
                            ])
                        })
                })
        })
}
export default deleteCinema