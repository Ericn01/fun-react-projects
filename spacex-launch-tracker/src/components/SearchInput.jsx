export const SearchInput = ({ onSearch, searchValue }) => {
    const handleChange = (e) => {
        onSearch(e.currentTarget.value);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <label 
            htmlFor="launchSearch" 
            className="block text-sm font-semibold text-gray-700 mb-2"
        >
            Filter Launches by Mission Name
        </label>
        <div className="relative">
            <input
            type="text"
            id="launchSearch"
            name="launchSearch"
            placeholder="Search missions..."
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            </div>
        </div>
        {searchValue && (
            <p className="mt-2 text-sm text-gray-600">
            Searching for: <span className="font-medium text-gray-900">"{searchValue}"</span>
            </p>
        )}
        </div>
    );
};