import registerCustomer from './registerCustomer'
import registerManager from './registerManager'
import loginUser from './loginUser'
import isUserLoggedIn from './isUserLoggedIn'
import logoutUser from './logoutUser'
import retrieveUser from './retrieveUser'
import IsManagerUserLoggedIn from './IsManagerUserLoggedIn'
import retrieveCinemas from './retrieveCinemas'
import addCinemaToManager from './addCinemaToManager'
import deleteCinemaToManager from './deleteCinemaToManager'
import deleteCinema from './deleteCinema'
import createCinema from './createCinema'

const logic = {
    registerCustomer,
    registerManager,
    loginUser,
    retrieveUser,
    isUserLoggedIn,
    logoutUser,
    IsManagerUserLoggedIn,
    retrieveCinemas,
    createCinema,
    addCinemaToManager,
    deleteCinemaToManager,
    deleteCinema,
}

export default logic