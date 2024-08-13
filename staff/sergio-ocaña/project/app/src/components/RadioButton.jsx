function RadioButton({ OnRadioButtonClick, status }) {
    let props = 'rounded-xl '
    if (status === 'open')
        props += 'bg-green-500 text-start'
    else
        props += 'bg-red-500 text-end'
    return <div className='flex flex-col justify-center bg-green w-[50px]  '><button className={props} onClick={OnRadioButtonClick}>⚪</button></div>

} export default RadioButton