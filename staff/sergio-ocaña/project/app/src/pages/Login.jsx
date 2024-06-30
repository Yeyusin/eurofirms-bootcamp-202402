import { Button, LabelInput, Form, HTag } from '../components'
import logic from '../logic'
import { errors } from 'com'

const { MatchError, ContentError } = errors

function Login({ onUserLoggedIn, onRegisterClick }) {
    const errorHandler = error => {
        console.error(error)

        let feedback = error.message

        if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
            feedback = `${feedback}, please correct it`
        else if (error instanceof MatchError)
            feedback = `${feedback}, please try to relog again`
        else feedback = 'sorry, there was an error, please try again later'
    }

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
                    errorHandler(error)
                })
        }
        catch (error) {
            errorHandler(error)
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