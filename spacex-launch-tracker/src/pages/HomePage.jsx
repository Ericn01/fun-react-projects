import { useState } from 'react';
import { useSpaceX } from '../context/SpaceXContext';
import { SearchInput } from '../components/SearchInput';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorScreen } from '../components/ErrorScreen';
import { EmptyState } from '../components/EmptyState';
import { MainOverview } from '../components/MainOverview';

const HomePage = () => {
    const { launchData, rocketData, isLoading, error } = useSpaceX();
    const [searchName, setSearchName] = useState('');

    const handleMissionSearch = (searchValue) => {
        setSearchName(searchValue.trim().toLowerCase());
    };

    const filteredLaunchData = launchData?.filter(launch => 
        launch.name.toLowerCase().includes(searchName)
    ) || [];

    // Render the main content if no errors occur
    const renderContent = () => {
        if (isLoading) {
            return <LoadingSpinner />
        }
        if (error) { 
            return <ErrorScreen error={error} />
        }
        if (filteredLaunchData.length === 0 && searchName) {
            return <EmptyState searchQuery={searchName} />
        }

        return <MainOverview filteredLaunchData={launchData} rocketData={rocketData} />
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <SearchInput
                        onSearch={handleMissionSearch}
                        searchValue={searchName}
                    />
                </div>
                {renderContent()}
            </div>
        </div>
    );
}


export default HomePage;