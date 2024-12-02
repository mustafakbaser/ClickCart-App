import { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Shield, Key } from 'lucide-react';

interface SecuritySettingsProps {
  user: User;
}

export function SecuritySettings({ user }: SecuritySettingsProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    
    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match');
      return;
    }

    setLoading(true);
    // Password update logic will go here
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-gray-900">Security Settings</h2>

      {message && (
        <div className={`p-3 rounded-md ${
          message.includes('success')
            ? 'bg-green-50 text-green-500'
            : 'bg-red-50 text-red-500'
        }`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Current Password
          </label>
          <Input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={8}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Confirm New Password
          </label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={8}
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Password'}
        </Button>
      </form>

      <div className="border-t pt-6">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Two-Factor Authentication</h3>
        <Button
          variant="outline"
          className="w-full flex items-center justify-center space-x-2"
        >
          <Shield className="h-4 w-4" />
          <span>Enable 2FA</span>
        </Button>
      </div>
    </div>
  );
}