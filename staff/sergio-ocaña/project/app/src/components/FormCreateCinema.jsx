import logic from '../logic'
import { ButtonText, Form, LabelInput, HTag } from './index.js'
import { errors } from 'com'

const { ContentError, MatchError } = errors

function FormCreateCinema({ onCancelClick, onCreatedCinema }) {
    const errorHandler = error => {
        console.error(error)

        let feedback = error.message

        if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
            feedback = `${feedback}, please correct it`
        else if (error instanceof MatchError)
            feedback = `${feedback}, try again`
        else feedback = 'sorry, there was an error, please try again later'
    }

    const handleCancelButton = () => {
        onCancelClick()
    }
    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value
        const address = form.address.value

        try {
            logic.createCinema(name, address)
                .then(() => onCreatedCinema())
                .catch(error => {
                    errorHandler(error)
                })
        }
        catch (error) {
            errorHandler(error)
        }
    }
    return <div className='flex flex-col justify-center w-full'>
        <HTag> Create cinema </HTag>

        <Form id='createCinema' onSubmit={handleSubmit}>
            <LabelInput className='w-full' text='Cinema´s name' id='name' />
            <LabelInput text='Address' id='address' />
            <div className='flex flex-row justify-center w-full'>
                <ButtonText type="button" onClick={handleCancelButton}> Cancel </ButtonText>
                <ButtonText form='createCinema' type="submit" onSubmit={handleSubmit}> Create Cinema </ButtonText>
            </div>
        </Form >
    </div >
}

export default FormCreateCinema