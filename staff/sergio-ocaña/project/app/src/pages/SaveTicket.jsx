import { useParams } from "react-router-dom"
import logic from "../logic"

function SaveTicket({ onSavedTicket }) {
    const { ticketId } = useParams()

    logic.saveLocalTicket(ticketId)
        .then(() => onSavedTicket())
}
export default SaveTicket