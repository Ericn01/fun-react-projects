export const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center py-16">
            <div className="flex flex-col items center space-y-4">
                <div className="animate-spin-rounded-full h-12 border-b-2 border-blue-600"></div>
                <p className="text-gray-600 text-lg">Loading SpaceX data...</p>
            </div>
        </div>
    );
};

// CSS animations are really out of this world... no need for advanced JS to make a spinner, just a few lines of CSS and BOOM you're done!