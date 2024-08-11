function Form({ children, onSubmit, className = '', id = 'form' }) {
    return (
        <form className={'flex flex-col gap-2 mb-5 ' + className} onSubmit={onSubmit} id={id}>
            {children}
        </form>
    )
}
export default Form