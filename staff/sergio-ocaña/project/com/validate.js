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

    if (id.length !== 24) throw new RangeError(`${explain}has not valid length`)
}

function validateText(text) {
    if (typeof text !== 'string') throw new TypeError('text is not a string')

    if (!text.length) throw new ContentError('text is empty')
}

function validateToken(token, explain = 'token') {
    if (typeof token !== 'string') throw new TypeError(`${explain} is not a string`)

    if (!token.length) throw new ContentError(`${explain} is empty`)

    const [, payload64,] = token.split('.')
    const payloadJSON = atob(payload64)
    const payload = JSON.parse(payloadJSON)

    const { exp } = payload

    const now = Date.now() / 1000

    if (exp < now) throw new MatchError(`${explain} expired`)

}

const validate = {
    name: validateName,
    birthdate: validateBirthdate,
    email: validateEmail,
    password: validatePassword,
    id: validateId,
    text: validateText,
    token: validateToken
}
export default validate