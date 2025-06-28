export const RocketInfo = ({rocketData}) => {
    const formatCostValue = (cost) => {
        return Intl.NumberFormat("en-US", {
            style: 'currency', 
            currency: "USD",
            notation: 'compact',
            maximumFractionDigits: 1
        }).format(cost)
    };
    // Safety check 
    if (!rocketData || rocketData.length === 0){
        return null;
    }

    return (
        <section className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-8">
            <div className="mb-6">

                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <span className="mr-2"> 🚀 </span>
                    Rocket Fleet
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                    Active SpaceX rocket information
                </p>
            </div>
            <div className="space-y-4">
                {rocketData.map( rocket => (
                    <div 
                        key={rocket.id} 
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                        <h3 className="font-bold text-lg mb-3 text-gray-900 border-b border-gray-100 pb-2">
                            {rocket.name}
                        </h3>

                        <div className="grid grid-cols-1 gap-2">
                            <InfoRow label="Mass" value={`${rocket.mass.kg.toLocaleString()} kg`} />
                            <InfoRow label="First Flight" value={rocket.first_flight} />
                            <InfoRow label="Cost per Launch" value={formatCostValue(rocket.cost_per_launch)} />
                            <InfoRow
                                label="Status"
                                value={
                                    <span className={`inline-flex item-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                        rocket.active
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-gray-100 text-gray-800'

                                    }`}>
                                {rocket.active ? "Active" : "Inactive"}
                                </span>
                                }
                            />
                        </div>
                    </div>
                ))};
            </div>
        </section>
    );
}

export const InfoRow = ( {label, value} ) => {
    return (
        <div className="flex justify-between items-center py-1">
            <span className="text-sm font-medium text-gray-600">{label}</span>
            <span className="text-sm font-semibold text-gray-900">{value}</span>
        </div>
    )
}
