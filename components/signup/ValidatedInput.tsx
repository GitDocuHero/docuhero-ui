'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Check, X, AlertCircle } from 'lucide-react'

interface ValidatedInputProps {
  id: string
  type?: 'text' | 'email' | 'password'
  label: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  validate?: (value: string) => { valid: boolean; message?: string }
  required?: boolean
  hint?: string
  className?: string
  disabled?: boolean
  autoComplete?: string
  children?: React.ReactNode // For icons like eye/eyeoff
}

export function ValidatedInput({
  id,
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  validate,
  required = false,
  hint,
  className = '',
  disabled = false,
  autoComplete,
  children,
}: ValidatedInputProps) {
  const [isTouched, setIsTouched] = useState(false)
  const [validationState, setValidationState] = useState<{
    valid: boolean
    message?: string
  } | null>(null)

  // Real-time validation as user types
  useEffect(() => {
    if (isTouched && validate && value) {
      const result = validate(value)
      setValidationState(result)
    } else if (isTouched && !value && required) {
      setValidationState({ valid: false, message: `${label} is required` })
    } else if (!value) {
      setValidationState(null)
    }
  }, [value, isTouched, validate, required, label])

  const hasError = isTouched && validationState && !validationState.valid
  const isValid = isTouched && validationState && validationState.valid

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => setIsTouched(true)}
          onFocus={() => setIsTouched(true)}
          disabled={disabled}
          autoComplete={autoComplete}
          className={`
            ${className}
            ${hasError ? 'border-red-500 focus-visible:ring-red-500' : ''}
            ${isValid ? 'border-green-500 focus-visible:ring-green-500 pr-10' : ''}
            ${children ? 'pr-10' : ''}
            transition-colors duration-200
          `}
        />

        {/* Validation Icon */}
        <AnimatePresence>
          {isValid && !children && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600"
            >
              <Check className="h-5 w-5" />
            </motion.div>
          )}

          {hasError && !children && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-red-600"
            >
              <X className="h-5 w-5" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Custom children (like password visibility toggle) */}
        {children}
      </div>

      {/* Hint Text */}
      {hint && !hasError && !isValid && (
        <p className="text-xs text-gray-500 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          {hint}
        </p>
      )}

      {/* Error Message */}
      <AnimatePresence>
        {hasError && validationState?.message && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-sm text-red-600 flex items-center gap-1"
          >
            <X className="h-4 w-4" />
            {validationState.message}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Success Message (optional) */}
      <AnimatePresence>
        {isValid && validationState?.message && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-sm text-green-600 flex items-center gap-1"
          >
            <Check className="h-4 w-4" />
            {validationState.message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
