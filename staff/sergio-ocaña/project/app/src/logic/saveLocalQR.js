function saveLocalTicket(cinemaId, location) {
    return new Promise((resolve, reject) => {
        const qr = {}
        qr.cinemaId = cinemaId
        if (location.length === 24 && !location.includes(' '))
            qr.roomId = location
        else qr.location = location

        sessionStorage.qr = JSON.stringify(qr)

        resolve()
    })
}
export default saveLocalTicket