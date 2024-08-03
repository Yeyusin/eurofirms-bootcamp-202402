import { nameValue, tempValue } from './magicValues'
import EditField from './EditField'
import { Button } from './index'

function Room({ room, updateRoomName, updateRoomTemp, isClicked, onCancelButtonEdit, onTemperatureClick, onNameClick, onDeleteClick }) {

    const handleOnTemperatureClick = () => onTemperatureClick(room.id)

    const handleOnNameClick = () => onNameClick(room.id)

    const handleCancelEditButton = () => onCancelButtonEdit()

    const handleClickUpdateName = value => updateRoomName(room.id, value, room.temperature)

    const handleClickUpdateTemp = value => updateRoomTemp(room.id, room.name, value)

    const onDeleteClickButton = () => onDeleteClick(room.id)

    return <li key={room.id} className='flex flex-col place-items-center gap-5'>

        {(isClicked?.id === room.id && isClicked?.value === nameValue) ?
            <EditField text='Change the name'
                id='name'
                defaultValue={room.name}
                onCancelClick={handleCancelEditButton}
                onSubmitClick={value => handleClickUpdateName(value)}
            />
            : <div><p className='flex font-bold text-xl' onClick={handleOnNameClick}>{room.name}</p>
            </div>}

        {(isClicked?.id === room.id && isClicked?.value === tempValue) ?
            <EditField text='Select Temperature'
                id='temperature'
                type='number'
                defaultValue={room.temperature}
                onCancelClick={handleCancelEditButton}
                onSubmitClick={value => handleClickUpdateTemp(value)}
            />
            : <> <p className='flex' onClick={handleOnTemperatureClick}> {`${room.temperature} Cº`} </p>
                <Button onClick={onDeleteClickButton}>🗑️</Button>
            </>}
    </li>

} export default Room