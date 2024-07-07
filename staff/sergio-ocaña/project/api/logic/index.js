import addCinemaToManager from './addCinemaToManager.js'
import createCinema from './createCinema.js'
import authenticateUser from './authenticateUser.js'
import registerCustomer from './registerCustomer.js'
import registerManager from './registerManager.js'
import retrieveUser from './retrieveUser.js'
import deleteCinema from './deleteCinema.js'
import deleteCinemaToManager from './deleteCinemaToManager.js'
import retrieveCinemas from './retrieveCinemas.js'

const logic = {
    authenticateUser,
    registerCustomer,
    registerManager,
    retrieveUser,
    addCinemaToManager,
    createCinema,
    deleteCinema,
    deleteCinemaToManager,
    retrieveCinemas,
}

export default logic 
