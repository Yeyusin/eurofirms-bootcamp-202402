import { utils, validate } from "com"

function IsManagerUserLoggedIn() {
    validate.token(sessionStorage.token)

    const { role } = utils.extractPayload(sessionStorage.token)

    return role === 'manager'
}
export default IsManagerUserLoggedIn