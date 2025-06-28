export const EmptyState = ({searchQuery}) => {
    return (
        <div className="text-center py-16">
            <div className="max-w-md mx-auto">
                <div className="text-6xl mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No missions found
                </h3>
                <p className="text-gray-600 mb-4">
                    Sorry, we couldn't find any launches matching "{searchQuery}". Try a different search term.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <strong>Tip:</strong> Try searching from mission names like "Starlink"
                </div>
            </div>
        </div>
    );
}