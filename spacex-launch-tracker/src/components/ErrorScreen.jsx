export const ErrorScreen = ({error}) => {
    return (
        <div className="text-center py-12">
            <p className="text-red-600 text-lg">Error: {error}</p>
            <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Try Again
                </button>
        </div>
    )
}