'use client'

import { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Left: Back Button (or empty space if first step) */}
          <div className="w-24">
            {showBackButton && onBack && (
              <BackButton onClick={onBack} />
            )}
          </div>

          {/* Right: Progress Indicator */}
          <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
        </motion.div>

        {/* Main Content Card with AnimatePresence for smooth transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.98 }}
            transition={{
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            {/* Title Section */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {title}
              </h1>
              {description && (
                <p className="text-gray-600">
                  {description}
                </p>
              )}
            </motion.div>

            {/* Form Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              {children}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <motion.div
          className="mt-6 text-center text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <p>
            Need help?{' '}
            <a href="/support" className="text-primary hover:underline">
              Contact Support
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
