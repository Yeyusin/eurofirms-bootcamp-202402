function logoutUser() {
    delete sessionStorage.token
    if (sessionStorage.cinema) delete sessionStorage.cinema
    if (sessionStorage.qr) delete sessionStorage.qr
}
export default logoutUser