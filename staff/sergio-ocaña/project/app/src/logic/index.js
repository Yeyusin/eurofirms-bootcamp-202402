import registerCustomer from './registerCustomer'
import registerManager from './registerManager'
import loginUser from './loginUser'
import isUserLoggedIn from './isUserLoggedIn'
import logoutUser from './logoutUser'
import retrieveUser from './retrieveUser'
import IsManagerUserLoggedIn from './IsManagerUserLoggedIn'
import retrieveCinema from './retrieveCinema'
import retrieveCinemas from './retrieveCinemas'
import addCinemaToManager from './addCinemaToManager'
import deleteCinemaToManager from './deleteCinemaToManager'
import deleteCinema from './deleteCinema'
import createCinema from './createCinema'
import createRoom from './createRoom'
import retrieveRoomsFromCinema from './retrieveRoomsFromCinema'
import updateRoom from './updateRoom'
import deleteRoom from './deleteRoom'


const logic = {
    registerCustomer,
    registerManager,
    loginUser,
    retrieveUser,
    isUserLoggedIn,
    logoutUser,
    IsManagerUserLoggedIn,
    retrieveCinema,
    retrieveCinemas,
    createCinema,
    addCinemaToManager,
    deleteCinemaToManager,
    deleteCinema,
    createRoom,
    retrieveRoomsFromCinema,
    updateRoom,
    deleteRoom
}

export default logic