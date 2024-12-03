import { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { User as UserIcon } from 'lucide-react';
import { updateProfile } from '../../../services/profileService';

interface BasicInfoProps {
  user: User;
  onUpdate: () => void;
}

export function BasicInfo({ user, onUpdate }: BasicInfoProps) {
  const [fullName, setFullName] = useState(user.user_metadata?.full_name || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const error = await updateProfile(user.id, { full_name: fullName });
      
      if (error) {
        setMessage({ type: 'error', text: error.message });
      } else {
        setMessage({ type: 'success', text: 'Basic information updated successfully' });
        onUpdate();
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to update basic information' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center space-x-2 mb-6">
        <UserIcon className="h-5 w-5 text-brand-primary" />
        <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
      </div>

      {message && (
        <div className={`p-4 mb-6 rounded-lg ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-700 border border-green-200'
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <Input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            placeholder="John Doe"
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Basic Info'}
        </Button>
      </form>
    </div>
  );
}