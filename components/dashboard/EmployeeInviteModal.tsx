'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, CheckCircle2, Loader2 } from 'lucide-react'

interface EmployeeInviteModalProps {
  isOpen: boolean
  onClose: () => void
}

type InviteState = 'idle' | 'sending' | 'success'

export function EmployeeInviteModal({ isOpen, onClose }: EmployeeInviteModalProps) {
  const [inviteState, setInviteState] = useState<InviteState>('idle')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const handleSendInvite = () => {
    setError('')

    if (!email) {
      setError('Email address is required')
      return
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    setInviteState('sending')

    // Simulate sending invitation
    setTimeout(() => {
      setInviteState('success')
      setTimeout(() => {
        handleClose()
      }, 2000)
    }, 1500)
  }

  const handleClose = () => {
    setInviteState('idle')
    setEmail('')
    setError('')
    onClose()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inviteState === 'idle') {
      handleSendInvite()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Onboard Employee</DialogTitle>
          <DialogDescription>
            Send an invitation link to a new team member
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <AnimatePresence mode="wait">
            {inviteState === 'idle' && (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      type="email"
                      placeholder="employee@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        setError('')
                      }}
                      onKeyPress={handleKeyPress}
                      className="pl-10"
                      autoFocus
                    />
                  </div>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="text-sm text-red-600"
                    >
                      {error}
                    </motion.p>
                  )}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900">
                    <strong>What happens next:</strong>
                  </p>
                  <ul className="text-sm text-blue-800 mt-2 space-y-1 list-disc list-inside">
                    <li>Invitation email sent to employee</li>
                    <li>They complete their own onboarding</li>
                    <li>You can track progress from dashboard</li>
                  </ul>
                </div>
              </motion.div>
            )}

            {inviteState === 'sending' && (
              <motion.div
                key="sending"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center py-8"
              >
                <Loader2 className="mx-auto h-12 w-12 text-blue-600 animate-spin mb-4" />
                <p className="text-sm font-medium text-slate-900">
                  Sending invitation...
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  to {email}
                </p>
              </motion.div>
            )}

            {inviteState === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 15,
                  }}
                >
                  <CheckCircle2 className="mx-auto h-12 w-12 text-green-600 mb-4" />
                </motion.div>
                <p className="text-sm font-medium text-slate-900">
                  Invitation sent successfully!
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {email} will receive an email shortly
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {inviteState === 'idle' && (
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleSendInvite}>
              Send Invitation
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
