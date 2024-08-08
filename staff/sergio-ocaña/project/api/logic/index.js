import addCinemaToManager from './addCinemaToManager.js'
import createCinema from './createCinema.js'
import authenticateUser from './authenticateUser.js'
import registerCustomer from './registerCustomer.js'
import registerManager from './registerManager.js'
import retrieveUser from './retrieveUser.js'
import deleteCinema from './deleteCinema.js'
import deleteCinemaToManager from './deleteCinemaToManager.js'
import retrieveCinemas from './retrieveCinemas.js'
import retrieveCinema from './retrieveCinema.js'
import createRoom from './createRoom.js'
import updateRoom from './updateRoom.js'
import deleteRoom from './deleteRoom.js'
import retrieveRoomsFromCinema from './retrieveRoomsFromCinema.js'
import createIssue from './createIssue.js'
import retrieveCinemaIssues from './retrieveCinemaIssues.js'
import retrieveUserIssues from './retrieveUserIssues.js'
import deleteIssue from './deleteIssue.js'
import closeIssue from './closeIssue.js'
import retrieveRoomsFromCinemaCustomer from './retrieveRoomsFromCinemaCustomer.js'
import createComment from './createComment.js'
import retrieveCommentsFromIssue from './retrieveCommentsFromIssue.js'
import retrieveComment from './retrieveComment.js'
import updateComment from './updateComment.js'
import deleteComment from './deleteComment.js'

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
    retrieveCinema,
    createRoom,
    updateRoom,
    deleteRoom,
    retrieveRoomsFromCinema,
    retrieveRoomsFromCinemaCustomer,
    createIssue,
    retrieveCinemaIssues,
    retrieveUserIssues,
    closeIssue,
    deleteIssue,
    createComment,
    retrieveCommentsFromIssue,
    retrieveComment,
    updateComment,
    deleteComment,
}

export default logic 
