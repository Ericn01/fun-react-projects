import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSpaceX } from '../context/SpaceXContext';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { 
    ArrowLeft, 
    ExternalLink, 
    Calendar, 
    Rocket, 
    Weight, 
    LucideRuler, 
    RulerDimensionLine,
    Fuel,
    Zap,
    Target,
    TrendingUp,
    DollarSign,
    Globe,
    Factory,
    Gauge,
    Flame,
    CircleDot,
    Timer,
    Trophy,
    Activity
} from 'lucide-react';

const RocketDetailPage = () => {
    const { rocketId } = useParams();
    const navigate = useNavigate();
    const { getRocketById, isLoading } = useSpaceX();

    if (isLoading) {
        return <LoadingSpinner />;
    }

    const rocket = getRocketById(rocketId);
    
    if (!rocket) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center px-4">
                <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-12 border border-white/20">
                    <div className="text-8xl mb-6 animate-bounce">🚀</div>
                    <h1 className="text-3xl font-bold text-white mb-4">Rocket Not Found</h1>
                    <p className="text-blue-100 mb-8 text-lg">
                        The rocket you're looking for doesn't exist or has been removed.
                    </p>
                    <Link 
                        to="/" 
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    const heroImage = rocket.flickr_images?.[0];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back Navigation */}
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center text-blue-300 hover:text-white mb-8 transition-all duration-300 group bg-white/10 backdrop-blur-md rounded-lg px-4 py-2 border border-white/20 hover:bg-white/20"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                    Back
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
                                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text">
                                    {rocket.name}
                                </h1>
                                <div className="flex flex-wrap items-center gap-4 text-blue-100">
                                    <span className="text-xl font-medium flex items-center">
                                        <Rocket className="w-5 h-5 mr-2" />
                                        {rocket.type}
                                    </span>
                                    <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border ${
                                        rocket.active
                                            ? 'bg-green-500/20 text-green-300 border-green-400/30'
                                            : 'bg-gray-500/20 text-gray-300 border-gray-400/30'
                                    }`}>
                                        {rocket.active ? "Active" : "Retired"}
                                    </span>
                                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                                        {rocket.success_rate_pct}% Success Rate
                                    </span>
                                </div>
                            </div>
                        </div>

                        {rocket.description && (
                            <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl p-6 border border-blue-400/20 backdrop-blur-sm">
                                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                                    <Target className="w-5 h-5 mr-2 text-blue-400" />
                                    About {rocket.name}
                                </h3>
                                <p className="text-blue-100 leading-relaxed text-lg">{rocket.description}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Basic Information Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">
                    {/* Basic Specifications */}
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                        <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
                            <LucideRuler className="w-6 h-6 mr-3 text-blue-400" />
                            Physical Specifications
                        </h2>
                        
                        <div className="space-y-6">
                            <InfoItem 
                                icon={<LucideRuler className="w-4 h-4" />}
                                label="Height" 
                                value={`${rocket.height.meters} m (${rocket.height.feet} ft)`}
                            />
                            <InfoItem 
                                icon={<RulerDimensionLine className="w-4 h-4" />}
                                label="Diameter" 
                                value={`${rocket.diameter.meters} m (${rocket.diameter.feet} ft)`}
                            />
                            <InfoItem 
                                icon={<Weight className="w-4 h-4" />}
                                label="Mass" 
                                value={`${rocket.mass.kg.toLocaleString()} kg (${rocket.mass.lb.toLocaleString()} lb)`}
                            />
                            <InfoItem 
                                icon={<CircleDot className="w-4 h-4" />}
                                label="Stages" 
                                value={rocket.stages.toString()}
                            />
                            <InfoItem 
                                icon={<Rocket className="w-4 h-4" />}
                                label="Boosters" 
                                value={rocket.boosters.toString()}
                            />
                        </div>
                    </div>

                    {/* Operational Information */}
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                        <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
                            <Activity className="w-6 h-6 mr-3 text-blue-400" />
                            Operational Information
                        </h2>
                        
                        <div className="space-y-6">
                            <InfoItem 
                                icon={<Calendar className="w-4 h-4" />}
                                label="First Flight" 
                                value={rocket.first_flight}
                            />
                            <InfoItem 
                                icon={<Globe className="w-4 h-4" />}
                                label="Country" 
                                value={rocket.country}
                            />
                            <InfoItem 
                                icon={<Factory className="w-4 h-4" />}
                                label="Company" 
                                value={rocket.company}
                            />
                            <InfoItem 
                                icon={<DollarSign className="w-4 h-4" />}
                                label="Cost per Launch" 
                                value={`$${(rocket.cost_per_launch / 1000000).toFixed(1)}M`}
                            />
                            <InfoItem 
                                icon={<Trophy className="w-4 h-4" />}
                                label="Success Rate" 
                                value={`${rocket.success_rate_pct}%`}
                            />
                        </div>
                    </div>
                </div>

                {/* Engine Information */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20 mb-10">
                    <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
                        <Flame className="w-6 h-6 mr-3 text-blue-400" />
                        Engine Specifications
                    </h2>
                    
                    <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-xl p-6 border border-blue-400/20">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="space-y-4">
                                <InfoItem 
                                    icon={<Zap className="w-4 h-4" />}
                                    label="Engine Type" 
                                    value={`${rocket.engines.type} ${rocket.engines.version}`}
                                />
                                <InfoItem 
                                    icon={<CircleDot className="w-4 h-4" />}
                                    label="Number of Engines" 
                                    value={rocket.engines.number.toString()}
                                />
                                <InfoItem 
                                    icon={<Target className="w-4 h-4" />}
                                    label="Layout" 
                                    value={rocket.engines.layout || 'N/A'}
                                />
                            </div>
                            <div className="space-y-4">
                                <InfoItem 
                                    icon={<Gauge className="w-4 h-4" />}
                                    label="Thrust (Sea Level)" 
                                    value={`${rocket.engines.thrust_sea_level.kN.toLocaleString()} kN`}
                                />
                                <InfoItem 
                                    icon={<Gauge className="w-4 h-4" />}
                                    label="Thrust (Vacuum)" 
                                    value={`${rocket.engines.thrust_vacuum.kN.toLocaleString()} kN`}
                                />
                                <InfoItem 
                                    icon={<TrendingUp className="w-4 h-4" />}
                                    label="Thrust to Weight" 
                                    value={rocket.engines.thrust_to_weight.toString()}
                                />
                            </div>
                            <div className="space-y-4">
                                <InfoItem 
                                    icon={<Fuel className="w-4 h-4" />}
                                    label="Propellant 1" 
                                    value={rocket.engines.propellant_1}
                                />
                                <InfoItem 
                                    icon={<Fuel className="w-4 h-4" />}
                                    label="Propellant 2" 
                                    value={rocket.engines.propellant_2}
                                />
                                <InfoItem 
                                    icon={<Activity className="w-4 h-4" />}
                                    label="ISP (Vacuum)" 
                                    value={`${rocket.engines.isp.vacuum}s`}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stage Information */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">
                    {/* First Stage */}
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20">
                        <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
                            <Rocket className="w-6 h-6 mr-3 text-blue-400" />
                            First Stage
                        </h2>
                        
                        <div className="space-y-6">
                            <InfoItem 
                                icon={<Gauge className="w-4 h-4" />}
                                label="Thrust (Sea Level)" 
                                value={`${rocket.first_stage.thrust_sea_level.kN.toLocaleString()} kN`}
                            />
                            <InfoItem 
                                icon={<Gauge className="w-4 h-4" />}
                                label="Thrust (Vacuum)" 
                                value={`${rocket.first_stage.thrust_vacuum.kN.toLocaleString()} kN`}
                            />
                            <InfoItem 
                                icon={<Zap className="w-4 h-4" />}
                                label="Engines" 
                                value={rocket.first_stage.engines.toString()}
                            />
                            <InfoItem 
                                icon={<Fuel className="w-4 h-4" />}
                                label="Fuel Amount" 
                                value={`${rocket.first_stage.fuel_amount_tons} tons`}
                            />
                            <InfoItem 
                                icon={<Timer className="w-4 h-4" />}
                                label="Burn Time" 
                                value={rocket.first_stage.burn_time_sec ? `${rocket.first_stage.burn_time_sec}s` : 'N/A'}
                            />
                            <InfoItem 
                                icon={<Activity className="w-4 h-4" />}
                                label="Reusable" 
                                value={rocket.first_stage.reusable ? 'Yes' : 'No'}
                            />
                        </div>
                    </div>

                    {/* Second Stage */}
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20">
                        <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
                            <Rocket className="w-6 h-6 mr-3 text-blue-400" />
                            Second Stage
                        </h2>
                        
                        <div className="space-y-6">
                            <InfoItem 
                                icon={<Gauge className="w-4 h-4" />}
                                label="Thrust" 
                                value={`${rocket.second_stage.thrust.kN.toLocaleString()} kN`}
                            />
                            <InfoItem 
                                icon={<Zap className="w-4 h-4" />}
                                label="Engines" 
                                value={rocket.second_stage.engines.toString()}
                            />
                            <InfoItem 
                                icon={<Fuel className="w-4 h-4" />}
                                label="Fuel Amount" 
                                value={`${rocket.second_stage.fuel_amount_tons} tons`}
                            />
                            <InfoItem 
                                icon={<Timer className="w-4 h-4" />}
                                label="Burn Time" 
                                value={rocket.second_stage.burn_time_sec ? `${rocket.second_stage.burn_time_sec}s` : 'N/A'}
                            />
                            <InfoItem 
                                icon={<Activity className="w-4 h-4" />}
                                label="Reusable" 
                                value={rocket.second_stage.reusable ? 'Yes' : 'No'}
                            />
                            <InfoItem 
                                icon={<Target className="w-4 h-4" />}
                                label="Payload Option" 
                                value={rocket.second_stage.payloads.option_1}
                            />
                        </div>
                    </div>
                </div>

                {/* Payload Capabilities */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20 mb-10">
                    <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
                        <Target className="w-6 h-6 mr-3 text-blue-400" />
                        Payload Capabilities
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {rocket.payload_weights.map((payload, index) => (
                            <div key={index} className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-xl p-6 border border-blue-400/20 hover:from-blue-500/20 hover:to-indigo-500/20 transition-all duration-300">
                                <h3 className="font-bold text-white mb-4 text-lg">{payload.name}</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between items-center">
                                        <span className="text-blue-200">Mass:</span>
                                        <span className="font-semibold text-white">{payload.kg.toLocaleString()} kg</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-blue-200">Mass (lbs):</span>
                                        <span className="font-semibold text-white">{payload.lb.toLocaleString()} lb</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-blue-200">Orbit:</span>
                                        <span className="font-semibold text-white text-xs">{payload.id.toUpperCase()}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Landing Legs Information */}
                {rocket.landing_legs && (
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20 mb-10">
                        <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
                            <Target className="w-6 h-6 mr-3 text-blue-400" />
                            Landing System
                        </h2>
                        
                        <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-xl p-6 border border-blue-400/20">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InfoItem 
                                    icon={<CircleDot className="w-4 h-4" />}
                                    label="Number of Legs" 
                                    value={rocket.landing_legs.number.toString()}
                                />
                                <InfoItem 
                                    icon={<Weight className="w-4 h-4" />}
                                    label="Material" 
                                    value={rocket.landing_legs.material || 'N/A'}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* External Links */}
                {rocket.wikipedia && (
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20">
                        <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
                            <ExternalLink className="w-6 h-6 mr-3 text-blue-400" />
                            External Links
                        </h2>
                        
                        <div className="flex flex-wrap gap-4">
                            <a
                                href={rocket.wikipedia}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg border border-blue-400/30"
                            >
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Wikipedia
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
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

export default RocketDetailPage;