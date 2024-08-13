import { useParams } from "react-router-dom"
import logic from "../logic"

function SaveQR({ onSavedQR }) {
    const { cinemaId, location } = useParams()
    try {

        logic.saveLocalQR(cinemaId, location)
            .then(() => onSavedQR())
            .catch(error => {
                console.error(error)
                alert(error.message)
            })

    } catch (error) {
        console.error(error)

        alert(error.message)
    }
}
export default SaveQR