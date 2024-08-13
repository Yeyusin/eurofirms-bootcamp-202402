function Button({ type = '', onClick, className = 'text-3xl', children, form = 'form' }) {
    const props = 'rounded-[10px]  ' + className
    return <button className={props} onClick={onClick} type={type} form={form} > {children} </button>
}
export default Button