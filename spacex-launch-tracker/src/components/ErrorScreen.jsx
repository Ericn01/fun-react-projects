import { Link } from "react-router-dom";
import { RefreshCw, AlertCircle, Rocket } from "lucide-react";

export const ErrorScreen = ({ error }) => {
    return (
        <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12">
            <div className="text-center max-w-md mx-auto">
                {/* Error Animation */}
                <div className="relative mb-6">
                <div className="bg-red-500/20 backdrop-blur-sm rounded-full p-6 mx-auto w-fit border border-red-400/30">
                    <AlertCircle className="w-12 h-12 text-red-300" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 border-2 border-red-400/20 rounded-full animate-pulse"></div>
                </div>
                </div>

                {/* Error Title */}
                <h3 className="text-2xl font-bold text-white mb-3">
                <span className="bg-gradient-to-r from-red-200 to-orange-200 bg-clip-text text-transparent">
                    Something went wrong
                </span>
                </h3>

                {/* Error Message */}
                <div className="bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-2xl p-4 mb-6">
                <p className="text-red-300 text-sm font-medium">
                    {error || "An unexpected error occurred while loading the data."}
                </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link 
                    to="/"
                    className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 
                            hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-3 rounded-xl 
                            transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg
                            border border-white/20"
                >
                    <Rocket className="w-4 h-4" />
                    <span>Return Home</span>
                </Link>
                <button 
                    onClick={() => window.location.reload()} 
                    className="flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 
                            text-white px-6 py-3 rounded-xl transition-all duration-300 
                            transform hover:-translate-y-0.5 border border-white/20"
                >
                    <RefreshCw className="w-4 h-4" />
                    <span>Try Again</span>
                </button>
                </div>
            </div>
        </div>
    );
};