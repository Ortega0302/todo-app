import { Link } from 'react-router-dom';

function LandingPage() {
    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center">
            <h1 className="text-5xl font-bold mb-4">Todo App</h1>
            <p className="text-gray-400 text-lg mb-8">Stay organized. Get things done.</p>
            <div className="flex gap-4">
                <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded px-6 py-3 transition">
                    Login
                </Link>
                <Link to="/register" className="bg-gray-700 hover:bg-gray-600 text-white font-medium rounded px-6 py-3 transition">
                    Sign Up
                </Link>
            </div>
        </div>
    );
}

export default LandingPage;