function ButtonText({ type = '', onClick, className = '', children, form = 'form' }) {
    let classNameProp = 'rounded-[20px]  border-black m-10 max-w bg-[#b98724] min-h-12 p-2 ' + className
    if (!className.includes('text'))
        classNameProp += ' text-3xl text-white text-center font-bold'
    return <button className={classNameProp} onClick={onClick} type={type} form={form} > {children} </button >
}
export default ButtonText