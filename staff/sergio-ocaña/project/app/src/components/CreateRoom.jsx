import { HTag, Form, LabelInput, Button, ButtonText } from './index'

function CreateRoom({ handleCancelButtonRoom, handleCreateRoom }) {
    const onSubmitRoom = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value
        const temperature = form.temperature.value

        handleCreateRoom(name, temperature)
    }
    const handleCancelClick = () => handleCancelButtonRoom()

    return <section className='absolute flex flex-col bottom-10 left-0  bg-[#e4b641] w-full p-2' >
        <HTag level={3}> Create Your Room</HTag>

        <Form id='createRoom' onSubmit={onSubmitRoom}>
            <LabelInput text='Room name' id='name' />
            <LabelInput text='Temperature' type='number' id='temperature' />

            <div className='flex flex-row justify-center w-full'>
                <ButtonText type='button' onClick={handleCancelClick}> Cancel </ButtonText>

                <ButtonText form='createRoom' type='submit' > Create </ButtonText>
            </div>
        </Form>
    </section >
} export default CreateRoom