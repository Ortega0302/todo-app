import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cropper from 'react-easy-crop';
import ProfileDropdown from '../components/ProfileDropdown';

function SettingsPage() {
    const [profile, setProfile] = useState({ displayName: '', email: '', profileImage: '' });
    const [displayName, setDisplayName] = useState('');
    const [message, setMessage] = useState('');
    const [imageToCrop, setImageToCrop] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const authHeader = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const fetchProfile = () => {
        axios.get('http://localhost:8080/api/user/profile', authHeader)
            .then(response => {
                setProfile(response.data);
                setDisplayName(response.data.displayName);
            })
            .catch(error => console.error('Error fetching profile:', error));
    };

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
        fetchProfile();
    }, []);

    const handleSave = () => {
        axios.put('http://localhost:8080/api/user/profile', { displayName }, authHeader)
            .then(() => {
                setMessage('Profile updated!');
                fetchProfile();
                setTimeout(() => setMessage(''), 3000);
            })
            .catch(error => console.error('Error updating profile:', error));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageToCrop(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const getCroppedImage = async () => {
        const image = new Image();
        image.src = imageToCrop;

        await new Promise((resolve) => {
            image.onload = resolve;
        });

        const canvas = document.createElement('canvas');
        const size = 300;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            croppedAreaPixels.x,
            croppedAreaPixels.y,
            croppedAreaPixels.width,
            croppedAreaPixels.height,
            0,
            0,
            size,
            size
        );

        return canvas.toDataURL('image/jpeg', 0.8);
    };

    const handleSaveCrop = async () => {
        const croppedBase64 = await getCroppedImage();
        axios.put('http://localhost:8080/api/user/profile', { profileImage: croppedBase64 }, authHeader)
            .then(() => {
                setImageToCrop(null);
                fetchProfile();
                setMessage('Profile picture updated!');
                setTimeout(() => setMessage(''), 3000);
            })
            .catch(error => console.error('Error uploading image:', error));
    };

    const handleCancelCrop = () => {
        setImageToCrop(null);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
            <div className="max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold">Settings</h1>
                    <ProfileDropdown profile={profile} />
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                    {message && <p className="text-green-400 text-sm mb-4">{message}</p>}

                    {imageToCrop ? (
                        <div className="mb-6">
                            <div className="relative w-full h-80 bg-gray-900 rounded-lg overflow-hidden">
                                <Cropper
                                    image={imageToCrop}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={1}
                                    cropShape="round"
                                    onCropChange={setCrop}
                                    onZoomChange={setZoom}
                                    onCropComplete={onCropComplete}
                                />
                            </div>
                            <div className="flex items-center gap-4 mt-4">
                                <label className="text-sm text-gray-400">Zoom:</label>
                                <input
                                    type="range"
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    value={zoom}
                                    onChange={(e) => setZoom(Number(e.target.value))}
                                    className="flex-1"
                                />
                            </div>
                            <div className="flex gap-4 mt-4 justify-center">
                                <button
                                    onClick={handleSaveCrop}
                                    className="bg-green-600 hover:bg-green-700 text-white font-medium rounded px-6 py-2 transition"
                                >
                                    Save Crop
                                </button>
                                <button
                                    onClick={handleCancelCrop}
                                    className="bg-gray-500 hover:bg-gray-600 text-white font-medium rounded px-6 py-2 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center mb-6">
                            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-600 mb-4">
                                {profile.profileImage ? (
                                    <img src={profile.profileImage} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-blue-600 flex items-center justify-center text-white font-bold text-3xl">
                                        {profile.displayName?.charAt(0).toUpperCase() || '?'}
                                    </div>
                                )}
                            </div>
                            <label className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded px-4 py-2 cursor-pointer transition">
                                Upload Picture
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="block text-sm text-gray-400 mb-1">Display Name</label>
                        <input
                            type="text"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            className="w-full bg-gray-700 text-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm text-gray-400 mb-1">Email</label>
                        <p className="text-gray-300">{profile.email}</p>
                    </div>

                    <button
                        onClick={handleSave}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded px-6 py-2 transition"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SettingsPage;