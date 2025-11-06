'use client'

import { ReactNode } from 'react'
import { BackButton } from './BackButton'
import { ProgressIndicator } from './ProgressIndicator'

interface MultiStepLayoutProps {
  currentStep: number
  totalSteps: number
  title: string
  description?: string
  onBack?: () => void
  children: ReactNode
  showBackButton?: boolean
}

export function MultiStepLayout({
  currentStep,
  totalSteps,
  title,
  description,
  onBack,
  children,
  showBackButton = true,
}: MultiStepLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header with Back Button and Progress */}
        <div className="flex items-center justify-between mb-8">
          {/* Left: Back Button (or empty space if first step) */}
          <div className="w-24">
            {showBackButton && onBack && (
              <BackButton onClick={onBack} />
            )}
          </div>

          {/* Right: Progress Indicator */}
          <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Title Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {title}
            </h1>
            {description && (
              <p className="text-gray-600">
                {description}
              </p>
            )}
          </div>

          {/* Form Content */}
          <div>
            {children}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Need help?{' '}
            <a href="/support" className="text-primary hover:underline">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
