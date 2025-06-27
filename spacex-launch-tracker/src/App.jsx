import { useEffect, useState } from 'react'
import './App.css'

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


  return (
    <main>
      <input type='text' placeholder='Filter missions by name' onChange={handleMissionSearch}/>
      <p> {searchName} </p>
      {launchData ? 
      
      ( 

        <section>
          <h1> Showing data from {launchData.length} launches </h1>
          <h3> Launch Success Rate: {(launchData.filter(launch => launch.success).length / launchData.length * 100).toPrecision(2)}%</h3>
            {launchData.filter( (launchData) => launchData.name.toLowerCase().includes(searchName)).map( (launch) => {
              return (
                <ul key={launch.id}>
                  <li> Mission Date: {launch.date_utc.split('T')[0]} </li>
                  <li> Mission Name: {launch.name} </li>
                  <li> Flight number: {launch.flight_number}</li>
                  <li> Successful Mission: {launch.success ? "Yes" : "No"}</li>
                </ul>
              )
            })}
            <li> Mission Name</li>
        </section>
      ) : <p> Launch Data is loading... </p>}
    </main>
  )
}

export default App
