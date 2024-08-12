import { useState } from "react"
import { Button, ButtonText, HTag } from "../components"
import QRCode from 'react-qr-code'
import logic from "../logic"
import { generateTicketRoute } from '../routes'
import logo from '../img/logo.png'

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

    return <main main className='flex flex-col bg-happy-bg bg-cover min-h-screen '>
        <footer className=''>
            <img src={logo} alt='Logo' />
        </footer>

        <article className='flex flex-col bg-[#e4b641] min-h-96 bg-opacity-80 rounded-3xl mx-4 justify-center gap-4 shadow-[#e4b641]-50 my-5'>
            {ticket ? <>
                <HTag >Your Ticket</HTag>
                <div className='flex flex-row justify-center gap-2 text-xl'>
                    <HTag level={3}>Cinema:</HTag>
                    <p>{ticket.cinema}</p>
                </div>
                <div className='flex flex-row justify-center gap-2 text-xl'>
                    <HTag level={3}>Room:</HTag>
                    <p>{ticket.room}</p>
                </div>
                <div className='flex flex-row justify-center gap-2 text-xl'>
                    <HTag level={3}>Seat:</HTag>
                    <p>{ticket.seat}</p>
                </div>
                <div className='flex flex-row justify-center gap-2 text-xl'>
                    <HTag level={3}>Id del ticket:</HTag>
                    <p>{ticket.id}</p>
                </div>
                <div className='flex flex-row justify-center'>
                    <QRCode value={`${import.meta.env.VITE_APP_URL}/${generateTicketRoute}/${ticket.id}`} />
                </div>
                <div className='flex flex-col justify-center'>
                    <p className='text-center'>Scan the code, copy the id or click the button</p>
                    <ButtonText onClick={() => redirectClick(ticket.id)}>Click to redirect</ButtonText>
                </div>

            </>
                : <>
                    <HTag> Generate your random Ticket</HTag>
                    <Button onClick={generateTicket}>Generate ticket</Button>
                </>}
        </article>

    </main>
}
export default GenerateTicket