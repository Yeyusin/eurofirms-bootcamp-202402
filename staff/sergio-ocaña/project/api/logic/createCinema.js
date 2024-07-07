import { Cinema, User } from '../data/index.js'
import { validate, errors } from 'com'

const { MatchError, SystemError, DuplicityError } = errors


function createCinema(userId, name, address) {
    validate.id(userId)
    validate.name(name)
    validate.name(address)



    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new MatchError('user not found')

            if (user.role !== 'manager') throw new MatchError('Only Managers are allowed to create Cinemas')

            return Cinema.findOne({ $or: [{ name }, { address }] })
                .catch(error => { throw new SystemError(error.message) })
                .then(cinema => {
                    if (cinema) { throw new DuplicityError('cinema already exist') }

                    cinema = { name, address }

                    return Cinema.create(cinema)
                        .then(cinema => { })
                })
        })
}
export default createCinema