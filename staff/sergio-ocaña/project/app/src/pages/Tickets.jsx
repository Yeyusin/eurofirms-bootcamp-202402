import { useEffect, useState } from 'react'
import logic from '../logic'
import Ticket from '../components/Ticket'
import { HTag, Form, Input, Button } from '../components'

import { errors } from 'com'
const { MatchError, SystemError, ContentError } = errors

function Tickets({ onCreateIssueClick }) {
    const [tickets, setTickets] = useState(null)
    const [refreshStamp, setRefreshStamp] = useState(null)
    const [ticket, setTicket] = useState(null)

    const errorHandler = error => {
        console.error(error)

        let feedback = error.message

        if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
            feedback = `${feedback}, please correct it`
        else if (error instanceof MatchError)
            feedback = `${feedback}, please verify it`
        else feedback = 'sorry, there was an error, please try again later'

        alert(feedback)
    }

    useEffect(() => {
        if (!logic.isManagerUserLoggedIn()) {
            try {
                logic.retrieveUserTickets()
                    .then(resTickets => setTickets(resTickets))
                    .catch(error => errorHandler(error))
            } catch (error) {
                errorHandler(error)
            }
        }
    }, [refreshStamp])

    const handleSubmited = () => {
        const promise = ticket.room.id === roomId ? logic.updateTicket(ticket.id, seat) : logic.updateTicket(ticket.id, seat, roomId)
        try {
            promise
                .then(() => setRefreshStamp(Date.now))
                .catch(error => errorHandler(error))
        } catch (error) {
            errorHandler(error)
        }
    }

    const handleDeleteTicket = () => {
        const deleteOrNot = confirm('Are you sure about to delete this ticket?')

        if (!deleteOrNot) return

        try {
            logic.deleteTicket(ticket.id)
                .then(() => setTicket(null))
                .catch(error => errorHandler(error))
        } catch (error) {
            errorHandler(error)
        }
    }

    const asignTicket = ticketId => {
        try {
            logic.retrieveTicketById(ticketId)
                .then(ticket => {
                    const asignOrNot = confirm(`Do you want to asign this ticket:\n Cinema${ticket.cinema.name} \n Room ${ticket.room.name} \n Seat ${ticket.seat}`)

                    if (!asignOrNot) {
                        logic.deleteLocalTicket()
                        return
                    }
                    try {
                        logic.asignTicket(ticketId)
                            .then(() => {
                                if (logic.isTicketAvaliableToAsign()) logic.deleteLocalTicket()
                                setRefreshStamp(Date.now())
                            })
                            .catch(error => errorHandler(error))
                    } catch (error) {
                        errorHandler(error)
                    }
                })
                .catch(error => errorHandler(error))
        } catch (error) {
            errorHandler(error)
        }
    }

    const onSubmit = event => {
        event.preventDefault()

        const form = event.target

        const ticketId = form.ticketId.value

        const promise = logic.isManagerUserLoggedIn() ? () => logic.retrieveTicketById(ticketId) : () => logic.asignTicket(ticketId)

        try {
            promise()
                .then(res => {
                    if (logic.isManagerUserLoggedIn()) setTicket(res)
                })
                .catch(error => errorHandler(error))
        } catch (error) {
            errorHandler(error)
        }
    }

    //verify is in sessionStorage a ticket and asign to user if accepted
    if (!logic.isManagerUserLoggedIn() && logic.isTicketAvaliableToAsign()) asignTicket(logic.getTicketToAsign())

    const placeholder = logic.isManagerUserLoggedIn() ? 'Search Ticket by Id' : 'Add Ticket by Id'
    const condition = logic.isManagerUserLoggedIn() ? !ticket || ticket?.length === 0 : !tickets || tickets?.length === 0
    return <main className='flex flex-col justify-center my-14 gap-4'>
        <HTag level={2}>Tickets</HTag>

        {condition && <p>No tickets to show</p>}
        {!logic.isManagerUserLoggedIn() && tickets && tickets?.map(mapTicket =>
            <Ticket key={mapTicket.id} ticket={mapTicket} onSubmited={handleSubmited} onCreateIssueClick={onCreateIssueClick} />)}
        {logic.isManagerUserLoggedIn() && ticket && <Ticket ticket={ticket} onDeleteTicketButton={handleDeleteTicket} />}
        <Form id='asignSearch' onSubmit={onSubmit}>
            <div className='bg-gray-100 fixed z-10' >
                <Input id='ticketId' placeholder={placeholder}></Input>
                <Button form='asignSearch' type='submit'> {logic.isManagerUserLoggedIn() ? '🔍' : '➕'}</Button>
            </div>
        </Form>
    </main>
}
export default Tickets