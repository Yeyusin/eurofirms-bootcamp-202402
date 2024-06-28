import { Button, LabelInput, Form, HTag } from '../components'
import logic from '../logic'

function Login({ onUserLoggedIn, onRegisterClick }) {
    const handleRegisterButton = () => {
        onRegisterClick()
    }
    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const email = form.email.value
        const password = form.password.value

        try {
            logic.loginUser(email, password)
                .then(() => onUserLoggedIn())
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
        <HTag> Login </HTag>

        <Form onSubmit={handleSubmit}>
            <LabelInput text='E-mail' id='email' />
            <LabelInput text='Password' type='password' id='password' />

            <Button type="submit" onSubmit={handleSubmit}> Login </Button>

            <Button type="button" onClick={handleRegisterButton}> Register </Button>
        </Form>
    </>
}
export default Login