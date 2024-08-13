import { useEffect, useState } from 'react'
import logic from '../logic'
import { HTag, Button, ButtonText, P } from './index.js'
import Room from './Room.jsx'
import CreateRoom from './CreateRoom.jsx'
import { QrCodeIcon } from '@heroicons/react/16/solid'

import { errors } from 'com'
const { ContentError, MatchError, DuplicityError } = errors

import { nameValue, tempValue, createValue } from './magicValues'

function Cinema({ cinemaId, onUnasignCinema, handleQrClick, handleQrCinemaClick, handleDeleteCinema }) {
    const [name, setName] = useState(null)
    const [rooms, setRooms] = useState(null)
    const [isClicked, setClicked] = useState(null)

    const errorHandler = error => {
        console.error(error)

        let feedback = error.message

        if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
            feedback = `${feedback}, please correct it`
        else if (error instanceof DuplicityError)
            feedback = `${feedback}, please create a room with other name`
        else if (error instanceof MatchError)
            feedback = `${feedback}, we couldn´t find with that parameters`
        else feedback = 'sorry, there was an error, please try again later'

        if (error.message.includes('expired')) logic.deleteToken()

        alert(feedback)
    }

    useEffect(() => {
        try {
            Promise.all([logic.retrieveCinema(cinemaId), logic.retrieveRoomsFromCinema(cinemaId)])
                .then(values => {
                    const [cinema, retrievedRooms] = values
                    setName(cinema.name)
                    setRooms(retrievedRooms)
                })
                .catch(error => errorHandler(error))
        } catch (error) {
            errorHandler(error)
        }
    }, [])

    const refreshRooms = () => {
        try {
            logic.retrieveRoomsFromCinema(cinemaId)
                .then(retrievedRooms => setRooms(retrievedRooms))
                .catch(error => errorHandler(error))
        } catch (error) {
            errorHandler(error)
        }
    }

    const handleClickNewRoom = () => {
        const selected = {
            id: 0,
            value: createValue
        }

        setClicked(selected)

    }
    const handleNameClick = id => {
        const selected = {
            id,
            value: nameValue
        }

        setClicked(selected)
    }

    const handleTemperatureClick = id => {
        const selected = {
            id,
            value: tempValue
        }

        setClicked(selected)
    }

    const onSubmitRoom = (name, temperature) => {
        try {
            logic.createRoom(cinemaId, name, temperature)
                .then(() => {
                    refreshRooms()

                    setClicked(null)
                })
                .catch(error => errorHandler(error))
        } catch (error) {
            errorHandler(error)
        }
    }

    const handleCancelButtonRoom = () => setClicked(null)

    const handleCancelButtonEdit = () => setClicked(null)

    const updateRoom = (roomId, name, temperature) => {
        try {
            logic.updateRoom(cinemaId, roomId, name, temperature)
                .then(() => {
                    refreshRooms()
                    setClicked(null)
                })
                .catch(error => errorHandler(error))
        } catch (error) {
            errorHandler(error)
        }
    }

    const handleDeleteClick = (roomId) => {
        const deleteOrNot = confirm('Are you sure about to delete this room?')

        if (!deleteOrNot) return

        try {
            logic.deleteRoom(cinemaId, roomId)
                .then(() => refreshRooms())
                .catch(error => errorHandler(error))
        } catch (error) {
            errorHandler(error)
        }
    }

    const handleClickUpdateName = (roomId, name, temperature) => updateRoom(roomId, name, temperature)

    const handleClickUpdateTemp = (roomId, name, temperature) => updateRoom(roomId, name, temperature)

    const onUnselectCinema = () => {
        const unselectOrNot = confirm('Are you sure about to unasign this cinema?')

        if (!unselectOrNot) return

        try {
            logic.deleteCinemaToManager(cinemaId)
                .then(() => onUnasignCinema())
                .catch(error => errorHandler(error))
        } catch (error) {
            errorHandler(error)
        }
    }

    return <>
        {name ? <div className='flex-flex-row w-full'>
            <div className='flex flex-row justify-center gap-2'>
                <HTag level={2}>Your cinema is :</HTag>
                <P>{name}</P>
                <Button onClick={onUnselectCinema} className='text-xl'>❌</Button>
                <Button className='text-xl' onClick={handleClickNewRoom}>➕</Button>
                <Button className='text-xl' onClick={() => handleDeleteCinema(cinemaId)}>🗑</Button>
                <QrCodeIcon className='size-8 cursor-pointer' onClick={() => handleQrCinemaClick(cinemaId)} />
            </div>
        </div > : <p>Loading....</p>}
        <ul className='flex flex-col gap-5 w-full'>
            {rooms?.map(room =>
                <Room key={room.id}
                    room={room}
                    isClicked={isClicked}
                    onDeleteClick={handleDeleteClick}
                    onCancelButtonEdit={handleCancelButtonEdit}
                    onTemperatureClick={handleTemperatureClick}
                    onNameClick={handleNameClick}
                    updateRoomName={handleClickUpdateName}
                    updateRoomTemp={handleClickUpdateTemp}
                    onQrClick={handleQrClick}
                    cinemaId={cinemaId} />
            )}
            {rooms?.length === 0 && <p> Create your first room </p>}
            {(isClicked?.value === createValue) && <CreateRoom handleCancelButtonRoom={handleCancelButtonRoom} handleCreateRoom={onSubmitRoom} />}

        </ul>
    </>
}
export default Cinema