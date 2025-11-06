'use client'

import { useState } from 'react'
import { useSignupStore } from '@/lib/stores/signupStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CheckCircle, Smartphone, Copy } from 'lucide-react'

export function MFAStep() {
  const { mfa, setMFA, resetSignup } = useSignupStore()

  const [verificationCode, setVerificationCode] = useState('')
  const [isVerified, setIsVerified] = useState(mfa.verified || false)
  const [error, setError] = useState('')

  // Mock QR code and secret (in production, this comes from backend)
  const mockTotpSecret = 'JBSWY3DPEHPK3PXP'
  const mockQRCodeUrl = 'https://via.placeholder.com/200x200.png?text=QR+Code'
  const mockBackupCodes = [
    '1234-5678-9012',
    '3456-7890-1234',
    '5678-9012-3456',
    '7890-1234-5678',
    '9012-3456-7890',
  ]

  const handleVerify = () => {
    // Mock verification (in production, verify with backend)
    if (verificationCode.length === 6) {
      setMFA({
        totpSecret: mockTotpSecret,
        backupCodes: mockBackupCodes,
        verified: true,
      })
      setIsVerified(true)
      setError('')
    } else {
      setError('Please enter a valid 6-digit code')
    }
  }

  const handleComplete = () => {
    // In production, submit all signup data to backend
    alert('✅ Signup complete! (In production, this would create your account)')

    // Reset signup state
    resetSignup()

    // Redirect to login or dashboard
    window.location.href = '/login'
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  if (isVerified) {
    return (
      <div className="space-y-6">
        {/* Success Message */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-green-900 mb-2">
            Two-Factor Authentication Enabled!
          </h3>
          <p className="text-sm text-green-700">
            Your account is now protected with 2FA
          </p>
        </div>

        {/* Backup Codes */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-2">Backup Codes</h3>
          <p className="text-sm text-gray-600 mb-4">
            Save these backup codes in a secure location. You can use them to access your account
            if you lose access to your authenticator app.
          </p>

          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            {mockBackupCodes.map((code, index) => (
              <div key={index} className="flex items-center justify-between">
                <code className="text-sm font-mono">{code}</code>
                <button
                  onClick={() => copyToClipboard(code)}
                  className="text-primary hover:text-primary/80"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <p className="text-xs text-amber-700 mt-4 bg-amber-50 p-3 rounded">
            ⚠️ Each backup code can only be used once. Store them securely.
          </p>
        </div>

        {/* Complete Button */}
        <Button
          onClick={handleComplete}
          size="lg"
          className="w-full"
        >
          Complete Setup
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex gap-3">
          <Smartphone className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-blue-900 mb-1">
              Enhanced Security Required
            </h3>
            <p className="text-sm text-blue-700">
              Admin accounts require two-factor authentication (2FA) for HIPAA compliance.
            </p>
          </div>
        </div>
      </div>

      {/* Step 1: Download App */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-2">Step 1: Download an Authenticator App</h3>
        <p className="text-sm text-gray-600 mb-3">
          If you don't already have one, download an authenticator app:
        </p>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Google Authenticator (iOS, Android)</li>
          <li>• Microsoft Authenticator (iOS, Android)</li>
          <li>• Authy (iOS, Android, Desktop)</li>
        </ul>
      </div>

      {/* Step 2: Scan QR Code */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-2">Step 2: Scan QR Code</h3>
        <p className="text-sm text-gray-600 mb-4">
          Open your authenticator app and scan this QR code:
        </p>

        <div className="flex justify-center mb-4">
          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <img
              src={mockQRCodeUrl}
              alt="2FA QR Code"
              className="w-48 h-48"
            />
          </div>
        </div>

        <details className="text-sm">
          <summary className="cursor-pointer text-primary hover:underline">
            Can't scan? Enter manually
          </summary>
          <div className="mt-2 bg-gray-50 p-3 rounded">
            <p className="text-xs text-gray-600 mb-1">Secret Key:</p>
            <code className="text-sm font-mono select-all">{mockTotpSecret}</code>
          </div>
        </details>
      </div>

      {/* Step 3: Enter Code */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-2">Step 3: Enter Verification Code</h3>
        <p className="text-sm text-gray-600 mb-4">
          Enter the 6-digit code from your authenticator app:
        </p>

        <Input
          type="text"
          placeholder="000000"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
          maxLength={6}
          className={`text-center text-lg tracking-widest ${error ? 'border-red-500' : ''}`}
        />
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>

      {/* Verify Button */}
      <Button
        onClick={handleVerify}
        size="lg"
        className="w-full"
        disabled={verificationCode.length !== 6}
      >
        Verify & Enable 2FA
      </Button>
    </div>
  )
}
