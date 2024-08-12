import { LabelInput, Form, HTag, ButtonText, Article, Main } from '../components'
import logic from '../logic'
import { errors } from 'com'
import logo from '../img/logo.png'

const { DuplicityError, ContentError } = errors


function RegisterCustomer({ onUserRegistered, onLoginClick }) {
    const errorHandler = error => {
        console.error(error)

        let feedback = error.message

        if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
            feedback = `${feedback}, please correct it`

        else if (error instanceof DuplicityError)
            feedback = `${feedback}, please log in or try with other email`

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
            logic.registerCustomer(name, birthdate, email, password)
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
        <footer className=''>
            <img src={logo} alt='Logo' />
        </footer>
        <Article>
            <HTag>Register</HTag>

            <Form id='register' onSubmit={handleSubmit}>
                <LabelInput text='Name' id='name' />
                <LabelInput text='Birthdate' type='date' id='birthdate' />
                <LabelInput text='E-mail' id='email' />
                <LabelInput text='Password' type='password' id='password' />
                <div className='flex flex-row justify-center w-full'>
                    <ButtonText type='button' onClick={handleLoginButton}> Login </ButtonText>
                    <ButtonText form='register' type='submit' > Register </ButtonText>
                </div>
            </Form>
        </Article>
    </>
}
export default RegisterCustomer