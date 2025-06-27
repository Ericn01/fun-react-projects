export const FormInputInfo = ({tooltip}) => {
    return (
        <div className="relative group inline-block">
            <div className="w-4 h-4 bg-gray-400 hover:bg-gray-500 rounded-full flex items-center justify-center cursor-help transition-colors">
                <span className="text-white text-xs font-bold">?</span>
            </div>

            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                {tooltip}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
            </div>
        </div>
    )
}