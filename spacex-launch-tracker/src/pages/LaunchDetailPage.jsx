import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSpaceX } from '../context/SpaceXContext';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ArrowLeft, ExternalLink, Calendar, Target, Rocket, House, MapPin, Clock, Gauge } from 'lucide-react';

const LaunchDetailPage = () => {
    const { launchId } = useParams();
    const navigate = useNavigate();
    const { getLaunchById, getRocketById, getLaunchSiteById, isLoading } = useSpaceX();

    if (isLoading) {
        return <LoadingSpinner />;
    }

    const launch = getLaunchById(launchId);
    
    if (!launch) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center px-4">
                <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-12 border border-white/20">
                    <div className="text-8xl mb-6 animate-bounce">🚀</div>
                    <h1 className="text-3xl font-bold text-white mb-4">Launch Not Found</h1>
                    <p className="text-blue-100 mb-8 text-lg">
                        The launch you're looking for doesn't exist or has been removed.
                    </p>
                    <Link 
                        to="/" 
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Missions
                    </Link>
                </div>
            </div>
        );
    }

    const rocket = getRocketById(launch.rocket);
    const launchSite = getLaunchSiteById(launch.launchpad);

    const launchDate = new Date(launch.date_utc);
    const heroImage = launch.links?.flickr?.original?.[0] || launch.links?.patch?.large;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
            {/* Background Pattern */}
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back Navigation */}
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center text-blue-300 hover:text-white mb-8 transition-all duration-300 group bg-white/10 backdrop-blur-md rounded-lg px-4 py-2 border border-white/20 hover:bg-white/20"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                    Back to Missions
                </button>

                {/* Hero Section */}
                <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden mb-10 border border-white/20">
                    {heroImage && (
                        <div className="relative">
                            <div 
                                className="h-72 md:h-96 bg-cover bg-center"
                                style={{ backgroundImage: `url(${heroImage})` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        </div>
                    )}
                    
                    <div className="p-8 md:p-10">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-8">
                            <div className="mb-6 lg:mb-0">
                                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text ">
                                    {launch.name}
                                </h1>
                                <div className="flex flex-wrap items-center gap-4 text-blue-100">
                                    <span className="text-xl font-medium flex items-center">
                                        <Rocket className="w-5 h-5 mr-2" />
                                        Flight #{launch.flight_number}
                                    </span>
                                    <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border ${
                                        launch.success === null
                                            ? 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30'
                                            : launch.success
                                            ? 'bg-green-500/20 text-green-300 border-green-400/30'
                                            : 'bg-red-500/20 text-red-300 border-red-400/30'
                                    }`}>
                                        {launch.success === null ? "Pending" : launch.success ? "Success" : "Failed"}
                                    </span>
                                </div>
                            </div>
                            
                            {launch.links?.patch?.large && (
                                <div className="relative">
                                    <img 
                                        src={launch.links.patch.large} 
                                        alt={`${launch.name} mission patch`}
                                        className="w-28 h-28 object-contain rounded-2xl bg-white/10 p-2 border border-white/20 shadow-xl"
                                    />
                                </div>
                            )}
                        </div>

                        {launch.details && (
                            <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl p-6 border border-blue-400/20 backdrop-blur-sm">
                                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                                    <Target className="w-5 h-5 mr-2 text-blue-400" />
                                    Mission Details
                                </h3>
                                <p className="text-blue-100 leading-relaxed text-lg">{launch.details}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mission Info Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">
                    {/* Launch Information */}
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                        <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
                            <Calendar className="w-6 h-6 mr-3 text-blue-400" />
                            Launch Information
                        </h2>
                        
                        <div className="space-y-6">
                            <InfoItem 
                                icon={<Calendar className="w-4 h-4" />}
                                label="Launch Date" 
                                value={launchDate.toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            />
                            <InfoItem 
                                icon={<Clock className="w-4 h-4" />}
                                label="Launch Time" 
                                value={launchDate.toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    timeZoneName: 'short'
                                })}
                            />
                            <InfoItem 
                                icon={<MapPin className="w-4 h-4" />}
                                label="Launch Site" 
                                value={launchSite?.full_name || 'Information not available'}
                            />
                            {launch.static_fire_date_utc && (
                                <InfoItem 
                                    icon={<Target className="w-4 h-4" />}
                                    label="Static Fire Test" 
                                    value={new Date(launch.static_fire_date_utc).toLocaleDateString()}
                                />
                            )}
                        </div>
                    </div>

                    {/* Rocket Information */}
                    {rocket && (
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                            <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
                                <Rocket className="w-6 h-6 mr-3 text-blue-400" />
                                Rocket: {rocket.name}
                            </h2>
                            
                            <div className="space-y-6">
                                <InfoItem 
                                    icon={<Gauge className="w-4 h-4" />}
                                    label="Height" 
                                    value={`${rocket.height.meters} m (${rocket.height.feet} ft)`}
                                />
                                <InfoItem 
                                    icon={<Gauge className="w-4 h-4" />}
                                    label="Diameter" 
                                    value={`${rocket.diameter.meters} m (${rocket.diameter.feet} ft)`}
                                />
                                <InfoItem 
                                    icon={<Gauge className="w-4 h-4" />}
                                    label="Mass" 
                                    value={`${rocket.mass.kg.toLocaleString()} kg`}
                                />
                                <InfoItem 
                                    icon={<Calendar className="w-4 h-4" />}
                                    label="First Flight" 
                                    value={rocket.first_flight}
                                />
                            </div>
                        </div>
                    )}
                </div>

                 {/* Launch Site Information */}
                {launchSite && (
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20 mb-10">
                        <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
                            <House className="w-6 h-6 mr-3 text-blue-400" />
                            Launch Site Information
                        </h2>
                        
                        <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-xl p-6 border border-blue-400/20">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-blue-200 font-medium">Name:</span>
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-white">{launchSite.name}</span>
                                            <span className={`h-3 w-3 rounded-full ${
                                                launchSite.status === 'retired' ? 'bg-red-400' : 'bg-green-400'
                                            }`}></span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-blue-200 font-medium">Location:</span>
                                        <span className="font-semibold text-white">{`${launchSite.locality}, ${launchSite.region}`}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-blue-200 font-medium">Launches:</span>
                                        <span className="font-semibold text-white">{launchSite.launches.length}</span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-blue-200 font-medium">Coordinates:</span>
                                        <span className="font-semibold text-white text-sm">{`${launchSite.latitude}°, ${launchSite.longitude}°`}</span>
                                    </div>
                                    {launchSite.details && (
                                        <div>
                                            <span className="text-blue-200 font-medium block mb-2">Details:</span>
                                            <p className="font-medium text-white text-sm leading-relaxed">{launchSite.details}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Cores Information */}
                {launch.cores && launch.cores.length > 0 && (
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20 mb-10">
                        <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
                            <Target className="w-6 h-6 mr-3 text-blue-400" />
                            Core Information
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {launch.cores.map((core, index) => (
                                <div key={index} className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-xl p-6 border border-blue-400/20 hover:from-blue-500/20 hover:to-indigo-500/20 transition-all duration-300">
                                    <h3 className="font-bold text-white mb-4 text-lg">Core {index + 1}</h3>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between items-center">
                                            <span className="text-blue-200">Flight:</span>
                                            <span className="font-semibold text-white">{core.flight || 'N/A'}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-blue-200">Reused:</span>
                                            <span className={`font-semibold ${core.reused ? 'text-green-400' : 'text-gray-300'}`}>
                                                {core.reused ? 'Yes' : 'No'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-blue-200">Landing:</span>
                                            <span className={`font-semibold ${
                                                core.landing_success === null ? 'text-gray-400' :
                                                core.landing_success ? 'text-green-400' : 'text-red-400'
                                            }`}>
                                                {core.landing_success === null ? 'N/A' : 
                                                core.landing_success ? 'Success' : 'Failed'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}


                {/* Links Section */}
                {(launch.links?.webcast || launch.links?.wikipedia || launch.links?.article) && (
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20">
                        <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
                            <ExternalLink className="w-6 h-6 mr-3 text-blue-400" />
                            External Links
                        </h2>
                        
                        <div className="flex flex-wrap gap-4">
                            {launch.links.webcast && (
                                <a
                                    href={launch.links.webcast}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg border border-red-400/30"
                                >
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    Watch Launch
                                </a>
                            )}
                            {launch.links.wikipedia && (
                                <a
                                    href={launch.links.wikipedia}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg border border-blue-400/30"
                                >
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    Wikipedia
                                </a>
                            )}
                            {launch.links.article && (
                                <a
                                    href={launch.links.article}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg border border-gray-500/30"
                                >
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    Article
                                </a>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
};

const InfoItem = ({ icon, label, value }) => (
    <div className="flex justify-between items-center py-3 border-b border-white/10 last:border-b-0 group">
        <div className="flex items-center">
            <span className="text-blue-400 mr-2">{icon}</span>
            <span className="text-blue-200 font-medium">{label}:</span>
        </div>
        <span className="text-white font-semibold text-right group-hover:text-blue-200 transition-colors duration-300">{value}</span>
    </div>
);

export default LaunchDetailPage;