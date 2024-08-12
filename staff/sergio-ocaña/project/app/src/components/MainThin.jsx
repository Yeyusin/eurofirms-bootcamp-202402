function MainThin({ children, className = null }) {
    let props = 'flex flex-col p-0 gap-6 bg-happy-bg bg-cover min-h-0 w-full h-full justify-center overflow-auto'
    if (className) props += className
    return <>
        <main className={props}>
            {children}
        </main>
    </>
}
export default MainThin