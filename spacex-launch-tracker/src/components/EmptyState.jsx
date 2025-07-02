import { Search, AlertCircle, RefreshCw, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

export const EmptyState = ({ searchQuery }) => {
    const searchRecommendations = ["Starlink", "CRS", "Satellite", "Falcon", "COTS", "SES", "Iridium"];
    const randomRecommendation = searchRecommendations[Math.floor(Math.random() * searchRecommendations.length)];

    return (
        <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12">
        <div className="text-center max-w-md mx-auto">
            {/* Animated Icon */}
            <div className="relative mb-6">
            <div className="text-6xl mb-4 relative">
                <Search className="w-16 h-16 text-white/40 mx-auto" />
                <div className="absolute inset-0 w-16 h-16 mx-auto">
                <div className="w-full h-full border-2 border-blue-400/30 rounded-full animate-ping"></div>
                </div>
            </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-white mb-3">
            <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                No missions found
            </span>
            </h3>

            {/* Description */}
            <p className="text-white/70 mb-6 leading-relaxed">
            Sorry, we couldn't find any launches matching 
            <span className="text-blue-300 font-medium"> "{searchQuery}"</span>. 
            Try a different search term or explore our suggestions below.
            </p>

            {/* Enhanced Tip Section */}
            <div className="bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-2xl p-5">
            <div className="flex items-start space-x-3">
                <div className="bg-blue-400/30 rounded-full p-2 mt-0.5">
                <AlertCircle className="w-4 h-4 text-blue-200" />
                </div>
                <div className="text-left">
                <div className="text-blue-200 font-semibold mb-1">Search Tip</div>
                <div className="text-blue-300/90 text-sm">
                    Try searching for missions like 
                    <span className="inline-flex items-center bg-blue-400/20 rounded-lg px-2 py-1 mx-1 text-blue-200 font-medium">
                    {randomRecommendation}
                    </span>
                    or browse all missions below.
                </div>
                </div>
            </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <button 
                onClick={() => window.location.reload()} 
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 
                        hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-3 rounded-xl 
                        transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg
                        border border-white/20"
            >
                <RefreshCw className="w-4 h-4" />
                <span>Try Again</span>
            </button>
            <Link 
                to="/"
                className="flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 
                        text-white px-6 py-3 rounded-xl transition-all duration-300 
                        transform hover:-translate-y-0.5 border border-white/20"
            >
                <Rocket className="w-4 h-4" />
                <span>View All</span>
            </Link>
            </div>
        </div>
        </div>
    );
};