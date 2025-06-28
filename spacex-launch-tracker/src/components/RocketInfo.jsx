export const RocketInfo = ({rocketData}) => {
    const formatCostValue = (cost) => {
        return Intl.NumberFormat("en-US", {style: 'currency', currency: "USD"}).format(cost)
    }
    return (
        <section className="rounded-xl drop-shadow-xl bg-white p-3.5">
            <div className="mb-5">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Rocket Data</h1>
            </div>
            {rocketData.map( rocket => {
                return (
                    <div className="my-3 border-2 border-black p-3 text-left m-3">
                        <h3 className="font-bold text-xl mb-2"> {rocket.name} Basic Info </h3>
                        <div className="flex items-center"> 
                            <span className="text-sm font-medium text-gray-600 w-32 mb-1"> Mass:  </span>
                            <span className="text-sm font-semibold text-gray-900"> {rocket.mass.kg.toLocaleString()}kg </span>
                        </div>
                        <div className="flex items-center"> 
                            <span className="text-sm font-medium text-gray-600 w-32 mb-1"> First flight: </span>
                            <span className="text-sm font-semibold text-gray-900"> {rocket.first_flight} </span>
                        </div>
                        <div className="flex items-center"> 
                            <span className="text-sm font-medium text-gray-600 w-32 mb-1"> Cost per Launch: </span>
                            <span className="text-sm font-semibold text-gray-900"> {formatCostValue(rocket.cost_per_launch)} </span>
                        </div>
                        <div className="flex items-center"> 
                            <span className="text-sm font-medium text-gray-600 w-32 mb-1"> Active:  </span>
                            <span className="text-sm font-semibold text-gray-900"> {rocket.active ? "Yes" : "No"} </span>
                        </div>
                    </div>
                );
            })}
        </section>
    );
}