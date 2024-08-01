import { Cinema, User, Room } from '../data/index.js'
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

                    return Cinema.findByIdAndDelete(cinemaId)
                        .catch(error => { throw SystemError(error.message) })
                        .then(() => {
                            return User.updateMany({ cinema: cinemaId }, { $unset: { cinema } })
                                .catch(error => { throw SystemError(error.message) })
                        })
                        .then(() => {
                            return Room.deleteMany({ cinema: cinemaId })
                                .catch(error => { throw SystemError(error.message) })
                                .then(() => { })
                        })
                })
        })
}

export default deleteCinema