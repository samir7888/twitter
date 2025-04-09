import { useState } from 'react';
import { X } from 'lucide-react';
import {  useUpdateMyProfile } from '@/hooks/useUpdateProfile';
import { UserProfile } from '@/types/userProfile';

export default function ProfileEditModal({ isOpen, setIsOpen,initialValues }:{isOpen: boolean, setIsOpen: (isOpen: boolean) => void,initialValues:UserProfile}) {
  const { mutate, isPending, isError, error, isSuccess } = useUpdateMyProfile();
  // Use provided initial data or fallback to empty values
  const [formData, setFormData] = useState<FormData>({
      firstName:  initialValues?.firstName || '',
      lastName:  initialValues?.lastName || '',
      bio:  initialValues?.bio || '',
      dob: initialValues?.dob || '',
      location:  initialValues.location || '',
      phoneNumber:  initialValues?.phoneNumber || '',
      countryCode:  initialValues?.countryCode || '+1'
 
  });
  const countryCodes = [
    { code: '+1', name: 'United States (+1)' },
    { code: '+44', name: 'United Kingdom (+44)' },
    { code: '+91', name: 'India (+91)' },
    { code: '+61', name: 'Australia (+61)' },
    { code: '+86', name: 'China (+86)' },
    { code: '+49', name: 'Germany (+49)' },
  ];

interface FormData {
    firstName: string;
    lastName: string;
    bio: string;
    dob: string;
    location: string;
    phoneNumber: string;
    countryCode: string;
}

 
const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};

const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
  e.preventDefault();
  // useUpdateMyProfile({formData});
    mutate({ params: formData });
    console.log('Profile data submitted:', formData);
    setIsOpen(false);
};

  // If the modal is not open, don't render anything
  if (!isOpen) return null;
  if (isPending) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 font-sans">
      {/* Semi-transparent background */}
      <div 
        className="fixed inset-0 bg-black  opacity-50"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal Content */}
      <div className="bg-black opacity-80 border rounded-2xl w-full max-w-md mx-4 z-10">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-gray-800"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold">Edit Profile</h2>
          </div>
          <button
            onClick={handleSubmit}
            className="bg-black text-white font-bold py-1 px-4 rounded-full"
          >
            Save
          </button>
        </div>

        {/* Form */}
        <form className="p-4 space-y-4">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            ></textarea>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="City, State"
            />
          </div>

          {/* Phone Number with Country Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <div className="grid grid-cols-3 gap-2">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="p-2 border bg-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {countryCodes.map(country => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
              <div className="col-span-2">
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Phone number"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}