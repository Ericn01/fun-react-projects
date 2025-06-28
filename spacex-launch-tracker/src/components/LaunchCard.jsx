export const LaunchCard = ({filteredLaunchData}) => {
    const { date_utc, name, flight_number, success, links} = filteredLaunchData;
    const smallBackgroundImage = links.flickr.original[0] || 'white';
    console.log(smallBackgroundImage)
    return (
        <article className={`bg-white bg-[url(${smallBackgroundImage})] 
                            rounded-xl shadow-lg border border-gray-300 p-6 mb-4 hover:shadow-lg transition-shadow duration-200 `} > 

            <div className="space-y-3.5"> 

                <div className="flex items-center"> 
                    <span className="text-sm font-medium text-gray-600 w-32"> Mission Date: </span>
                    <span className="text-sm font-semibold text-gray-900"> {date_utc.split('T')[0]} </span>
                </div>

                <div className="flex items-center"> 
                    <span className="text-sm font-medium text-gray-600 w-32"> Mission Name: </span>
                    <span className="text-sm font-semibold text-gray-900">{name}</span>
                </div>

                <div className="flex items-center"> 
                    <span className="text-sm font-medium text-gray-600 w-32"> Flight number: </span>
                    <span className="text-sm font-semibold text-gray-900"> {flight_number} </span>
                </div>

                <div className="flex items-center"> 
                    <span className="text-sm font-medium text-gray-600 w-32"> Successful Mission: </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        success === null 
                        ? 'bg-gray-100 text-gray-100' 
                        : success 
                        ? 'bg-green-200 text-green-800' 
                        : 'bg-red-200 text-red-800'
                    }`}> {success === null ? "No Info" : success ? "Yes" : "No"}</span>
                </div>
            </div>
        </article>
    );
}