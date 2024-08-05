function Header({ children }) {
    return <header className='flex flex-nowrap justify-center border-b-2 border-black fixed top-0 w-full bg-yellow-200 h-12 px-3 py-3 box-border'>
        {children}
    </header>

}
export default Header