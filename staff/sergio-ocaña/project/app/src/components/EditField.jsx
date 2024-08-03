import { LabelInput, Button, Form } from './index'


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
            <Button type='button' className='px-2 m-2' onClick={handleCancelButton}> Cancel </Button>

            <Button type='submit' className='px-2 m-2' > Submit </Button>
        </div>
    </Form >

} export default EditField