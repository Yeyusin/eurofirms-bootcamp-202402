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

    return <li key={room.id} className='flex flex-col place-items-center gap-5 w-full'>

        {(isClicked?.id === room.id && isClicked?.value === nameValue) ?
            <EditField text='Change the name'
                id='name'
                defaultValue={room.name}
                onCancelClick={handleCancelEditButton}
                onSubmitClick={value => handleClickUpdateName(value)}
            />
            : <div className='w-full'><P className='flex font-bold' onClick={handleOnNameClick}>{room.name}</P>
            </div>}

        {(isClicked?.id === room.id && isClicked?.value === tempValue) ?
            <EditField text='Select Temperature'
                id='temperature'
                type='number'
                defaultValue={room.temperature}
                onCancelClick={handleCancelEditButton}
                onSubmitClick={value => handleClickUpdateTemp(value)}
            />
            : <>
                <P className='flex' onClick={handleOnTemperatureClick}> {`${room.temperature} Cº`} </P>
                <div className='flex flex-row w-full'>
                    <Button onClick={onDeleteClickButton}>🗑️</Button>
                    <QrCodeIcon className='size-12' onClick={() => onQrClick(cinemaId, room.id)} />
                </div>
            </>}
    </li>

} export default Room