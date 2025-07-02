import { useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, ChevronRight } from "lucide-react";

export const RocketInfo = ({ rocketData }) => {
    const formatCostValue = (cost) => {
        return Intl.NumberFormat("en-US", {
        style: 'currency',
        currency: "USD",
        notation: 'compact',
        maximumFractionDigits: 1
        }).format(cost);
    };

    // Safety check
    if (!rocketData || rocketData.length === 0) {
        return null;
    }

    const [displayInactive, setDisplayInactive] = useState(false);
    const filteredRocketData = displayInactive ? rocketData : rocketData.filter(rocket => rocket.active);

    const activeCount = rocketData.filter(rocket => rocket.active).length;
    const totalCount = rocketData.length;

    return (
        <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 p-6 md:p-8">
        {/* Header */}
        <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center">
            <span className="mr-3 text-3xl">🚀</span>
            <span className="bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">
                Rocket Fleet
            </span>
            </h2>
            <p className="text-white/70 text-sm">
            {displayInactive ? "All" : "Active"} SpaceX rocket information - click any rocket for details
            </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-orange-500/20 backdrop-blur-sm rounded-2xl p-4 text-center border border-orange-400/30">
            <div className="text-2xl md:text-3xl font-bold text-orange-200">{activeCount}</div>
            <div className="text-sm text-orange-300 font-medium">Active Rockets</div>
            </div>
            <div className="bg-blue-500/20 backdrop-blur-sm rounded-2xl p-4 text-center border border-blue-400/30">
            <div className="text-2xl md:text-3xl font-bold text-blue-200">{totalCount}</div>
            <div className="text-sm text-blue-300 font-medium">Total Fleet</div>
            </div>
        </div>

        {/* Enhanced Toggle */}
        <div className="mb-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
            <label className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center space-x-3">
                <div className="relative">
                    <input
                    type="checkbox"
                    checked={displayInactive}
                    onChange={() => setDisplayInactive(!displayInactive)}
                    className="sr-only"
                    />
                    <div className={`w-12 h-6 rounded-full transition-all duration-300 ${
                    displayInactive 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                        : 'bg-white/20'
                    }`}>
                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                        displayInactive ? 'translate-x-6' : 'translate-x-0'
                    }`}></div>
                    </div>
                </div>
                <div>
                    <div className="text-white font-medium">
                    {displayInactive ? "Show All Rockets" : "Show Active Only"}
                    </div>
                    <div className="text-white/60 text-sm">
                    {displayInactive 
                        ? `Viewing all ${totalCount} rockets` 
                        : `Viewing ${activeCount} active rockets`
                    }
                    </div>
                </div>
                </div>
                <ChevronRight className={`w-5 h-5 text-white/40 transition-transform duration-300 ${
                displayInactive ? 'rotate-90' : ''
                }`} />
            </label>
            </div>
        </div>

        {/* Rocket List */}
        <div className="space-y-4">
            {filteredRocketData.map(rocket => (
            <Link
                key={rocket.id}
                to={`/rockets/${rocket.id}`}
                className="block group"
            >
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 
                            hover:bg-white/10 hover:border-white/20 transition-all duration-300 
                            transform hover:-translate-y-1 hover:shadow-lg">
                {/* Rocket Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                    <div className="text-2xl">🚀</div>
                    <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-blue-200 transition-colors">
                        {rocket.name}
                        </h3>
                        <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            rocket.active 
                            ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                            : 'bg-red-500/20 text-red-300 border border-red-500/30'
                        }`}>
                            {rocket.active ? "Active" : "Inactive"}
                        </span>
                        </div>
                    </div>
                    </div>
                    <div className="flex items-center space-x-2 text-white/60 group-hover:text-white/80 transition-colors">
                    <span className="text-sm font-medium">View Details</span>
                    <ExternalLink className="w-4 h-4" />
                    </div>
                </div>

                {/* Rocket Stats */}
                <div className="grid grid-cols-2 gap-3">
                    <InfoRow label="Height" value={`${rocket.height?.meters || 'N/A'} m`} />
                    <InfoRow label="Mass" value={`${rocket.mass?.kg ? Math.round((rocket.mass.kg / 1000)).toLocaleString() : 'N/A'} tons`} />
                    <InfoRow label="Stages" value={rocket.stages || 'N/A'} />
                    <InfoRow label="Cost" value={rocket.cost_per_launch ? formatCostValue(rocket.cost_per_launch) : 'N/A'} />
                </div>

                
                </div>
            </Link>
            ))}
        </div>

        {/* No Results State */}
        {filteredRocketData.length === 0 && (
            <div className="text-center py-8">
            <div className="text-4xl mb-2">🔍</div>
            <div className="text-white/60">No rockets match your current filter</div>
            </div>
        )}
        </div>
    );
};

export const InfoRow = ({ label, value }) => {
    return (
        <div className="bg-white/5 rounded-xl p-3 border border-white/5">
        <div className="text-white/60 text-xs font-medium uppercase tracking-wide mb-1">
            {label}
        </div>
        <div className="text-white font-semibold">
            {value}
        </div>
        </div>
    );
};