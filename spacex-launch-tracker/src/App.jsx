import { useEffect, useState } from 'react'
import './App.css'
import { LaunchCardList } from './components/LaunchCardList';
import { Header } from './components/Header';
import { RocketInfo } from './components/RocketInfo';

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

  // 
  const filteredLaunchData = launchData?.filter( (launchData) => launchData.name.toLowerCase().includes(searchName) || []);

  return (
    <main className='max-w-full'>
      <Header />
      <label htmlFor='launchSearch' className='text-sm font-bold'> Filter Launches by Name:  </label>
      <input type='text' name='launchSearch' placeholder='Filter missions by name' onChange={handleMissionSearch} className='rounded-lg border-b-2 border-gray-200 ml-1.5'/>
      <p> Your Input: {searchName ? searchName : " Nothing yet..."} </p>
      {launchData && rocketData ? 
      ( 
        filteredLaunchData.length === 0 ? (
          <section> 
            <h1> Sorry, there's no info to show. Please change your search query</h1> 
            <img src='https://www.kapwing.com/explore/crying-cat-meme-template' width={"300px"} />
          </section>
        ) :
        (
          <section className='flex justify-between'> 
            <section>
              <LaunchCardList filteredLaunchData={filteredLaunchData} />
            </section>
            <section>
              <RocketInfo rocketData={rocketData}/>
            </section>
          </section>
        )
      ) : <p> Space X Data is loading... </p>}

    </main>
  )
}

export default App
