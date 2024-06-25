import { User } from '../data/index.js'
import { validate, errors } from 'com'

const { SystemError, DuplicityError } = errors

function registerManager(name, birthdate, email, password) {
    validate.name(name)
    validate.birthdate(birthdate)
    validate.email(email)
    validate.password(password)

    return User.findOne({ email })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (user) throw new DuplicityError

            user = { name, birthdate, email, password, role: manager }

            return User.create(user)
                .catch(error => { throw new SystemError(error.message) })
                .then(user => { })

        })
}

export default registerManager