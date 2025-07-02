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
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="mr-2">🛰️</span>
                    Mission Database
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">{launchData.length}</div>
                        <div className="text-sm text-blue-800">Total Missions</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">{successfulLaunches.length}</div>
                        <div className="text-sm text-green-800">Successful</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                        <div className={`text-2xl font-bold ${
                            successRate >= 85 ? 'text-green-600' : successRate >= 70 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                            {successRate}%
                        </div>
                        <div className={`text-sm ${
                            successRate >= 85 ? 'text-green-800' : successRate >= 70 ? 'text-yellow-800' : 'text-red-800'
                        }`}>
                            Success Rate
                        </div>
                    </div>
                </div>
                    
                <div className="w-full flex justify-center mt-4"> 
                    <button 
                        className="rounded-full p-2 flex justify-center items-center cursor-pointer bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 hover:from-slate-800 hover:via-blue-800 hover:to-indigo-800 transition-colors duration-200" 
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
                    hiddenPanel ? "max-h-0 opacity-0" : "max-h-40 opacity-100"
                }`}>
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="text-lg font-semibold text-gray-900">Sort by</h4>
                            {selectedSort && (
                                <button
                                    onClick={toggleSortOrder}
                                    className="flex items-center space-x-1 px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-md transition-colors duration-200"
                                    aria-label={`Sort ${sortOrder === 'asc' ? 'ascending' : 'descending'}`}
                                >
                                    {sortOrder === 'asc' ? (
                                        <ArrowUp className="w-4 h-4" />
                                    ) : (
                                        <ArrowDown className="w-4 h-4" />
                                    )}
                                    <span>{sortOrder === 'asc' ? 'Ascending' : 'Descending'}</span>
                                </button>
                            )}
                        </div>
                        <div className="flex flex-wrap gap-6">
                            <div className="flex items-center space-x-2">
                                <input 
                                    type="radio" 
                                    name="sort-selection" 
                                    id="date-sort" 
                                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 focus:ring-2"
                                    onChange={handleSortData}
                                    checked={selectedSort === 'date-sort'}
                                />
                                <label htmlFor="date-sort" className="text-sm font-medium text-gray-700 cursor-pointer">
                                    Date
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input 
                                    type="radio" 
                                    name="sort-selection" 
                                    id="name-sort" 
                                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 focus:ring-2"
                                    onChange={handleSortData}
                                    checked={selectedSort === 'name-sort'}
                                />
                                <label htmlFor="name-sort" className="text-sm font-medium text-gray-700 cursor-pointer">
                                    Name
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input 
                                    type="radio" 
                                    name="sort-selection" 
                                    id="success-sort" 
                                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 focus:ring-2"
                                    onChange={handleSortData}
                                    checked={selectedSort === 'success-sort'}
                                />
                                <label htmlFor="success-sort" className="text-sm font-medium text-gray-700 cursor-pointer">
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