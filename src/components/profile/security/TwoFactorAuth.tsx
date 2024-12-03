import { useState } from 'react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Shield, QrCode } from 'lucide-react';
import { enable2FA, verify2FACode } from '../../../services/authService';

export function TwoFactorAuth() {
  const [isEnabling, setIsEnabling] = useState(false);
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleEnable2FA = async () => {
    setLoading(true);
    setMessage(null);

    try {
      const { error, url } = await enable2FA();
      
      if (error) {
        setMessage({ type: 'error', text: error.message });
      } else if (url) {
        setQrCode(url);
        setIsEnabling(true);
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to enable 2FA' });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const { error } = await verify2FACode(verificationCode);
      
      if (error) {
        setMessage({ type: 'error', text: error.message });
      } else {
        setMessage({ type: 'success', text: '2FA enabled successfully' });
        setIsEnabling(false);
        setQrCode(null);
        setVerificationCode('');
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to verify code' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
      <div className="flex items-center space-x-2 mb-6">
        <Shield className="h-5 w-5 text-brand-primary" />
        <h3 className="text-lg font-medium text-gray-900">Two-Factor Authentication</h3>
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

      {!isEnabling ? (
        <div>
          <p className="text-gray-600 mb-6">
            Add an extra layer of security to your account by enabling two-factor authentication.
            You'll need to enter a code from your authenticator app when signing in.
          </p>
          <Button
            onClick={handleEnable2FA}
            disabled={loading}
            className="flex items-center space-x-2"
          >
            <Shield className="h-4 w-4" />
            <span>{loading ? 'Enabling 2FA...' : 'Enable 2FA'}</span>
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {qrCode && (
            <div className="flex flex-col items-center space-y-4">
              <QrCode className="h-8 w-8 text-brand-primary" />
              <img
                src={qrCode}
                alt="QR Code for 2FA"
                className="w-48 h-48"
              />
              <p className="text-sm text-gray-600 text-center">
                Scan this QR code with your authenticator app
              </p>
            </div>
          )}

          <form onSubmit={handleVerifyCode} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Verification Code
              </label>
              <Input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter 6-digit code"
                required
                pattern="[0-9]{6}"
                maxLength={6}
              />
            </div>

            <div className="flex space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEnabling(false);
                  setQrCode(null);
                  setVerificationCode('');
                }}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading || verificationCode.length !== 6}
              >
                {loading ? 'Verifying...' : 'Verify Code'}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}