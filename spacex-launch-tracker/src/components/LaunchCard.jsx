
import { Link } from "react-router-dom";
import { useSpaceX } from "../context/SpaceXContext";

export const LaunchCard = ({launch}) => {
    const { id, date_utc, name, flight_number, success, rocket, links } = launch;

    const { getRocketById } = useSpaceX();
    const rocketData = getRocketById(rocket);

    const backgroundImage = links?.flickr?.original?.[0] || links?.patch?.small; // Use the patch if no image is available
    const formattedDate = new Date(date_utc).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <Link to={`/launch/${id}`} className="block group">
            <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 group-hover:-translate-y-1">
                {backgroundImage && (
                <div 
                    className="h-48 bg-cover bg-center bg-gray-100"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                />
                )}
                
                <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                    {name}
                    </h3>
                    <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    #{flight_number}
                    </span>
                </div>
                
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">Launch Date:</span>
                        <span className="text-sm font-semibold text-gray-900">{formattedDate}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">Rocket:</span>
                        <span className="text-sm font-semibold text-gray-900">{rocketData.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Mission Status:</span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        success === null
                        ? 'bg-gray-100 text-gray-700'
                        : success
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                        {success === null ? "Pending" : success ? "Success" : "Failed"}
                    </span>
                    </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                    <span className="text-sm text-blue-600 font-medium group-hover:text-blue-800">
                    View Details →
                    </span>
                </div>
                </div>
            </article>
        </Link>
    );
};
