import { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { updateProfile, uploadAvatar } from '../../services/profileService';
import { Camera } from 'lucide-react';

interface PersonalInfoProps {
  user: User;
}

export function PersonalInfo({ user }: PersonalInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    fullName: user.user_metadata?.full_name || '',
    phone: user.user_metadata?.phone || '',
    avatarUrl: user.user_metadata?.avatar_url || '',
  });

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const result = await uploadAvatar(user.id, file);
      if (result instanceof Error) throw result;
      
      setFormData(prev => ({ ...prev, avatarUrl: result }));
      setMessage('Profile photo updated successfully');
    } catch (error) {
      setMessage('Failed to update profile photo');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const error = await updateProfile(user.id, {
        full_name: formData.fullName,
        phone: formData.phone,
      });

      if (error) throw error;
      setMessage('Profile updated successfully');
      setIsEditing(false);
    } catch (err) {
      setMessage('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">Personal Information</h2>
        <Button
          variant="outline"
          onClick={() => setIsEditing(!isEditing)}
          disabled={loading}
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </Button>
      </div>

      {message && (
        <div className={`p-3 rounded-md ${
          message.includes('success') 
            ? 'bg-green-50 text-green-500' 
            : 'bg-red-50 text-red-500'
        }`}>
          {message}
        </div>
      )}

      <div className="flex items-center space-x-8">
        <div className="relative">
          <img
            src={formData.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.fullName)}`}
            alt={formData.fullName}
            className="h-24 w-24 rounded-full object-cover"
          />
          {isEditing && (
            <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md cursor-pointer">
              <Camera className="h-4 w-4 text-gray-600" />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleAvatarChange}
                disabled={loading}
              />
            </label>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex-1 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              type="email"
              value={user.email}
              disabled
              className="bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <Input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
              disabled={!isEditing || loading}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              disabled={!isEditing || loading}
              placeholder="+1 (555) 123-4567"
            />
          </div>

          {isEditing && (
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}