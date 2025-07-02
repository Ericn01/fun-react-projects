
import { Rocket } from "lucide-react";

export const Header = () => (
    <header className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl m-4 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between py-6 md:py-8">
            <div className="flex items-center space-x-4">
            {/* Enhanced Logo */}
            <div className="relative">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-4 shadow-xl border border-white/20">
                <Rocket className="text-white w-6 h-6 md:w-8 md:h-8" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-orange-400 to-red-500 rounded-full animate-pulse"></div>
            </div>
            
            <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
                    SpaceX Launch Explorer
                </span>
                </h1>
                <p className="text-base md:text-lg text-white/70 mt-1 hidden sm:block font-medium">
                Mission & Rocket Data Dashboard
                </p>
            </div>
            </div>

        
        </div>
        </div>
    </header>
);