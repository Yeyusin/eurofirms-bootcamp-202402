function Main({ children, className }) {
    const props = `flex flex-col bg-happy-bg bg-cover min-h-screen ${className}`
    return <>
        <main className={props}>
            {children}
        </main>
    </>
}
export default Main