import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import { useEffect, useState } from "react";
import { qrRoute } from "../routes";
import { ButtonText, Form, Input, Button, Article, MainThin, HTag, P } from "../components";

function QrCreate({ onArrowClick }) {
    const [locationQr, setLocationQr] = useState(null)
    const [isLocationRoom, setIsLocationRoom] = useState(null)
    const { cinemaId, location } = useParams()

    useEffect(() => {
        if (location !== '0' && location !== 'undefined') {
            setLocationQr(location)
            setIsLocationRoom(true)
        }
    }, [])

    const onSubmit = event => {
        event.preventDefault()

        const form = event.target

        const locationForm = form.location.value

        setLocationQr(locationForm)
    }
    const locationValue = isLocationRoom ? `Your location is in a room with this id: ${location}` : location
    return <>
        <Button onClick={onArrowClick}>←</Button>
        <Article>
            {locationQr ? <>
                <HTag>Your code QR for your Cinema and this location:</HTag>
                <P>{`${locationQr}`}</P>
                <QRCode value={`${import.meta.env.VITE_APP_URL}/${qrRoute}/${cinemaId}/${locationQr}`} />
            </>
                : <div className='flex flex-col justify-center w-full items-center'>
                    <Form onSubmit={onSubmit}>
                        <Input id='location' placeholder='Put location for QR' />
                        <ButtonText>Generate QR</ButtonText>
                    </Form>
                </div>}

        </Article>
    </>
}
export default QrCreate