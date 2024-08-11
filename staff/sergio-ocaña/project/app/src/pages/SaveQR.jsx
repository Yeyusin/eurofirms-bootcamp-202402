import { useParams } from "react-router-dom"
import logic from "../logic"

function SaveQR({ onSavedQR }) {
    const { cinemaId, location } = useParams()

    logic.saveLocalQR(cinemaId, location)
        .then(() => onSavedQR())
}
export default SaveQR