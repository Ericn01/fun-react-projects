import { LaunchCard } from "./LaunchCard"
export const LaunchCardList = ( {filteredLaunchData} ) => {
    const successRate = filteredLaunchData.length > 0 ? (
                    Math.round(filteredLaunchData.filter(launch => launch.success).length / filteredLaunchData.length * 100)):
                    0;
    return (
        <section className="max-w-4xl mx-auto p-6"> 
            <div className="mb-5">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Launch Data</h1>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-50 rounded-lg p-4 border "> 
                <div className="mb-2 sm:mb-0"> 
                    <span className="text-sm text-gray-600">Showing data from </span>
                    <span className="font-semibold text-gray-900">{filteredLaunchData.length}</span>
                    <span className="text-sm text-gray-600"> {filteredLaunchData.length > 1 ? 'launches' : 'launch'}</span>
                </div>
                <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-2">Success Rate:</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    successRate >= 85 
                        ? 'bg-green-100 text-green-800'
                        : successRate >= 70
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                    {successRate}%
                    </span>
                </div>
            </div>            
            {filteredLaunchData.map((launchInfo) => <LaunchCard filteredLaunchData={launchInfo} key={launchInfo.id}/> )};
        </section>
    )
}