import { LaunchCardList } from "./LaunchCardList";
import { RocketInfo } from "./RocketInfo";

// Contains the overview data that you see on the home page.
export const MainOverview = ({filteredLaunchData, rocketData}) => {
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
}