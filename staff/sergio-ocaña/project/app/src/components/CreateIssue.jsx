import { HTag, Form, LabelInput, Button, Article, ButtonText, P } from './index'
import { useEffect, useState } from 'react'
import logic from '../logic'
import { errors } from 'com'
import { useParams } from 'react-router-dom'

const { MatchError, ContentError } = errors

function CreateIssue({ handleCancelButtonIssue, handleCreatedIssue }) {
    const { ticketId } = useParams()

    const [step, setStep] = useState(0)
    const [cinemas, setCinemas] = useState(null)
    const [formCinemaId, setFormCinemaId] = useState(null)
    const [rooms, setRooms] = useState(null)
    const [isLocationRoom, setIsLocationRoom] = useState(false)
    const [location, setLocation] = useState(null)
    const [formRoomId, setFormRoomId] = useState(null)
    const [type, setType] = useState(null)

    useEffect(() => {
        if (ticketId) setStep(3)

        else if (logic.isQRAvaliable()) {
            const qr = logic.getQRInfo()

            const { cinemaId, roomId, location } = qr

            if (cinemaId && roomId) {
                try {
                    logic.retrieveRoomName(roomId)
                        .then(name => {
                            logic.deleteLocalQR()
                            setFormCinemaId(cinemaId)
                            setFormCinemaId(roomId)
                            setLocation(name)
                            setStep(3)
                        })
                        .catch(error => errorHandler(error))
                } catch (error) {
                    errorHandler(error)
                }
            }

            if (cinemaId && !roomId) {
                logic.deleteLocalQR()
                setFormCinemaId(cinemaId)
                setLocation(location)
                setStep(3)
            }
        }

        else {
            try {
                logic.retrieveCinemas()
                    .then(cinemas => setCinemas(cinemas))
                    .catch(error => errorHandler(error))
            } catch (error) {
                errorHandler(error)
            }
        }
    }, [])

    const errorHandler = error => {
        console.error(error)

        let feedback = error.message

        if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
            feedback = `${feedback}, please correct it`
        else if (error instanceof MatchError)
            feedback = `${feedback}, please try to relog again`
        else feedback = 'sorry, there was an error, please try again later'

        alert(feedback)
    }

    const searchCinemaRooms = () => {
        try {
            logic.retrieveRoomsFromCinemaCustomer(formCinemaId)
                .then(rooms => setRooms(rooms))
                .catch(error => errorHandler(error))
        } catch (error) {
            errorHandler(error)
        }
    }

    const handleSelectedCinema = (formCinemaId) => {
        setFormCinemaId(formCinemaId)
        setStep(1)
    }

    const handleYesButton = () => {
        searchCinemaRooms()

        setStep(2)

        setIsLocationRoom(true)
    }

    const handleNoButton = () => setStep(2)

    const handleSelectedRoom = (formRoomId, roomName) => {
        setStep(3)

        setLocation(roomName)

        setFormRoomId(formRoomId)
    }

    const onSubmitLocation = (event) => {
        event.preventDefault()

        const form = event.target

        const locationForm = form.location.value

        if (locationForm.length === 0) return

        setLocation(locationForm)

        setStep(3)
    }

    const handleTemperatureButton = () => {
        setStep(4)

        setType('temperature')
    }

    const handleSoundButton = () => {
        setStep(4)

        setType('sound')
    }

    const handleFilmButton = () => {
        setStep(4)

        setType('film')
    }

    const handleCleaningButton = () => {
        setStep(4)

        setType('cleaning')
    }

    const onSubmitDescription = (event) => {
        event.preventDefault()

        const form = event.target

        const description = form.description.value

        if (description.length === 0) return

        const promise = ticketId ? logic.createIssueWithTicket(ticketId, type, description) : logic.createIssue(formCinemaId, location, type, description, formRoomId)

        try {
            promise
                .then(() => handleCreatedIssue())
                .catch(error => errorHandler(error))
        } catch (error) {
            errorHandler(error)
        }
    }

    return <section className='flex flex-col justify-center align-center mr-10'>
        <Article className='w-full focus-visible gap-2'>
            {cinemas && step === 0 && <>
                <HTag level={3}> Select Cinema</HTag>

                <ul className='flex flex-col w-full gap-1'>
                    {cinemas?.map(cinema => {
                        return <li
                            className={'flex cursor-pointer rounded-md p-1 bg-white text-[#4ca4b8]'} onClick={() => handleSelectedCinema(cinema.id)} key={cinema.id}> {cinema.name}
                            {rooms.length === 0 && <P>No cinema avalaible to asign</P>}
                        </li>
                    })}
                </ul >
            </>}

            {step === 1 && <>
                <HTag level={3}> Is the issue related to a room?</HTag>

                <div className='flex flex-row justify-center'>
                    <ButtonText onClick={handleYesButton}>Yes</ButtonText>

                    <ButtonText onClick={handleNoButton}>No</ButtonText>
                </div>
            </>}

            {step === 2 && rooms && isLocationRoom && <>
                <HTag level={3}> Select Room</HTag>

                <ul className='flex flex-col w-full gap-1'>
                    {rooms?.map(room => {
                        return <li
                            className={'flex cursor-pointer bg-white text-[#4ca4b8] w-full rounded-md p-1'} onClick={() => handleSelectedRoom(room.id, room.name)} key={room.id}> {room.name}
                        </li>
                    })}
                    {rooms.length === 0 && <P>No rooms avalaible to asign</P>}
                </ul >
            </>}

            {step === 2 && !isLocationRoom && <>
                <HTag level={3}> Tell us where the issue happened</HTag>

                <Form onSubmit={onSubmitLocation}>
                    <LabelInput text='Location' id='location' />

                    <ButtonText type='submit'>Next</ButtonText>
                </Form>

            </>}

            {step === 3 && <>
                <HTag level={3}> What type of issue happened?</HTag>

                <div className='flex flex-col'>
                    <ButtonText onClick={handleTemperatureButton}>Temperature</ButtonText>

                    <ButtonText onClick={handleSoundButton}>Sound</ButtonText>

                    <ButtonText onClick={handleFilmButton}>Film</ButtonText>

                    <ButtonText onClick={handleCleaningButton}>Cleaning</ButtonText>
                </div>
            </>}


            {step === 4 && <>
                <HTag level={3}> Tell us what happened</HTag>

                <Form onSubmit={onSubmitDescription}>
                    <LabelInput text='Description' id='description' />

                    <ButtonText type='submit'>Next</ButtonText>
                </Form>

            </>}
            <ButtonText onClick={handleCancelButtonIssue}>Cancel</ButtonText>
        </Article>
    </section>
} export default CreateIssue