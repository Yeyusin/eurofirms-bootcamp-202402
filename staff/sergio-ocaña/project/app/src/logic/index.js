import registerCustomer from './registerCustomer'
import registerManager from './registerManager'
import loginUser from './loginUser'
import isUserLoggedIn from './isUserLoggedIn'
import getLoggedInUserId from './getLoggedInUserId'
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
import retrieveRoomsFromCinemaCustomer from './retrieveRoomsFromCinemaCustomer'
import updateRoom from './updateRoom'
import deleteRoom from './deleteRoom'
import createIssue from './createIssue'
import retrieveUserIssues from './retrieveUserIssues'
import retrieveCinemaIssues from './retrieveCinemaIssues'
import closeIssue from './closeIssue'
import deleteIssue from './deleteIssue'
import createComment from './createComment'
import retrieveCommentsFromIssue from './retrieveCommentsFromIssue'
import retrieveComment from './retrieveComment'
import updateComment from './updateComment'
import deleteComment from './deleteComment'

const logic = {
    registerCustomer,
    registerManager,
    loginUser,
    retrieveUser,
    isUserLoggedIn,
    getLoggedInUserId,
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
    retrieveRoomsFromCinemaCustomer,
    updateRoom,
    deleteRoom,
    createIssue,
    retrieveUserIssues,
    retrieveCinemaIssues,
    closeIssue,
    deleteIssue,
    createComment,
    retrieveCommentsFromIssue,
    retrieveComment,
    updateComment,
    deleteComment
}

export default logic