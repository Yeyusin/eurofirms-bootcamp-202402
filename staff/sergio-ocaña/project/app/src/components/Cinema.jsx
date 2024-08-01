import { useEffect, useState } from 'react'
import logic from '../logic'
import { HTag, Form } from './index.js'

function Cinema({ cinemaId }) {
    const [name, setName] = useState(null)
    const [rooms, setRooms] = useState(null)

    const errorHandler = error => {
        console.error(error)

        let feedback = error.message

        if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
            feedback = `${feedback}, please correct it`
        else if (error instanceof MatchError)
            feedback = `${feedback}, please refresh the page`
        else feedback = 'sorry, there was an error, please try again later'

        alert(feedback)
    }

    useEffect(() => {
        try {
            logic.retrieveCinema(cinemaId)
                .catch(error => errorHandler(error))
                .then((cinema => {
                    const { name } = cinema
                    setName(name)
                }))
        } catch (error) {
            errorHandler(error)
        }
    })


    return <>
        {name ? <HTag>{name}</HTag> : <p>Loading....</p>}
        <Form>
            <ul>
                {rooms?.forEach(room => {
                    <li key={room.id}>{room.name}</li>

                })}

            </ul>
        </Form>
    </>
}
export default Cinema