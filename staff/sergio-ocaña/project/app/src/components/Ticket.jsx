import { useState } from 'react'
import logic from '../logic'
import { Button, Form, HTag, Input } from './index'
import { roomValue, seatValue } from './magicValues'

function Ticket({ ticket, onDeleteTicketButton, onSubmited, onCreateIssueClick }) {
    const [whereIsEditing, setWhereIsEditing] = useState(null)
    const [roomId, setRoomId] = useState(ticket.room.id)
    const [rooms, setRooms] = useState(null)
    const conditionButtons = logic.isManagerUserLoggedIn() && !!whereIsEditing

    const onEditTicketButton = value => {
        if (value === roomValue) {
            try {
                logic.retrieveRoomsFromCinema(ticket.cinema.id)
                    .then(res => {
                        setRooms(res)
                        setWhereIsEditing(roomValue)
                    })
                    .catch(error => errorHandler(error))
            } catch (error) {
                errorHandler(error)
            }
        }
    }

    const onCancelClick = () => setWhereIsEditing(null)

    const onSubmit = event => {
        event.preventDefault()

        const form = event.target

        if (whereIsEditing === roomValue) {
            const roomIdValue = form.room.value

            setRoomId(roomIdValue)
            setWhereIsEditing(seatValue)
        }
        else {
            const seat = form.seat.value

            onSubmited(seat, roomId)
        }
    }

    return <article className='flex flex-col bg-gray-200 shadow-md shadow-gray-400 rounded-3xl justify-center'>
        <div className='flex flex-row justify-center gap-5'>
            <HTag level={3}>Cinema:</HTag>
            <p>{ticket.cinema.name}</p>
        </div>
        <div className='flex flex-row justify-center gap-5'>
            <HTag level={3}>Room:</HTag>
            {whereIsEditing === roomValue & rooms ?
                <Form id='update' onSubmit={onSubmit}>
                    <select name="room" id="room">
                        {rooms.map(room => <option value={room.id}>{room.name}</option>)}
                    </select>
                </Form>
                : <div className='flex flex-row gap-5'>
                    <p>{ticket.room.name}</p>
                    {logic.isManagerUserLoggedIn() && <Button onClick={() => onEditTicketButton(roomValue)}>✏️</Button>}
                </div>}
        </div>
        <div className='flex flex-row justify-center gap-5'>
            <HTag level={3}>Seat:</HTag>
            {whereIsEditing === seatValue ?
                <Form id='update' onSubmit={onSubmit}>
                    <Input defaultValue={ticket.seat} id='seat' />
                </Form>
                : <div className='flex flex-row'>
                    <p>{ticket.seat}</p>
                    {logic.isManagerUserLoggedIn() &&
                        < Button onClick={() => onEditTicketButton(seatValue)}>✏️</Button>}
                </div>}
        </div >
        <div className='flex flex-row justify-center gap-5'>
            <HTag level={3}>Id del ticket:</HTag>
            <p>{ticket.id}</p>
        </div>
        {conditionButtons ?
            <div className='flex flex-row'>
                <Button form='update' type='submit'>Update</Button>
                <Button onClick={onCancelClick}>Cancel</Button>
            </div> : <div className='flex flex-row justify-center'><p>Have problems in the room? Click Here -→ </p><Button onClick={() => onCreateIssueClick(ticket.id)}>☹️</Button></div>}
        {logic.isManagerUserLoggedIn() && !whereIsEditing && < Button onClick={onDeleteTicketButton}>🗑️</Button>}
    </article >
}
export default Ticket