function getQRInfo() {
    const qr = JSON.parse(sessionStorage.qr)
    return qr
}
export default getQRInfo