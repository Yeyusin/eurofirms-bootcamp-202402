function Article({ children, className }) {
    const props = `flex flex-col items-center bg-[#e4b641] mx-4 my-2 h-full bg-opacity-90 rounded-3xl p-4 gap- shadow-[#e4b641]-50 box-border overflow-auto ${className}`
    return <article className={props} >
        {children}
    </article >
} export default Article