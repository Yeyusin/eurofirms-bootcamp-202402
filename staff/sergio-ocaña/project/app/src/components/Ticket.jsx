import { useState } from 'react'
import logic from '../logic'
import { Button, ButtonText, Form, HTag, Input, P } from './index'
import { roomValue, seatValue } from './magicValues'
import { errors } from 'com'
const { ContentError, MatchError } = errors

function Ticket({ ticket, onDeleteTicketButton, onSubmited, onCreateIssueClick }) {
    const [whereIsEditing, setWhereIsEditing] = useState(null)
    const [roomId, setRoomId] = useState(ticket.room.id)
    const [rooms, setRooms] = useState(null)
    const conditionButtons = logic.isManagerUserLoggedIn() && !!whereIsEditing

    const errorHandler = error => {
        console.error(error)

        let feedback = error.message

        if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
            feedback = `${feedback}, please correct it`
        else if (error instanceof MatchError)
            feedback = `${feedback}, we couldn´t find with that parameters`
        else feedback = 'sorry, there was an error, please try again later'

        if (error.message.includes('expired')) logic.deleteToken()

        alert(feedback)
    }

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

    return <article className='flex flex-col bg-gray-200 shadow-md shadow-gray-400 rounded-3xl justify-center w-full p-2'>
        <div className='flex flex-row justify-center gap-5'>
            <HTag level={3}>Cinema:</HTag>
            <P>{ticket.cinema.name}</P>
        </div>
        <div className='flex flex-row justify-center gap-5'>
            <HTag level={3}>Room:</HTag>
            {whereIsEditing === roomValue & rooms ?
                <Form id='update' onSubmit={onSubmit}>
                    <select name="room" id="room">
                        {rooms.map(room => <option value={room.id}>{room.name}</option>)}
                    </select>
                </Form>
                : <div className='flex flex-row gap-5 self'>
                    <P>{ticket.room.name}</P>
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
                    <P>{ticket.seat}</P>
                    {logic.isManagerUserLoggedIn() &&
                        < Button onClick={() => onEditTicketButton(seatValue)}>✏️</Button>}
                </div>}
        </div >
        <div className='flex flex-row justify-center gap-5'>
            <HTag level={3}>Id del ticket:</HTag>
            <P>{ticket.id}</P>
        </div>
        {conditionButtons ?
            <div className='flex flex-row justify-center'>
                <ButtonText form='update' type='submit'>Update</ButtonText>
                <ButtonText onClick={onCancelClick}>Cancel</ButtonText>
            </div> : <div className='flex flex-row justify-center'><P>Have problems in the room? Click Here -→ </P><Button onClick={() => onCreateIssueClick(ticket.id)}>☹️</Button></div>}
        {logic.isManagerUserLoggedIn() && !whereIsEditing && < Button onClick={onDeleteTicketButton}>🗑️</Button>}
    </article >
}
export default Ticket