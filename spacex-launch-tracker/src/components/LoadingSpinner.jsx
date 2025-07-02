import { Rocket } from "lucide-react";

export const LoadingSpinner = ({ message = "Loading mission data..." }) => {
    return (
        <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12">
        <div className="text-center max-w-md mx-auto">
            {/* Animated Loading */}
            <div className="relative mb-6">
            <div className="bg-blue-500/20 backdrop-blur-sm rounded-full p-6 mx-auto w-fit border border-blue-400/30">
                <Rocket className="w-12 h-12 text-blue-300 animate-bounce" />
            </div>
            
            {/* Orbital Rings */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 border-2 border-blue-400/30 rounded-full animate-spin"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 border border-blue-400/20 rounded-full animate-ping"></div>
            </div>
            </div>

            {/* Loading Text */}
            <h3 className="text-xl font-bold text-white mb-2">
            <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Preparing for Launch
            </span>
            </h3>
            <p className="text-white/70 text-sm">
            {message}
            </p>

            {/* Progress Dots */}
            <div className="flex justify-center space-x-2 mt-4">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
        </div>
        </div>
    );
};

// CSS animations are really out of this world... no need for advanced JS to make a spinner, just a few lines of CSS and BOOM you're done!