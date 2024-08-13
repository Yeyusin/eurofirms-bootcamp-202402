import { useParams } from "react-router-dom"
import logic from "../logic"

function SaveQR({ onSavedQR }) {
    const { cinemaId, location } = useParams()

    logic.saveLocalQR(cinemaId, location)
        .catch(error => console.error(error))
        .then(() => onSavedQR())
}
export default SaveQR