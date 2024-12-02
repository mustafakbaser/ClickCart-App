import { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { updateProfile, uploadAvatar } from '../../services/profileService';

interface ProfileFormProps {
  user: User;
  onProfileUpdate: () => void;
}

export function ProfileForm({ user, onProfileUpdate }: ProfileFormProps) {
  const [fullName, setFullName] = useState(user.user_metadata?.full_name || '');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (avatarFile) {
        const result = await uploadAvatar(user.id, avatarFile);
        if (result instanceof Error) throw result;
      }

      const error = await updateProfile(user.id, { full_name: fullName });
      if (error) throw error;

      setMessage('Profil başarıyla güncellendi.');
      onProfileUpdate();
    } catch (err) {
      setMessage('Profil güncellenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          E-posta
        </label>
        <Input
          id="email"
          type="email"
          value={user.email}
          disabled
          className="bg-gray-50"
        />
      </div>

      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
          Ad Soyad
        </label>
        <Input
          id="fullName"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 mb-1">
          Profil Fotoğrafı
        </label>
        <Input
          id="avatar"
          type="file"
          accept="image/*"
          onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
        />
      </div>

      {message && (
        <div className={`p-3 rounded-md ${
          message.includes('hata') 
            ? 'bg-red-50 text-red-500' 
            : 'bg-green-50 text-green-500'
        }`}>
          {message}
        </div>
      )}

      <Button type="submit" disabled={loading}>
        {loading ? 'Güncelleniyor...' : 'Güncelle'}
      </Button>
    </form>
  );
}