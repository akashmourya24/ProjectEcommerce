import { PenSquareIcon, } from 'lucide-react';
import React, { useState } from 'react';
import { FiSave } from 'react-icons/fi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ProfileData {
    name: string;
    email: string;
    phone: string;
    occupation: string;
    dateOfBirth: string;
    address: string;
    city: string;
    state: string;
    pinCode: string;
}

const Profile: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState<ProfileData>({
        name: 'Arun Kumar',
        email: 'ak797821@gmail.com',
        phone: '+91 7500343758',
        occupation: 'Software Developer',
        dateOfBirth: '2001-12-12',
        address: 'Nausar Main Street',
        city: 'Khatima',
        state: 'Uttrakhand',
        pinCode: '262308',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = () => {
        setIsEditing(false);
        toast.success('Profile updated successfully!', {
            position: "top-right",
            autoClose: 600,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Profile</h1>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className={`${isEditing
                            ? 'text-green-500 hover:text-green-700'
                            : 'text-blue-500 hover:text-blue-700'
                            }`}
                    >
                        {isEditing ? <FiSave size={20} /> : <PenSquareIcon size={20} className='text-[#283b53]' />}
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-center mb-6">
                        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                            {/* You can add an avatar image here */}
                            <span className="text-4xl">👤</span>
                        </div>
                    </div>

                    {/* Personal Information */}
                    <div className="grid grid-cols-2 gap-4">
                        {['name', 'email', 'phone', 'occupation', 'dateOfBirth'].map((key) => (
                            <div key={key} className="flex flex-col">
                                <label className="text-gray-600 capitalize mb-1">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                </label>
                                <input
                                    type={key === 'email' ? 'email' : key === 'dateOfBirth' ? 'date' : 'text'}
                                    name={key}
                                    value={profileData[key as keyof ProfileData]}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className={`p-2 border rounded-md ${isEditing
                                        ? 'border-blue-300 bg-white text-gray-900'
                                        : 'border-gray-200 bg-gray-50 text-gray-500'
                                        } ${!isEditing && 'cursor-not-allowed'}`}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Address Information */}
                    <div className="mt-6">
                        <h2 className="text-lg font-semibold mb-4">Address Information</h2>
                        <div className="space-y-4">
                            <div className="flex flex-col">
                                <label className="text-gray-600 mb-1">Street Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={profileData.address}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className={`p-2 border rounded-md ${isEditing
                                        ? 'border-blue-300 bg-white text-gray-900'
                                        : 'border-gray-200 bg-gray-50 text-gray-500'
                                        } ${!isEditing && 'cursor-not-allowed'}`}
                                />
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                {['city', 'state', 'pinCode'].map((field) => (
                                    <div key={field} className="flex flex-col">
                                        <label className="text-gray-600 mb-1 capitalize">
                                            {field === 'pinCode' ? 'PIN Code' : field}
                                        </label>
                                        <input
                                            type="text"
                                            name={field}
                                            value={profileData[field as keyof ProfileData]}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className={`p-2 border rounded-md ${isEditing
                                                ? 'border-blue-300 bg-white text-gray-900'
                                                : 'border-gray-200 bg-gray-50 text-gray-500'
                                                } ${!isEditing && 'cursor-not-allowed'}`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {isEditing && (
                        <button
                            onClick={handleSave}
                            className="w-full mt-6 bg-[#283b53] text-white py-2.5 rounded-md hover:bg-[#244977] transition-colors font-medium"
                        >
                            Save Changes
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile; 