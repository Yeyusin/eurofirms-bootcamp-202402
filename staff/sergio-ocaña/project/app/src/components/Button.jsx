function Button({ type = "", onClick, className = "", children }) {
    return <button className={"rounded-[10px] border-w-[1px] text-[#b4ed64] " + className} onClick={onClick} type={type} > {children} </button>
}
export default Button