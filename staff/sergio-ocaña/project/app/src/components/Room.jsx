import { nameValue, tempValue } from './magicValues'
import EditField from './EditField'
import { Button, P } from './index'
import { QrCodeIcon } from '@heroicons/react/16/solid'

function Room({ room, cinemaId, updateRoomName, updateRoomTemp, isClicked, onCancelButtonEdit, onTemperatureClick, onNameClick, onDeleteClick, onQrClick }) {

    const handleOnTemperatureClick = () => onTemperatureClick(room.id)

    const handleOnNameClick = () => onNameClick(room.id)

    const handleCancelEditButton = () => onCancelButtonEdit()

    const handleClickUpdateName = value => updateRoomName(room.id, value, room.temperature)

    const handleClickUpdateTemp = value => updateRoomTemp(room.id, room.name, value)

    const onDeleteClickButton = () => onDeleteClick(room.id)

    return <li key={room.id} className='flex flex-col justify-center items-center gap-5 w-full h-auto'>

        {(isClicked?.id === room.id && isClicked?.value === nameValue) ? <div>

            <EditField text='Change the name'
                id='name'
                defaultValue={room.name}
                onCancelClick={handleCancelEditButton}
                onSubmitClick={value => handleClickUpdateName(value)}
            />
        </div>
            : <div className='w-full flex flex-center justify-center'><P className='flex font-bold cursor-pointer' onClick={handleOnNameClick}>{room.name}</P>
            </div>}

        {(isClicked?.id === room.id && isClicked?.value === tempValue) ? <div className='flex flex-center justify-center w-fulls'>
            <EditField text='Select Temperature'
                id='temperature'
                type='number'
                defaultValue={room.temperature}
                onCancelClick={handleCancelEditButton}
                onSubmitClick={value => handleClickUpdateTemp(value)}
            />
        </div>
            : <>
                <P className='flex cursor-pointer' onClick={handleOnTemperatureClick}> {`T: ${room.temperature} Cº`} </P>
                <div className='flex flex-row justify-center w-full'>
                    <Button onClick={onDeleteClickButton}>🗑️</Button>
                    <QrCodeIcon className='size-12 cursor-pointer' onClick={() => onQrClick(cinemaId, room.id)} />
                </div>
            </>}
    </li>

} export default Room