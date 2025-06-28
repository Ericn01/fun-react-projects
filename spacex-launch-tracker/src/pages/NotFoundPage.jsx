import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="text-6xl mb-8">🌌</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Lost in Space</h1>
        <p className="text-xl text-gray-600 mb-8">
            The page you're looking for has drifted into the void.
        </p>
        <Link 
            to="/" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-lg"
        >
            Return to Mission Control
        </Link>
        </div>
    );
};

export default NotFoundPage;