function Header({ children, className }) {
    let props = 'flex flex-nowrap justify-between border-b-2 border-black w-full bg-[#e4b641] h-14 px-3 py-2 box-border z-10 '
    if (className)
        props += + className
    return <header className={props}>
        {children}
    </header>

}
export default Header