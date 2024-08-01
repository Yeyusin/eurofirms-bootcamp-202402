import { Cinema, User } from '../data/index.js'
import { validate, errors } from 'com'

const { MatchError, SystemError } = errors


function retrieveCinemas(userId) {
    validate.id(userId)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new MatchError('user not found')

            return Cinema.find().sort({ name: 1 }).select('-__v').lean()
                .catch(error => { throw SystemError(error.message) })
                .then(cinemas => {
                    cinemas.forEach(cinema => {
                        if (cinema._id) {
                            cinema.id = cinema._id.toString()

                            delete cinema._id
                        }
                    })

                    return cinemas
                })
        })
}

export default retrieveCinemas