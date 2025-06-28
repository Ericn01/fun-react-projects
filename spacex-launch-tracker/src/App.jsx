import { useEffect, useState } from 'react'
import './App.css'
import { LaunchCardList } from './components/LaunchCardList';

function App() {
  const [launchData, setLaunchData] = useState(null); // API
  const [searchName, setSearchName] = useState('');

  useEffect( () => {
    const fetchLaunchData = async () => {
      try{
        const response = await fetch("https://api.spacexdata.com/latest/launches");
        const apiLaunchData = await response.json();
        setLaunchData(apiLaunchData);
      } catch (error) {
        console.error(`An unexpected error occured while fetching the Space X Launch Data`);
      }
    }
    fetchLaunchData();
  }, []); // No dependencies, only runs once on page load. 


  const handleMissionSearch = (e) => {
    const searchValue = e.currentTarget.value.trim().toLowerCase();
    setSearchName(searchValue)
  }


  const filteredLaunchData = launchData?.filter( (launchData) => launchData.name.toLowerCase().includes(searchName));

  return (
    <main>
      <label htmlFor='launchSearch'> Filter Launches by Name </label>
      <input type='text' name='launchSearch' placeholder='Filter missions by name' onChange={handleMissionSearch}/>
      <p> Your Input: {searchName ? searchName : " Nothing yet..."} </p>
      {launchData ? 
      ( 
        filteredLaunchData.length === 0 ? (
          <section> 
            <h1> Sorry, there's no info to show. Please change your search query</h1> 
            <img src='https://www.kapwing.com/explore/crying-cat-meme-template' width={"300px"} />
          </section>
        ) :
        (
          <section>
            <LaunchCardList filteredLaunchData={filteredLaunchData} />
          </section>
        )
      ) : <p> Launch Data is loading... </p>}
    </main>
  )
}

export default App
