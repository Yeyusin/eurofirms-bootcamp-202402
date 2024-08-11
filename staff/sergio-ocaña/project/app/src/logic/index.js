import isTicketAvaliableToAsign from './isTicketAvaliableToAsign.js'
import isManagerUserLoggedIn from './isManagerUserLoggedIn.js'
import isUserAssignedCinema from './isUserAssignedCinema.js'
import isUserLoggedIn from './isUserLoggedIn'
import isQRAvaliable from './isQRAvaliable.js'
import getLoggedInUserId from './getLoggedInUserId'
import getTicketToAsign from './getTicketToAsign.js'
import getQRInfo from './getQRInfo.js'
import saveLocalTicket from './saveLocalTicket.js'
import deleteLocalTicket from './deleteLocalTicket.js'
import deleteLocalQR from './deleteLocalQR.js'
import logoutUser from './logoutUser'
import registerCustomer from './registerCustomer'
import registerManager from './registerManager'
import loginUser from './loginUser'
import retrieveUser from './retrieveUser'
import retrieveCinema from './retrieveCinema'
import retrieveCinemas from './retrieveCinemas'
import addCinemaToManager from './addCinemaToManager'
import deleteCinemaToManager from './deleteCinemaToManager'
import deleteCinema from './deleteCinema'
import createCinema from './createCinema'
import createRoom from './createRoom'
import retrieveRoomName from './retrieveRoomName.js'
import retrieveRoomsFromCinema from './retrieveRoomsFromCinema'
import retrieveRoomsFromCinemaCustomer from './retrieveRoomsFromCinemaCustomer'
import updateRoom from './updateRoom'
import deleteRoom from './deleteRoom'
import generateTicket from './generateTicket.js'
import asignTicket from './asignTicket.js'
import retrieveTicketById from './retrieveTicketById.js'
import retrieveUserTickets from './retrieveUserTickets.js'
import updateTicket from './updateTicket.js'
import deleteTicket from './deleteTicket.js'
import createIssue from './createIssue'
import createIssueWithTicket from './createIssueWithTicket.js'
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
    isTicketAvaliableToAsign,
    isManagerUserLoggedIn,
    isUserAssignedCinema,
    isUserLoggedIn,
    isQRAvaliable,
    getLoggedInUserId,
    getTicketToAsign,
    getQRInfo,
    saveLocalTicket,
    deleteLocalTicket,
    deleteLocalQR,
    logoutUser,
    registerCustomer,
    registerManager,
    loginUser,
    retrieveUser,
    retrieveCinema,
    retrieveCinemas,
    createCinema,
    addCinemaToManager,
    deleteCinemaToManager,
    deleteCinema,
    createRoom,
    retrieveRoomName,
    retrieveRoomsFromCinema,
    retrieveRoomsFromCinemaCustomer,
    updateRoom,
    deleteRoom,
    generateTicket,
    asignTicket,
    retrieveTicketById,
    retrieveUserTickets,
    updateTicket,
    deleteTicket,
    createIssue,
    createIssueWithTicket,
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