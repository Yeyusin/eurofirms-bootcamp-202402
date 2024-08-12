function Input({ type = 'text', id, defaultValue, placeholder = '' }) {
    return <input className='border-b-2 min-h-6 border-black w-full' type={type} id={id} defaultValue={defaultValue} placeholder={placeholder} />
}
export default Input