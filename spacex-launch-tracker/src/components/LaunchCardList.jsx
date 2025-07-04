import { ChevronDown, ChevronUp, ArrowUp, ArrowDown } from "lucide-react";
import { LaunchCard } from "./LaunchCard";
import { useState, useEffect } from "react";

export const LaunchCardList = ({ launchData }) => {
    const successfulLaunches = launchData.filter(launch => launch.success === true);
    const successRate = launchData.length > 0 
        ? Math.round((successfulLaunches.length / launchData.length) * 100)
        : 0;

    const [sortedLaunchData, setSortedLaunchData] = useState(launchData);
    const [hiddenPanel, setHiddenPanel] = useState(true);
    const [selectedSort, setSelectedSort] = useState('');
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

    useEffect(() => {
        setSortedLaunchData(launchData);
    }, [launchData]);

    const handleSortData = (e) => {
        const key = e.currentTarget.id;
        setSelectedSort(key);

        let sortedData = [...sortedLaunchData];

        if (key === 'date-sort') {
            sortedData.sort((a, b) => {
                const dateA = new Date(a.date_utc);
                const dateB = new Date(b.date_utc);
                return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
            });
        }
        if (key === 'name-sort') {
            sortedData.sort((a, b) => {
                const comparison = a.name.localeCompare(b.name);
                return sortOrder === 'asc' ? comparison : -comparison;
            });
        }
        if (key === 'success-sort') {
            sortedData.sort((a, b) => {
                if (sortOrder === 'asc') {
                    return a.success - b.success; // false (0) first, then true (1)
                } else {
                    return b.success - a.success; // true (1) first, then false (0)
                }
            });
        }

        setSortedLaunchData(sortedData);
    };

    const toggleSortOrder = () => {
        const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newOrder);
        
        // Re-apply current sort with new order
        if (selectedSort) {
            const event = { currentTarget: { id: selectedSort } };
            // Temporarily set the new order for the sort function
            const tempOrder = newOrder;
            
            let sortedData = [...sortedLaunchData];
            
            if (selectedSort === 'date-sort') {
                sortedData.sort((a, b) => {
                    const dateA = new Date(a.date_utc);
                    const dateB = new Date(b.date_utc);
                    return tempOrder === 'asc' ? dateA - dateB : dateB - dateA;
                });
            }
            if (selectedSort === 'name-sort') {
                sortedData.sort((a, b) => {
                    const comparison = a.name.localeCompare(b.name);
                    return tempOrder === 'asc' ? comparison : -comparison;
                });
            }
            if (selectedSort === 'success-sort') {
                sortedData.sort((a, b) => {
                    if (tempOrder === 'asc') {
                        return a.success - b.success;
                    } else {
                        return b.success - a.success;
                    }
                });
            }
            
            setSortedLaunchData(sortedData);
        }
    };

    return (
        <section className="space-y-6">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                    <span className="mr-3 text-3xl">🛰️</span>
                    <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                        Mission Database
                    </span>
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-500/20 backdrop-blur-sm rounded-2xl p-4 text-center border border-blue-400/30">
                        <div className="text-2xl md:text-3xl font-bold text-blue-200">{launchData.length}</div>
                        <div className="text-sm text-blue-300 font-medium">Total Missions</div>
                    </div>
                    <div className="bg-green-500/20 backdrop-blur-sm rounded-2xl p-4 text-center border border-green-400/30">
                        <div className="text-2xl md:text-3xl font-bold text-green-200">{successfulLaunches.length}</div>
                        <div className="text-sm text-green-300 font-medium">Successful</div>
                    </div>
                    <div className="bg-purple-500/20 backdrop-blur-sm rounded-2xl p-4 text-center border border-purple-400/30">
                        <div className={`text-2xl md:text-3xl font-bold ${
                            successRate >= 85 ? 'text-green-200' : successRate >= 70 ? 'text-yellow-200' : 'text-red-200'
                        }`}>
                            {successRate}%
                        </div>
                        <div className={`text-sm font-medium ${
                            successRate >= 85 ? 'text-green-300' : successRate >= 70 ? 'text-yellow-300' : 'text-red-300'
                        }`}>
                            Success Rate
                        </div>
                    </div>
                </div>
                    
                <div className="w-full flex justify-center mb-4"> 
                    <button 
                        className="rounded-full p-3 flex justify-center items-center cursor-pointer bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border border-white/20" 
                        onClick={() => setHiddenPanel(!hiddenPanel)}
                        aria-label={hiddenPanel ? "Show sort options" : "Hide sort options"}
                    > 
                        {hiddenPanel ? 
                            (<ChevronDown className="text-white w-5 h-5" />) 
                            : 
                            (<ChevronUp className="text-white w-5 h-5" />)
                        }
                    </button>
                </div>
                
                {/* Sort Panel */}
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    /* hiddenPanel ? "max-h-0 opacity-0" : "max-h-40 opacity-100" --> might just be a better idea to always show the sorting button */
                ""}`}>
                    <div className="mt-4 p-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl border border-blue-400/20 backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-semibold text-white">Sort by</h4>
                            {selectedSort && (
                                <button
                                    onClick={toggleSortOrder}
                                    className="flex items-center space-x-2 px-4 py-2 text-sm bg-white/10 hover:bg-white/20 text-blue-200 rounded-lg transition-all duration-300 border border-white/20 backdrop-blur-sm"
                                    aria-label={`Sort ${sortOrder === 'asc' ? 'ascending' : 'descending'}`}
                                >
                                    {sortOrder === 'asc' ? (
                                        <ArrowUp className="w-4 h-4" />
                                    ) : (
                                        <ArrowDown className="w-4 h-4" />
                                    )}
                                    <span className="font-medium">{sortOrder === 'asc' ? 'Ascending' : 'Descending'}</span>
                                </button>
                            )}
                        </div>
                        <div className="flex flex-wrap gap-6">
                            <div className="flex items-center space-x-2">
                                <input 
                                    type="radio" 
                                    name="sort-selection" 
                                    id="date-sort" 
                                    className="w-4 h-4 text-blue-400 focus:ring-blue-400 focus:ring-2 bg-white/10 border-white/30"
                                    onChange={handleSortData}
                                    checked={selectedSort === 'date-sort'}
                                />
                                <label htmlFor="date-sort" className="text-sm font-medium text-blue-100 cursor-pointer hover:text-white transition-colors duration-200">
                                    Date
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input 
                                    type="radio" 
                                    name="sort-selection" 
                                    id="name-sort" 
                                    className="w-4 h-4 text-blue-400 focus:ring-blue-400 focus:ring-2 bg-white/10 border-white/30"
                                    onChange={handleSortData}
                                    checked={selectedSort === 'name-sort'}
                                />
                                <label htmlFor="name-sort" className="text-sm font-medium text-blue-100 cursor-pointer hover:text-white transition-colors duration-200">
                                    Name
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input 
                                    type="radio" 
                                    name="sort-selection" 
                                    id="success-sort" 
                                    className="w-4 h-4 text-blue-400 focus:ring-blue-400 focus:ring-2 bg-white/10 border-white/30"
                                    onChange={handleSortData}
                                    checked={selectedSort === 'success-sort'}
                                />
                                <label htmlFor="success-sort" className="text-sm font-medium text-blue-100 cursor-pointer hover:text-white transition-colors duration-200">
                                    Success
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sortedLaunchData.map((launch) => (
                    <LaunchCard key={launch.id} launch={launch} />
                ))}
            </div>
        </section>
    );
};