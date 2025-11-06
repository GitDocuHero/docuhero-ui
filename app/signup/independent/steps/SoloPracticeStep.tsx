'use client'

import { useState } from 'react'
import { useSignupStore } from '@/lib/stores/signupStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight } from 'lucide-react'

export function SoloPracticeStep() {
  const { accountSetup, agencyInfo, setAgencyInfo, goToNextStep } = useSignupStore()

  // Default practice name to user's full name
  const defaultPracticeName = accountSetup.firstName && accountSetup.lastName
    ? `${accountSetup.firstName} ${accountSetup.lastName} - Independent Provider`
    : ''

  const [formData, setFormData] = useState({
    legalName: agencyInfo.legalName || defaultPracticeName,
    sector: agencyInfo.sector || '',
    state: agencyInfo.state || '',
    phone: agencyInfo.phone || '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const sectors = [
    'DEVELOPMENTAL_DISABILITY',
    'HOME_HEALTH_STNA',
    'SUBSTANCE_USE_RECOVERY',
    'EDUCATION',
    'FOSTER_CARE',
  ]

  const usStates = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ]

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.legalName.trim()) {
      newErrors.legalName = 'Practice name is required'
    }

    if (!formData.sector) {
      newErrors.sector = 'Please select your service sector'
    }

    if (!formData.state) {
      newErrors.state = 'State is required'
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(formData.phone)) {
      newErrors.phone = 'Phone must be in format (XXX) XXX-XXXX'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleContinue = () => {
    if (validate()) {
      // Save to store (store as agency info for consistency)
      setAgencyInfo({
        legalName: formData.legalName,
        sector: formData.sector,
        state: formData.state,
        phone: formData.phone,
        // Solo practice defaults
        ein: 'SOLO-' + Date.now(), // Placeholder for solo practitioners
        address: '',
        city: '',
        zipCode: '',
      })
      goToNextStep()
    }
  }

  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-700">
          <strong>Solo Practice Setup:</strong> As an independent provider, you'll have simplified
          setup requirements. You can always add staff members later if your practice grows.
        </p>
      </div>

      {/* Practice Name */}
      <div>
        <label htmlFor="legalName" className="block text-sm font-medium text-gray-700 mb-2">
          Practice Name *
        </label>
        <Input
          id="legalName"
          type="text"
          placeholder="Your name or practice name"
          value={formData.legalName}
          onChange={(e) => setFormData({ ...formData, legalName: e.target.value })}
          className={errors.legalName ? 'border-red-500' : ''}
        />
        {errors.legalName && <p className="mt-1 text-sm text-red-600">{errors.legalName}</p>}
        <p className="mt-1 text-xs text-gray-500">
          This will appear on your documentation and reports
        </p>
      </div>

      {/* Service Sector */}
      <div>
        <label htmlFor="sector" className="block text-sm font-medium text-gray-700 mb-2">
          Service Sector *
        </label>
        <select
          id="sector"
          value={formData.sector}
          onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
          className={`flex h-10 w-full rounded-md border ${errors.sector ? 'border-red-500' : 'border-input'} bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
        >
          <option value="">Select your primary service area...</option>
          {sectors.map((sector) => (
            <option key={sector} value={sector}>
              {sector.replace(/_/g, ' ')}
            </option>
          ))}
        </select>
        {errors.sector && <p className="mt-1 text-sm text-red-600">{errors.sector}</p>}
      </div>

      {/* State */}
      <div>
        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
          Primary State of Operation *
        </label>
        <select
          id="state"
          value={formData.state}
          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
          className={`flex h-10 w-full rounded-md border ${errors.state ? 'border-red-500' : 'border-input'} bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
        >
          <option value="">Select state...</option>
          {usStates.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
        <p className="mt-1 text-xs text-gray-500">
          This determines which compliance rules apply to your documentation
        </p>
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number *
        </label>
        <Input
          id="phone"
          type="tel"
          placeholder="(614) 555-0123"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className={errors.phone ? 'border-red-500' : ''}
        />
        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
      </div>

      {/* Pricing Info */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-2">Solo Provider Plan</h3>
        <div className="text-2xl font-bold text-gray-900 mb-1">
          $29<span className="text-base font-normal text-gray-600">/month</span>
        </div>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• 14-day free trial</li>
          <li>• Single provider account</li>
          <li>• 500 documents/month</li>
          <li>• Email support</li>
          <li>• All compliance features</li>
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
    </div>
  )
}
