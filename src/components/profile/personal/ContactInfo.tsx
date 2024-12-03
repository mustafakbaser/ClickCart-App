import { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Phone, Mail } from 'lucide-react';
import { updateProfile } from '../../../services/profileService';

interface ContactInfoProps {
  user: User;
  onUpdate: () => void;
}

export function ContactInfo({ user, onUpdate }: ContactInfoProps) {
  const [phone, setPhone] = useState(user.user_metadata?.phone || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const error = await updateProfile(user.id, { phone });
      
      if (error) {
        setMessage({ type: 'error', text: error.message });
      } else {
        setMessage({ type: 'success', text: 'Contact information updated successfully' });
        onUpdate();
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to update contact information' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center space-x-2 mb-6">
        <Phone className="h-5 w-5 text-brand-primary" />
        <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
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
            Email Address
          </label>
          <div className="flex items-center space-x-2">
            <Mail className="h-5 w-5 text-gray-400" />
            <Input
              type="email"
              value={user.email}
              disabled
              className="bg-gray-50"
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Your email address is verified and cannot be changed
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <div className="flex items-center space-x-2">
            <Phone className="h-5 w-5 text-gray-400" />
            <Input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Contact Info'}
        </Button>
      </form>
    </div>
  );
}