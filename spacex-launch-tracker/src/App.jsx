import { useEffect, useState } from 'react'
import './App.css'
import { Header } from './components/Header';
import { LoadingSpinner } from './components/LoadingSpinner';
import { EmptyState } from './components/EmptyState';
import { ErrorScreen } from './components/ErrorScreen';
import { MainOverview } from './components/MainOverview';
import { SearchInput } from './components/SearchInput';

// Setting up the base URL for API requests
const BASE_URL = 'https://api.spacexdata.com/latest';

function App() {
  const [launchData, setLaunchData] = useState(null); // API
  const [rocketData, setRocketData] = useState(null) // Also from the API
  const [searchName, setSearchName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect( () => {
    const fetchLaunchData = async () => {
      try{
        // Fetch from both relevant endpoints simultaneously
        const [launchesResponse, rocketsResponse] = await Promise.all([
          fetch(`${BASE_URL}/launches`), 
          fetch(`${BASE_URL}/rockets`)
        ]);

        if (!launchesResponse.ok || !rocketsResponse.ok){
          throw new Error('One or more of the API requests failed!');
        }

        const [launchesData, rocketsData] = await Promise.all([
          launchesResponse.json(),
          rocketsResponse.json()
        ]);
        
        // Now we update the state with the fetched data
        setLaunchData(launchesData);
        setRocketData(rocketsData);

      } catch (error) {
        console.error(`An unexpected error occured while fetching the Space X Launch Data `, error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchLaunchData();
  }, []); // No dependencies, only runs once on page load. 

  // Search bar when looking for a specific mission
  const handleMissionSearch = (e) => {
    const searchValue = e.currentTarget.value.trim().toLowerCase();
    setSearchName(searchValue)
  }

  // Filtering out the launch data results via search
  const filteredLaunchData = launchData?.filter( (launchData) => launchData.name.toLowerCase().includes(searchName) || launchData);

  // Rendering the content
  const renderContent = () => {
    if (isLoading) { // Page is loading
      return <LoadingSpinner /> 
    }
    if (error) { // API error 
      return <ErrorScreen error={error} />
    } 
    if (filteredLaunchData.length === 0 && searchName) { // No matches found
      return <EmptyState searchQuery={searchName} />
    }
    return <MainOverview filteredLaunchData={filteredLaunchData} rocketData={rocketData} />
  }
  return (
    <main className='min-h-screen bg-gray-50'>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <SearchInput
            onSearch={handleMissionSearch}
            searchValue={searchName}
          />
        </div>
        {renderContent()}
      </div>
    </main>
  )
}

export default App
