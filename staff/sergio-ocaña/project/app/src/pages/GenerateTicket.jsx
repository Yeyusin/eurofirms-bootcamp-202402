import { useState } from "react"
import { Button, HTag } from "../components"
import QRCode from 'react-qr-code'
import logic from "../logic"

function GenerateTicket({ redirectClick }) {
    const [ticket, setTicket] = useState(null)

    const generateTicket = () => {
        try {
            logic.generateTicket()
                .then(resTicket => setTicket(resTicket))
                .catch(error => errorHandler(error))
        } catch (error) {
            errorHandler(error)
        }
    }

    return <>
        <footer className='justify-start'>
            <img />
        </footer>

        <main className='flex flex-col justify-center'>
            {ticket ? <>
                <HTag level={2}>Your Ticket</HTag>
                <div className='flex flex-row justify-center'>
                    <HTag level={3}>Cinema:</HTag>
                    <p>{ticket.cinema}</p>
                </div>
                <div className='flex flex-row justify-center'>
                    <HTag level={3}>Room:</HTag>
                    <p>{ticket.room}</p>
                </div>
                <div className='flex flex-row justify-center'>
                    <HTag level={3}>Seat:</HTag>
                    <p>{ticket.seat}</p>
                </div>
                <div className='flex flex-row justify-center'>
                    <HTag level={3}>Id del ticket:</HTag>
                    <p>{ticket.id}</p>
                </div>

                <QRCode value={ticket.id} />
                <p>Scan the code, copy the id or click the button</p>
                <Button onClick={() => redirectClick(ticket.id)}>Click to redirect</Button>

            </>
                : <>
                    <HTag> Generate your random Ticket</HTag>
                    <Button onClick={generateTicket}>Generate ticket</Button>
                </>}

        </main >
    </>
}
export default GenerateTicket