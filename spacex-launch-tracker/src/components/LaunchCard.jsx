
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
            <article className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2 group-hover:bg-white/15">
                {backgroundImage && (
                    <div className="relative">
                        <div
                            className="h-48 bg-cover bg-center"
                            style={{ backgroundImage: `url(${backgroundImage})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        
                        {/* Flight number overlay */}
                        <div className="absolute top-4 right-4">
                            <span className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-3 py-1 rounded-full text-sm font-bold">
                                #{flight_number}
                            </span>
                        </div>
                    </div>
                )}
                
                <div className="p-6">
                    <div className="mb-6">
                        <h3 className="text-xl md:text-2xl font-bold text-white leading-tight group-hover:text-blue-200 transition-colors duration-300 mb-2">
                            {name}
                        </h3>
                        {!backgroundImage && (
                            <span className="bg-blue-500/20 border border-blue-400/30 text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                                Flight #{flight_number}
                            </span>
                        )}
                    </div>
                    
                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-2 border-b border-white/10">
                            <span className="text-sm font-medium text-blue-200">Launch Date:</span>
                            <span className="text-sm font-bold text-white">{formattedDate}</span>
                        </div>
                        
                        <div className="flex justify-between items-center py-2 border-b border-white/10">
                            <span className="text-sm font-medium text-blue-200">Rocket:</span>
                            <span className="text-sm font-bold text-white">{rocketData.name}</span>
                        </div>
                        
                        <div className="flex justify-between items-center py-2">
                            <span className="text-sm font-medium text-blue-200">Mission Status:</span>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold border ${
                                success === null
                                    ? 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30'
                                    : success
                                    ? 'bg-green-500/20 text-green-300 border-green-400/30'
                                    : 'bg-red-500/20 text-red-300 border-red-400/30'
                            }`}>
                                {success === null ? "Pending" : success ? "Success" : "Failed"}
                            </span>
                        </div>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-white/20">
                        <div className="flex items-center justify-between">
                            <span className="text-blue-300 font-medium group-hover:text-blue-200 transition-colors duration-300 flex items-center">
                                View Mission Details
                                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
};
