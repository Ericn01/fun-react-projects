import { createContext, useContext, useEffect, useState } from "react";

const SpaceXContext = createContext();

export const useSpaceX = () => {
    const context = useContext(SpaceXContext);
    if (!context){
        throw new Error("useSpaceX context can only be use within a SpaceXProvider")
    }
    return context;
}

const BASE_URL = 'https://api.spacexdata.com/latest';

export const SpaceXProvider = ({ children }) => {
    const [launchData, setLaunchData] = useState(null);
    const [rocketData, setRocketData] = useState(null);
    const [launchpadData, setLaunchpadData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const [launchesResponse, rocketsResponse, launchpadResponse] = await Promise.all([
                fetch(`${BASE_URL}/launches`),
                fetch(`${BASE_URL}/rockets`),
                fetch(`${BASE_URL}/launchpads`)
            ]);

            if (!launchesResponse.ok || !rocketsResponse.ok || !launchesResponse.ok) {
            throw new Error('Failed to fetch data from SpaceX API');
            }

            const [launchesData, rocketsData, launchpadsData] = await Promise.all([
                launchesResponse.json(),
                rocketsResponse.json(),
                launchpadResponse.json(),
            ]);

            setLaunchData(launchesData);
            setRocketData(rocketsData);
            setLaunchpadData(launchpadsData);
        } catch (error) {
            console.error('Error fetching SpaceX data:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
        };

        fetchData();
    }, []);
    
    const getLaunchSiteById = (launchSiteId) => {
        return launchpadData.find(launchpad => launchpad.id === launchSiteId);
    }

    const getLaunchById = (launchId) => {
        return launchData?.find(launch => launch.id === launchId);
    };

    const getRocketById = (rocketId) => {
        return rocketData?.find(rocket => rocket.id === rocketId);
    };

    const value = {
        launchData,
        rocketData,
        launchpadData,
        isLoading,
        error,
        getLaunchById,
        getRocketById,
        getLaunchSiteById
    };

    return (
        <SpaceXContext.Provider value={value}>
            {children}
        </SpaceXContext.Provider>
    );
};
