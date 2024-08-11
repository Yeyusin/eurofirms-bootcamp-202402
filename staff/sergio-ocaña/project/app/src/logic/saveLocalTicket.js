function saveLocalTicket(ticketId) {
    return new Promise((resolve, reject) => {
        sessionStorage.ticket = ticketId

        resolve()
    })
}
export default saveLocalTicket