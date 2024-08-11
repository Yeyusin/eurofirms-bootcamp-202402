import errors from "./errors.js"

const { ContentError, MatchError } = errors

function validateName(name) {
    if (typeof name !== 'string') throw new TypeError('name is not a string')

    if (name.length < 1)
        throw new RangeError('name is lower than 1 character')
}

function validateBirthdate(birthdate) {
    if (typeof birthdate !== 'string') throw new TypeError('birthdate is not a string')

    if (birthdate.length !== 10)
        throw new RangeError('birthdate does not have 10 characters')

    if (birthdate.includes(' '))
        throw new ContentError('birthdate has a space character')

    if (birthdate.indexOf('-') !== 4 || birthdate.lastIndexOf('-') !== 7)
        throw new ContentError('birthdate dashes are not in correct position')

    // TODO birthdate is equal or greater than 14 years old

}

function validateEmail(email) {
    if (typeof email !== 'string') throw new TypeError('email is not a string')

    if (email.length < 6)
        throw new RangeError('email is lower than 6 characters')

    if (!email.includes('.'))
        throw new ContentError('email has no .')

    if (!email.includes('@'))
        throw new ContentError('email has no @')

    if (email.lastIndexOf('.') < email.indexOf('@'))
        throw new ContentError('email has . before @')

    if (email.lastIndexOf('.') - email.indexOf('@') < 2)
        throw new ContentError('email has . next to @')

    if (email.length - 1 - email.indexOf('.') < 2)
        throw new ContentError('email domain is lower than 2 characters')

    if (email.includes(' '))
        throw new ContentError('email has space character')
}

function validatePassword(password) {
    if (typeof password !== 'string') throw new TypeError('password is not a string')

    if (password.length < 8)
        throw new RangeError('password is lower than 8 characters')

    if (password.includes(' '))
        throw new ContentError('password has space character')

    if (!password.length) throw new ContentError('password is empty')
}

function validateId(id, explain = 'userId') {
    if (typeof id !== 'string') throw new TypeError(`${explain} is not a string`)

    if (id.includes(' ')) throw new ContentError(`${explain} has spaces`)

    if (!id.length) throw new ContentError(`${explain} is empty`)

    if (id.length !== 24) throw new RangeError(`${explain} has not valid length`)
}

function validateText(text, explain = 'text') {
    if (typeof text !== 'string') throw new TypeError(`${explain} is not a string`)

    if (!text.length) throw new ContentError(`${explain} is empty`)
}

function validateToken(token, explain = null) {
    if (typeof token !== 'string') throw new TypeError('token is not a string')

    if (!token.length) throw new ContentError('token is empty')

    const [, payload64,] = token.split('.')
    const payloadJSON = atob(payload64)
    const payload = JSON.parse(payloadJSON)

    const { exp, role } = payload

    const now = Date.now() / 1000

    if (exp < now) throw new MatchError('token expired')

    if (explain) {
        if (role !== explain) throw new MatchError(`wrong role only ${explain} could do`)
    }
}

function validateRole(role, explain = 'manager') {
    if (typeof role !== 'string') throw new TypeError('role is not a string')

    if (!role.length) throw new ContentError('role is empty')

    if (role !== explain) throw new MatchError(`You are not ${explain}`)
}

function validateTemperature(temperature, explain = 'temperature') {
    if (typeof temperature !== 'string') throw new TypeError(`${explain} is not a string`)

    const temp = Number(temperature)

    if (temperature > 55) throw new RangeError(`${explain} your room is not viable to show films, cold it first`)

    if (temperature < 0) throw new RangeError(`${explain} your room is not viable to show films, heater it first`)
}

function validateType(type) {
    if (typeof type !== 'string') throw new TypeError('type is not a string')

    if (!type.length) throw new ContentError('type is empty')

    if (type == !'temperature' || type == ! 'sound' || type == !'film' || type == !'cleaning') throw new ContentError('is not a viable type')

}

function validateStatus(status) {
    if (typeof status !== 'string') throw new TypeError('status is not a string')

    if (!status.length) throw new ContentError('status is empty')

    if (status == !'open' || status == ! 'close') throw new ContentError('is not a viable status')
}
function validateSeat(seat) {
    if (typeof seat !== 'string') throw new TypeError('seat is not a string')

    if (!seat.length) throw new ContentError('seat is empty')

    if (!seat[0] === 'F') throw new TypeError('seat have to start with "F"')

    if (!seat.includes('-B')) throw new TypeError('seat should have B in the seat')
}

const validate = {
    name: validateName,
    birthdate: validateBirthdate,
    email: validateEmail,
    password: validatePassword,
    id: validateId,
    text: validateText,
    token: validateToken,
    temperature: validateTemperature,
    role: validateRole,
    type: validateType,
    status: validateStatus,
    seat: validateSeat
}
export default validate