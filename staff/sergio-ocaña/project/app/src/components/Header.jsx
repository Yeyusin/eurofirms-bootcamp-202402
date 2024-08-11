function Header({ children, className }) {
    return <header className={'flex flex-nowrap justify-between border-b-2 border-black fixed top-0 w-full bg-yellow-200 h-14 px-3 py-3 box-border' + className}>
        {children}
    </header>

}
export default Header