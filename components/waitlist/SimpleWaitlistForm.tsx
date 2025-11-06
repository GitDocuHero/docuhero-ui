'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { CheckCircleIcon, LoaderIcon, AlertCircleIcon } from 'lucide-react'

interface SimpleWaitlistFormProps {
  onSuccess?: () => void
  variant?: 'default' | 'compact'
}

export function SimpleWaitlistForm({ onSuccess, variant = 'default' }: SimpleWaitlistFormProps) {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [emailValid, setEmailValid] = useState<boolean | null>(null)

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (value.length === 0) {
      setEmailValid(null)
      return
    }
    setEmailValid(emailRegex.test(value))
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    validateEmail(value)
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email) {
      setError('Please enter your email address')
      return
    }

    if (!emailValid) {
      setError('Please enter a valid email address')
      return
    }

    if (!consent) {
      setError('Please agree to be contacted about early access')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, consentToContact: consent }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
        setEmail('')
        setConsent(false)
        setEmailValid(null)

        if (onSuccess) {
          onSuccess()
        }
      } else {
        setError(data.error || 'Failed to join waitlist. Please try again.')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
      console.error('Waitlist submission error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="text-center py-8">
        <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">You're on the waitlist!</h3>
        <p className="text-gray-600">We'll notify you when early access is available.</p>
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col gap-3">
          <div className="relative">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              disabled={isSubmitting}
              className={`pr-10 ${
                emailValid === true
                  ? 'border-green-500 focus:ring-green-500'
                  : emailValid === false
                  ? 'border-red-500 focus:ring-red-500'
                  : ''
              }`}
              required
            />
            {emailValid === true && (
              <CheckCircleIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
            )}
            {emailValid === false && (
              <AlertCircleIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-red-500" />
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="consent-compact"
              checked={consent}
              onCheckedChange={(checked) => setConsent(checked as boolean)}
              disabled={isSubmitting}
            />
            <label
              htmlFor="consent-compact"
              className="text-sm text-gray-600 cursor-pointer"
            >
              I agree to be contacted about early access
            </label>
          </div>

          {error && (
            <p className="text-sm text-red-500 flex items-center">
              <AlertCircleIcon className="h-4 w-4 mr-1" />
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting || !emailValid || !consent}
            className="w-full"
            size="lg"
          >
            {isSubmitting ? (
              <>
                <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                Joining...
              </>
            ) : (
              'Join Waitlist'
            )}
          </Button>
        </div>
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-4">
      {/* Email Field */}
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email Address
        </label>
        <div className="relative">
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={handleEmailChange}
            disabled={isSubmitting}
            className={`pr-10 ${
              emailValid === true
                ? 'border-green-500 focus:ring-green-500'
                : emailValid === false
                ? 'border-red-500 focus:ring-red-500'
                : ''
            }`}
            required
          />
          {emailValid === true && (
            <CheckCircleIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
          )}
          {emailValid === false && (
            <AlertCircleIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-red-500" />
          )}
        </div>
      </div>

      {/* Consent Checkbox */}
      <div className="flex items-start space-x-2">
        <Checkbox
          id="consent"
          checked={consent}
          onCheckedChange={(checked) => setConsent(checked as boolean)}
          disabled={isSubmitting}
          className="mt-1"
        />
        <label
          htmlFor="consent"
          className="text-sm text-gray-600 cursor-pointer leading-tight"
        >
          I agree to be contacted about early access to DocuHero. We respect your privacy and follow HIPAA guidelines.
        </label>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-800 flex items-center">
            <AlertCircleIcon className="h-4 w-4 mr-2" />
            {error}
          </p>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting || !emailValid || !consent}
        className="w-full"
        size="lg"
      >
        {isSubmitting ? (
          <>
            <LoaderIcon className="mr-2 h-5 w-5 animate-spin" />
            Joining Waitlist...
          </>
        ) : (
          'Join the Waitlist'
        )}
      </Button>
    </form>
  )
}
