import { LabelInput, Button, Form, ButtonText } from './index'


function EditField({ text, inputType = 'text', id, defaultValue = '', onCancelClick, onSubmitClick }) {
    const handleSubmit = (event) => {
        event.preventDefault()

        const form = event.target

        const value = form[id].value

        onSubmitClick(value)

    }
    const handleCancelButton = () => onCancelClick()

    return <Form onSubmit={handleSubmit}>
        <LabelInput text={text} type={inputType} id={id} defaultValue={defaultValue} />
        <div className='flex justify-between'>
            <ButtonText type='button' className='px-2 m-2' onClick={handleCancelButton}> Cancel </ButtonText>

            <ButtonText type='submit' className='px-2 m-2' > Submit </ButtonText>
        </div>
    </Form >

} export default EditField