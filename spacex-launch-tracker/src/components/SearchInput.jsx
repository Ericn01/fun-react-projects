export const SearchInput = ({ onSearch, searchValue }) => {
    const handleChange = (e) => {
        onSearch(e.target.value);
    };

    return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6 md:p-8">
        <div className="flex items-center mb-4">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-2 mr-3 shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            <label
                htmlFor="launchSearch"
                className="text-lg font-bold text-white"
            >
                Search Mission Database
            </label>
        </div>
        
        <div className="relative">
            <input
                type="text"
                id="launchSearch"
                name="launchSearch"
                placeholder="Enter mission name or keywords..."
                onChange={handleChange}
                value={searchValue}
                className="w-full px-4 py-4 pl-12 bg-white/5 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:bg-white/10 transition-all duration-300 text-lg"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                <svg className="h-5 w-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            
            {/* Clear button */}
            {searchValue && (
                <button
                    onClick={() => handleChange({ target: { value: '' } })}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-300 hover:text-white transition-colors duration-200"
                    aria-label="Clear search"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}
        </div>
        
        {searchValue && (
            <div className="mt-4 p-3 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-xl border border-blue-400/20">
                <p className="text-blue-200 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Filtering missions for: 
                    <span className="font-bold text-white ml-1">"{searchValue}"</span>
                </p>
            </div>
        )}
        
        {/* Optional: Search suggestions or recent searches could go here */}
        <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm text-blue-300">Quick filters:</span>
            {['Falcon 9', 'Falcon Heavy', 'Dragon', 'Starlink', 'SES', 'Iridium'].map((suggestion) => (
                <button
                    key={suggestion}
                    onClick={() => handleChange({ target: { value: suggestion } })}
                    className="px-3 py-1 text-xs bg-white/5 hover:bg-white/10 text-blue-200 hover:text-white rounded-full border border-white/20 transition-all duration-200"
                >
                    {suggestion}
                </button>
            ))}
        </div>
    </div>
    );
};