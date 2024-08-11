function saveLocalTicket(cinemaId, location) {
    return new Promise((resolve, reject) => {
        sessionStorage.qr.cinemaId = cinemaId
        if (location.length === 24 && !location.includes(' '))
            sessionStorage.qr.roomId = location
        else sessionStorage.qr.location = location

        resolve()
    })
}
export default saveLocalTicket