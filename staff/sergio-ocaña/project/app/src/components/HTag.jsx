const HTagHandler = {
    1: ({ children, className = "" }) => <h1 className={'px-[10px] font-bold text-[#4ca4b8] text-3xl text-center my-5' + className}>{children}</h1>,
    2: ({ children, className = '' }) => <h2 className={'font-bold text-[#4ca4b8] text-xl text-center ' + className}>{children}</h2>,
    3: ({ children, className = '' }) => <h3 className={'font-bold text-[#4ca4b8] text-xl text-center ' + className}>{children}</h3>
}

function HTag({ level = 1, children, className = '' }) {
    const tag = HTagHandler[level]

    return tag({ children, className })
}
export default HTag