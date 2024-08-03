import { HTag, Form, LabelInput, Button } from './index'

function CreateRoom({ handleCancelButtonRoom, handleCreateRoom }) {
    const onSubmitRoom = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value
        const temperature = form.temperature.value

        handleCreateRoom(name, temperature)
    }
    const handleCancelClick = () => handleCancelButtonRoom()

    return <>
        <HTag level={3}> Create Your Room</HTag>

        <Form onSubmit={onSubmitRoom}>
            <LabelInput text='Room name' id='name' />
            <LabelInput text='Temperature' type='number' id='temperature' />

            <div className='flex justify-between'>
                <Button type='button' className='px-2 m-2' onClick={handleCancelClick}> Cancel </Button>

                <Button type='submit' className='px-2 m-2' > Submit </Button>
            </div>
        </Form>
    </>
} export default CreateRoom