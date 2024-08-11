function Button({ type = '', onClick, className = '', children, form = 'form' }) {
    return <button className={'rounded-[10px] border-w-[1px] text-[#b4ed64] text-3xl' + className} onClick={onClick} type={type} form={form} > {children} </button>
}
export default Button