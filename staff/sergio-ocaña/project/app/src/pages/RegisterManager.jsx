import { Button, LabelInput, Form, HTag } from '../components'
import logic from '../logic'

import { errors } from 'com'

const { DuplicityError, ContentError } = errors

function RegisterManager({ onUserRegistered, onLoginClick }) {
    const errorHandler = error => {
        console.error(error)

        let feedback = error.message

        if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
            feedback = `${feedback}, please correct it`

        else if (error instanceof DuplicityError)
            feedback = `${feedback}, please try to relog again`

        else feedback = 'sorry, there was an error, please try again later'
    }

    const handleLoginButton = () => {
        onLoginClick()
    }
    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value
        const birthdate = form.birthdate.value
        const email = form.email.value
        const password = form.password.value

        try {
            logic.registerManager(name, birthdate, email, password)
                .then(() => onUserRegistered())
                .catch(error => {
                    errorHandler(error)
                })
        }
        catch (error) {
            errorHandler(error)
        }
    }
    return <>
        <HTag> Register as manager </HTag>

        <Form onSubmit={handleSubmit}>
            <LabelInput text='Name' id='name' />
            <LabelInput text='Birthdate' type='date' id='birthdate' />
            <LabelInput text='E-mail' id='email' />
            <LabelInput text='Password' type='password' id='password' />
            <div className='flex justify-between'>
                <Button type='submit' className='px-2 m-2' > Register </Button>

                <Button type='button' className='px-2 m-2' onClick={handleLoginButton}> Login </Button>

            </div>
        </Form>
    </>
}
export default RegisterManager