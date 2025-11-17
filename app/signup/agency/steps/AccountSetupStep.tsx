'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useSignupStore } from '@/lib/stores/signupStore'
import { Button } from '@/components/ui/button'
import { ValidatedInput } from '@/components/signup/ValidatedInput'
import { Checkbox } from '@/components/ui/checkbox'
import { ArrowRight, Eye, EyeOff } from 'lucide-react'

// Validation functions
const validateEmail = (email: string) => {
  if (!email) return { valid: false, message: 'Email is required' }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { valid: false, message: 'Invalid email address' }
  }
  return { valid: true, message: 'Email looks good!' }
}

const validatePassword = (password: string) => {
  if (!password) return { valid: false, message: 'Password is required' }
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters' }
  }
  if (!/(?=.*[a-z])/.test(password)) {
    return { valid: false, message: 'Must include lowercase letter' }
  }
  if (!/(?=.*[A-Z])/.test(password)) {
    return { valid: false, message: 'Must include uppercase letter' }
  }
  if (!/(?=.*\d)/.test(password)) {
    return { valid: false, message: 'Must include a number' }
  }
  if (!/(?=.*[@$!%*?&])/.test(password)) {
    return { valid: false, message: 'Must include special character (@$!%*?&)' }
  }
  return { valid: true, message: 'Strong password!' }
}

const validateName = (name: string, field: string) => {
  if (!name || !name.trim()) {
    return { valid: false, message: `${field} is required` }
  }
  if (name.trim().length < 2) {
    return { valid: false, message: `${field} must be at least 2 characters` }
  }
  return { valid: true }
}

export function AccountSetupStep() {
  const { accountSetup, setAccountSetup, goToNextStep } = useSignupStore()

  const [formData, setFormData] = useState({
    email: accountSetup.email || '',
    password: accountSetup.password || '',
    confirmPassword: accountSetup.confirmPassword || '',
    firstName: accountSetup.firstName || '',
    lastName: accountSetup.lastName || '',
    termsAccepted: accountSetup.termsAccepted || false,
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateConfirmPassword = (confirmPassword: string) => {
    if (!confirmPassword) {
      return { valid: false, message: 'Please confirm your password' }
    }
    if (confirmPassword !== formData.password) {
      return { valid: false, message: 'Passwords do not match' }
    }
    return { valid: true, message: 'Passwords match!' }
  }

  const canContinue = () => {
    return (
      validateEmail(formData.email).valid &&
      validatePassword(formData.password).valid &&
      validateConfirmPassword(formData.confirmPassword).valid &&
      validateName(formData.firstName, 'First name').valid &&
      validateName(formData.lastName, 'Last name').valid &&
      formData.termsAccepted
    )
  }

  const handleContinue = () => {
    if (canContinue()) {
      setIsSubmitting(true)
      // Save to store (client-side only)
      setAccountSetup(formData)

      // Simulate async operation
      setTimeout(() => {
        setIsSubmitting(false)
        // Go to next step
        goToNextStep()
      }, 800)
    }
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      {/* Email */}
      <ValidatedInput
        id="email"
        type="email"
        label="Email Address"
        placeholder="you@example.com"
        value={formData.email}
        onChange={(value) => setFormData({ ...formData, email: value })}
        validate={validateEmail}
        required
        autoComplete="email"
      />

      {/* First Name & Last Name */}
      <div className="grid grid-cols-2 gap-4">
        <ValidatedInput
          id="firstName"
          type="text"
          label="First Name"
          placeholder="John"
          value={formData.firstName}
          onChange={(value) => setFormData({ ...formData, firstName: value })}
          validate={(v) => validateName(v, 'First name')}
          required
          autoComplete="given-name"
        />

        <ValidatedInput
          id="lastName"
          type="text"
          label="Last Name"
          placeholder="Doe"
          value={formData.lastName}
          onChange={(value) => setFormData({ ...formData, lastName: value })}
          validate={(v) => validateName(v, 'Last name')}
          required
          autoComplete="family-name"
        />
      </div>

      {/* Password */}
      <ValidatedInput
        id="password"
        type={showPassword ? 'text' : 'password'}
        label="Password"
        placeholder="••••••••"
        value={formData.password}
        onChange={(value) => setFormData({ ...formData, password: value })}
        validate={validatePassword}
        required
        hint="Must be 8+ characters with uppercase, lowercase, number, and special character"
        autoComplete="new-password"
        className={showPassword ? 'pr-10' : 'pr-10'}
      >
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </ValidatedInput>

      {/* Confirm Password */}
      <ValidatedInput
        id="confirmPassword"
        type={showConfirmPassword ? 'text' : 'password'}
        label="Confirm Password"
        placeholder="••••••••"
        value={formData.confirmPassword}
        onChange={(value) => setFormData({ ...formData, confirmPassword: value })}
        validate={validateConfirmPassword}
        required
        autoComplete="new-password"
        className={showConfirmPassword ? 'pr-10' : 'pr-10'}
      >
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </ValidatedInput>

      {/* Terms Acceptance */}
      <motion.div
        className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 bg-gray-50"
        whileHover={{ borderColor: 'rgb(59, 130, 246)' }}
        transition={{ duration: 0.2 }}
      >
        <Checkbox
          id="terms"
          checked={formData.termsAccepted}
          onCheckedChange={(checked) => setFormData({ ...formData, termsAccepted: checked as boolean })}
        />
        <label htmlFor="terms" className="text-sm text-gray-700 leading-tight cursor-pointer">
          I agree to the{' '}
          <a href="/terms" target="_blank" className="text-blue-600 hover:underline font-medium">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy" target="_blank" className="text-blue-600 hover:underline font-medium">
            Privacy Policy
          </a>
        </label>
      </motion.div>

      {/* Continue Button */}
      <div className="pt-4">
        <Button
          onClick={handleContinue}
          size="lg"
          className="w-full relative overflow-hidden group"
          disabled={!canContinue() || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
              <span className="ml-2">Processing...</span>
            </>
          ) : (
            <>
              <span>Continue</span>
              <motion.div
                className="ml-2"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.div>
            </>
          )}
        </Button>
      </div>

      {/* Already have account */}
      <div className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <a href="/login" className="text-blue-600 hover:underline font-medium">
          Sign in
        </a>
      </div>
    </motion.div>
  )
}
