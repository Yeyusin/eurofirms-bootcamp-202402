import { User, Cinema } from '../data/index.js'
import { validate, errors } from 'com'

const { SystemError, DuplicityError } = errors

function registerManager(name, birthdate, email, cinema, password) {
    validate.name(name)
    validate.birthdate(birthdate)
    validate.email(email)
    validate.password(password)

    return User.findOne({ email })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (user) throw new DuplicityError

            return Cinema.findOne(address)
                .catch(error => { throw new SystemError(error.message) })
                .then(cinema => {
                    if (cinema) console.log(cinema)

                    else {
                        return Cinema.create({ address })
                            .catch(error => { throw new SystemError(error.message) })
                            .then(cinema => { console.log(cinema) })
                    }
                })
        })

}
export default registerManager