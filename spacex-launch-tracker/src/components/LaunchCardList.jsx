import { LaunchCard } from "./LaunchCard";

export const LaunchCardList = ({ launchData }) => {
    const successfulLaunches = launchData.filter(launch => launch.success === true);
    const successRate = launchData.length > 0 
        ? Math.round((successfulLaunches.length / launchData.length) * 100)
        : 0;

    return (
        <section className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🛰️</span>
            Mission Database
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{launchData.length}</div>
                <div className="text-sm text-blue-800">Total Missions</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{successfulLaunches.length}</div>
                <div className="text-sm text-green-800">Successful</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
                <div className={`text-2xl font-bold ${
                successRate >= 85 ? 'text-green-600' : successRate >= 70 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                {successRate}%
                </div>
                <div className={`text-sm ${
                successRate >= 85 ? 'text-green-800' : successRate >= 70 ? 'text-yellow-800' : 'text-red-800'
                }`}>
                Success Rate
                </div>
            </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {launchData.map((launch) => (
                <LaunchCard key={launch.id} launch={launch} />
            ))}
        </div>
        </section>
    );
};