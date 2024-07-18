import { Cinema, User } from '../data/index.js'
import { validate, errors } from 'com'

const { MatchError, SystemError } = errors


function retrieveCinema(userId, cinemaId) {
    validate.id(userId)
    validate.id(cinemaId, "CinemaId")

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new MatchError('user not found')

            return Cinema.findById(cinemaId).select('-__v').lean()
                .catch(error => { throw SystemError(error.message) })
                .then(cinema => {
                    if (!cinema) throw new MatchError('Cinema not found')

                    if (cinema._id) {
                        cinema.id = cinema._id.toString()

                        delete cinema._id
                    }
                    return cinema

                })
        })
}
export default retrieveCinema