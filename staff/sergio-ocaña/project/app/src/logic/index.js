import registerCustomer from './registerCustomer'
import registerManager from './registerManager'
import loginUser from './loginUser'
import isUserLoggedIn from './isUserLoggedIn'
import logoutUser from './logoutUser'
import retrieveUser from './retrieveUser'
import IsManagerUserLoggedIn from './IsManagerUserLoggedIn'

const logic = {
    registerCustomer,
    registerManager,
    loginUser,
    retrieveUser,
    isUserLoggedIn,
    logoutUser,
    IsManagerUserLoggedIn,
}

export default logic