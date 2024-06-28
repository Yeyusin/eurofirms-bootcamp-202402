import { Button, LabelInput, Form, HTag } from '../components'
import logic from '../logic'


function RegisterCustomer({ onUserRegistered, onLoginClick }) {
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
                    console.error(error)

                    alert(error.message)
                })
        }
        catch (error) {
            console.error(error)

            alert(error.message)
        }
    }
    return <>
        <main className='flex flex-col'>
            <HTag>Register</HTag>

            <Form onSubmit={handleSubmit}>
                <LabelInput text='Name' id='name' />
                <LabelInput text='Birthdate' type='date' id='birthdate' />
                <LabelInput text='E-mail' id='email' />
                <LabelInput text='Password' type='password' id='password' />

                <Button type='submit' onSubmit={handleSubmit}> Register </Button>

                <Button type='button' onClick={handleLoginButton}> Login </Button>
            </Form>
        </main >
    </>
}
export default RegisterCustomer