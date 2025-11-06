'use client'

import { useState } from 'react'
import { useSignupStore } from '@/lib/stores/signupStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight, CreditCard } from 'lucide-react'

export function BillingStep() {
  const { billing, setBilling, goToNextStep } = useSignupStore()

  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: billing.billingAddress || '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}

    // Card number validation (simple check)
    if (!formData.cardNumber) {
      newErrors.cardNumber = 'Card number is required'
    } else if (!/^\d{13,19}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Invalid card number'
    }

    // Expiry date validation
    if (!formData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required'
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Format must be MM/YY'
    }

    // CVV validation
    if (!formData.cvv) {
      newErrors.cvv = 'CVV is required'
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'CVV must be 3-4 digits'
    }

    // Billing address
    if (!formData.billingAddress.trim()) {
      newErrors.billingAddress = 'Billing address is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleContinue = () => {
    if (validate()) {
      // In production, this would create a Stripe token
      // For now, just save placeholder data
      setBilling({
        cardToken: 'tok_placeholder_' + Date.now(),
        billingAddress: formData.billingAddress,
      })
      goToNextStep()
    }
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ''
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(' ')
    } else {
      return value
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex gap-3">
          <CreditCard className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-blue-900 mb-1">
              Secure Payment Processing
            </h3>
            <p className="text-sm text-blue-700">
              Your payment information is encrypted and processed securely through Stripe.
              You will not be charged until your 14-day trial ends.
            </p>
          </div>
        </div>
      </div>

      {/* Card Number */}
      <div>
        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
          Card Number *
        </label>
        <Input
          id="cardNumber"
          type="text"
          placeholder="1234 5678 9012 3456"
          value={formData.cardNumber}
          onChange={(e) => setFormData({ ...formData, cardNumber: formatCardNumber(e.target.value) })}
          maxLength={19}
          className={errors.cardNumber ? 'border-red-500' : ''}
        />
        {errors.cardNumber && <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>}
      </div>

      {/* Expiry & CVV */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">
            Expiry Date *
          </label>
          <Input
            id="expiryDate"
            type="text"
            placeholder="MM/YY"
            value={formData.expiryDate}
            onChange={(e) => setFormData({ ...formData, expiryDate: formatExpiryDate(e.target.value) })}
            maxLength={5}
            className={errors.expiryDate ? 'border-red-500' : ''}
          />
          {errors.expiryDate && <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>}
        </div>

        <div>
          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
            CVV *
          </label>
          <Input
            id="cvv"
            type="text"
            placeholder="123"
            value={formData.cvv}
            onChange={(e) => setFormData({ ...formData, cvv: e.target.value.replace(/\D/g, '') })}
            maxLength={4}
            className={errors.cvv ? 'border-red-500' : ''}
          />
          {errors.cvv && <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>}
        </div>
      </div>

      {/* Billing Address */}
      <div>
        <label htmlFor="billingAddress" className="block text-sm font-medium text-gray-700 mb-2">
          Billing Address *
        </label>
        <Input
          id="billingAddress"
          type="text"
          placeholder="123 Main St, Columbus, OH 43215"
          value={formData.billingAddress}
          onChange={(e) => setFormData({ ...formData, billingAddress: e.target.value })}
          className={errors.billingAddress ? 'border-red-500' : ''}
        />
        {errors.billingAddress && <p className="mt-1 text-sm text-red-600">{errors.billingAddress}</p>}
      </div>

      {/* Subscription Plan Info */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-2">Growth Plan</h3>
        <div className="text-2xl font-bold text-gray-900 mb-1">
          $99<span className="text-base font-normal text-gray-600">/month</span>
        </div>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• 14-day free trial</li>
          <li>• Unlimited users</li>
          <li>• 1,000 documents/month</li>
          <li>• Priority support</li>
        </ul>
      </div>

      {/* Continue Button */}
      <div className="pt-4">
        <Button
          onClick={handleContinue}
          size="lg"
          className="w-full"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Security Notice */}
      <p className="text-xs text-center text-gray-500">
        🔒 Your card will not be charged until after your free trial ends
      </p>
    </div>
  )
}
