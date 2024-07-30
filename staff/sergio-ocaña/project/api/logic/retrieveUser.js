import { validate, errors } from 'com'
import { User } from '../data/index.js'

const { SystemError, MatchError } = errors

function retrieveUser(userId, targetUserId) {
    validate.id(userId)
    validate.id(targetUserId, 'targetUserId')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new MatchError('user not found')

            return User.findById(targetUserId).select('-_id name role cinema').lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(targetUser => {
                    if (!targetUser) throw new MatchError('targetUser not found')

                    return targetUser
                })
        })
}
export default retrieveUser