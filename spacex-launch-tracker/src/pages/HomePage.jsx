import { useState } from 'react';
import { useSpaceX } from '../context/SpaceXContext';
import { LaunchCardList } from '../components/LaunchCardList';
import { RocketInfo } from '../components/RocketInfo';
import { SearchInput } from '../components/SearchInput';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { EmptyState } from '../components/EmptyState';

const HomePage = () => {
    const { launchData, rocketData, isLoading, error } = useSpaceX();
    const [searchName, setSearchName] = useState('');

    const handleMissionSearch = (searchValue) => {
        setSearchName(searchValue.trim().toLowerCase());
    };

    const filteredLaunchData = launchData?.filter(launch => 
        launch.name.toLowerCase().includes(searchName)
    ) || [];

    const renderContent = () => {
        if (isLoading) {
        return <LoadingSpinner />;
        }

        if (error) {
        return (
            <div className="text-center py-12">
            <p className="text-red-600 text-lg">Error: {error}</p>
            <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
                Try Again
            </button>
            </div>
        );
        }

        if (filteredLaunchData.length === 0 && searchName) {
        return <EmptyState searchQuery={searchName} />;
        }

        return (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2">
            <LaunchCardList launchData={filteredLaunchData} />
            </div>
            <div className="xl:col-span-1">
            <RocketInfo rocketData={rocketData} />
            </div>
        </div>
        );
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
            <SearchInput 
            onSearch={handleMissionSearch} 
            searchValue={searchName}
            />
        </div>
        {renderContent()}
        </div>
    );
};

export default HomePage;