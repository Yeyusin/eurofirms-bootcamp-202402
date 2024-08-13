import { ButtonText, LabelInput, Form, HTag, Main, Article } from '../components'
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
            feedback = `${feedback}, verify credentials`
        else feedback = 'sorry, there was an error, please try again later'

        alert(feedback)
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
        <header className=''>
            <img src='/images/logo.png' alt='Logo' />
        </header>

        <Article>
            <HTag> Login </HTag>

            <Form id='login' onSubmit={handleSubmit}>
                <div className='flex flex-col justify-center overflow-auto w-auto'>
                    <LabelInput text='E-mail' id='email' />
                    <LabelInput text='Password' type='password' id='password' />
                    <div className='flex flex-row justify-center w-full'>
                        <ButtonText type="button" onClick={handleRegisterButton}> Register </ButtonText>
                        <ButtonText form='login' type="submit"> Login </ButtonText>
                    </div>
                </div>
            </Form>
        </Article >
    </>
}
export default Login