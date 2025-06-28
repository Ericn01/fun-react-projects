import { InfoRow } from "./RocketInfo";
export const LaunchCard = ({launch}) => {
    const { date_utc, name, flight_number, success, links} = launch;
    const backgroundImage = links?.flickr?.original?.[0];
    const formattedDate = new Date(date_utc).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    return (
        <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 hover:-translate-y-1">
        {backgroundImage && (
            <div 
            className="h-48 bg-cover bg-center bg-gray-100"
            style={{ backgroundImage: `url(${backgroundImage})` }}
            />
        )}
        
        <div className="p-6">
            <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-gray-900 leading-tight">
                {name}
            </h3>
            <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                #{flight_number}
            </span>
            </div>
            
            <div className="space-y-3">
            <InfoRow label="Launch Date" value={formattedDate} />
            <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Mission Status:</span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                success === null
                    ? 'bg-gray-100 text-gray-700'
                    : success
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                {success === null ? "Pending" : success ? "Success" : "Failed"}
                </span>
            </div>
            </div>
        </div>
        </article>
    );
}