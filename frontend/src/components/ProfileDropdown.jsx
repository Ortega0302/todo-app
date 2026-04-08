import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProfileDropdown({ profile }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-600 hover:border-blue-500 transition focus:outline-none"
            >
                {profile.profileImage ? (
                    <img src={profile.profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                        {profile.displayName?.charAt(0).toUpperCase() || '?'}
                    </div>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 z-50">
                    <div className="px-4 py-3 border-b border-gray-700">
                        <p className="text-sm font-medium text-gray-100">{profile.displayName}</p>
                        <p className="text-xs text-gray-400">{profile.email}</p>
                    </div>
                    <button
                        onClick={() => { navigate('/dashboard'); setIsOpen(false); }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition"
                    >
                        My Todos
                    </button>
                    <button
                        onClick={() => { navigate('/settings'); setIsOpen(false); }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition"
                    >
                        Settings
                    </button>
                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition rounded-b-lg"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}

export default ProfileDropdown;