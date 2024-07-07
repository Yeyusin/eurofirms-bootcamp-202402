import { Cinema, User } from '../data/index.js'

import { validate, errors } from 'com'

const { SystemError, MatchError } = errors

function deleteCinemaToManager(userId, cinemaId, role) {
    validate.id(userId)
    validate.id(cinemaId, 'cinemaId')
    validate.role(role)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new MatchError('User not found')

            if (!user.cinema) throw new MatchError('You don´t have any cinema to delete')

            return Cinema.findById(cinemaId)
                .catch(error => { throw new SystemError(error.message) })
                .then(cinema => {
                    if (!cinema) throw new MatchError('Cinema not found')

                    if (cinemaId !== user.cinema.toString()) throw new MatchError('You can only modify your cinema')

                    return User.findByIdAndUpdate(userId, { $unset: { cinema } })

                })
        })
}
export default deleteCinemaToManager