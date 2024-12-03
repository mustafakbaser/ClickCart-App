import { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { Camera, Loader2 } from 'lucide-react';
import { uploadAvatar } from '../../../services/profileService';

interface AvatarUploadProps {
  user: User;
  onAvatarUpdate: (url: string) => void;
}

export function AvatarUpload({ user, onAvatarUpdate }: AvatarUploadProps) {
  const [loading, setLoading] = useState(false);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const result = await uploadAvatar(user.id, file);
      if (result instanceof Error) throw result;
      onAvatarUpdate(result);
    } catch (error) {
      console.error('Failed to update avatar:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative group">
      <div className="relative w-32 h-32">
        <img
          src={user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.user_metadata?.full_name || '')}&size=128`}
          alt={user.user_metadata?.full_name || 'Profile'}
          className="w-full h-full rounded-full object-cover"
        />
        <label className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg cursor-pointer transform transition-transform group-hover:scale-110">
          {loading ? (
            <Loader2 className="h-5 w-5 text-brand-primary animate-spin" />
          ) : (
            <Camera className="h-5 w-5 text-brand-primary" />
          )}
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleAvatarChange}
            disabled={loading}
          />
        </label>
      </div>
    </div>
  );
}