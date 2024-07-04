import { Cinema, User } from '../data/index.js'

import { validate, errors } from 'com'

const { SystemError, MatchError } = errors

function addCinemaToManager(userId, cinemaId) {
    validate.id(userId)
    validate.id(cinemaId, 'cinemaId')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new MatchError('user not found')

            if (user.role !== 'manager') throw new MatchError('Only Managers are allowed could be assigned to a cinema')

            if (user.cinema) throw new MatchError('You already have a Cinema. If you want to change it, delete it first')

            return Cinema.findById(cinemaId)
                .catch(error => { throw new SystemError(error.message) })
                .then(cinema => {
                    if (!cinema) { throw new MatchError("cinema doesn't exist, you could create and try again") }

                    user.cinema = cinemaId

                    return user.save()
                })

        })
}
export default addCinemaToManager