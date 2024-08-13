function P({ children, onClick, className }) {
    let props = 'inline-block text-xl text-center '
    if (className)
        props += className
    return <p onClick={onClick} className={props}>{children}</p>
}
export default P