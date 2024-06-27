function Button({ type = "", onClick, className = "", children }) {
    return <button className={"rounded-[10px] border-w-[1px] " + className} onClick={onClick} type={type} > {children} </button>
}