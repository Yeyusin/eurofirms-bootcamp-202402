const HTagHandler = {
    1: ({ children, className = "" }) => <h1 className={'px-[10px] font-bold text-[#b4ed64] text-xl text-center ' + className}>{children}</h1>,
    2: ({ children, className = '' }) => <h2 className={'font-bold text-[#b4ed64] text-2xl text-center ' + className}>{children}</h2>,
    3: ({ children, className = '' }) => <h3 className={'font-bold text-[#b4ed64] text-2xl text-center ' + className}>{children}</h3>
}

function HTag({ level = 1, children, className = '' }) {
    const tag = HTagHandler[level]

    return tag({ children, className })
}
export default HTag