function Form({ children, onSubmit, className = '', id = 'form' }) {
    const classNameProp = 'flex flex-col gap-2 mb-5 ' + className
    return (
        <form className={classNameProp} onSubmit={onSubmit} id={id}>
            {children}
        </form>
    )
}
export default Form