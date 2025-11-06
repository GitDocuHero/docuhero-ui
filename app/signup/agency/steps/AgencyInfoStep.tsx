'use client'

import { useState } from 'react'
import { useSignupStore } from '@/lib/stores/signupStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight } from 'lucide-react'

export function AgencyInfoStep() {
  const { agencyInfo, setAgencyInfo, goToNextStep } = useSignupStore()

  const [formData, setFormData] = useState({
    legalName: agencyInfo.legalName || '',
    ein: agencyInfo.ein || '',
    sector: agencyInfo.sector || '',
    address: agencyInfo.address || '',
    city: agencyInfo.city || '',
    state: agencyInfo.state || '',
    zipCode: agencyInfo.zipCode || '',
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
      newErrors.legalName = 'Legal agency name is required'
    }

    if (!formData.ein) {
      newErrors.ein = 'EIN is required'
    } else if (!/^\d{2}-?\d{7}$/.test(formData.ein)) {
      newErrors.ein = 'EIN must be in format XX-XXXXXXX'
    }

    if (!formData.sector) {
      newErrors.sector = 'Please select a service sector'
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Street address is required'
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required'
    }

    if (!formData.state) {
      newErrors.state = 'State is required'
    }

    if (!formData.zipCode) {
      newErrors.zipCode = 'ZIP code is required'
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = 'ZIP code must be in format XXXXX or XXXXX-XXXX'
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
      setAgencyInfo(formData)
      goToNextStep()
    }
  }

  return (
    <div className="space-y-6">
      {/* Legal Name */}
      <div>
        <label htmlFor="legalName" className="block text-sm font-medium text-gray-700 mb-2">
          Legal Agency Name *
        </label>
        <Input
          id="legalName"
          type="text"
          placeholder="ABC Healthcare Services LLC"
          value={formData.legalName}
          onChange={(e) => setFormData({ ...formData, legalName: e.target.value })}
          className={errors.legalName ? 'border-red-500' : ''}
        />
        {errors.legalName && <p className="mt-1 text-sm text-red-600">{errors.legalName}</p>}
      </div>

      {/* EIN */}
      <div>
        <label htmlFor="ein" className="block text-sm font-medium text-gray-700 mb-2">
          Employer Identification Number (EIN) *
        </label>
        <Input
          id="ein"
          type="text"
          placeholder="12-3456789"
          value={formData.ein}
          onChange={(e) => setFormData({ ...formData, ein: e.target.value })}
          className={errors.ein ? 'border-red-500' : ''}
        />
        {errors.ein && <p className="mt-1 text-sm text-red-600">{errors.ein}</p>}
        <p className="mt-1 text-xs text-gray-500">Format: XX-XXXXXXX</p>
      </div>

      {/* Sector */}
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
          <option value="">Select a sector...</option>
          {sectors.map((sector) => (
            <option key={sector} value={sector}>
              {sector.replace(/_/g, ' ')}
            </option>
          ))}
        </select>
        {errors.sector && <p className="mt-1 text-sm text-red-600">{errors.sector}</p>}
      </div>

      {/* Address */}
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
          Street Address *
        </label>
        <Input
          id="address"
          type="text"
          placeholder="123 Main Street"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className={errors.address ? 'border-red-500' : ''}
        />
        {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
      </div>

      {/* City, State, ZIP */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="col-span-1">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
            City *
          </label>
          <Input
            id="city"
            type="text"
            placeholder="Columbus"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className={errors.city ? 'border-red-500' : ''}
          />
          {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
        </div>

        <div className="col-span-1">
          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
            State *
          </label>
          <select
            id="state"
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            className={`flex h-10 w-full rounded-md border ${errors.state ? 'border-red-500' : 'border-input'} bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
          >
            <option value="">Select...</option>
            {usStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
        </div>

        <div className="col-span-2 md:col-span-1">
          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
            ZIP Code *
          </label>
          <Input
            id="zipCode"
            type="text"
            placeholder="43215"
            value={formData.zipCode}
            onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
            className={errors.zipCode ? 'border-red-500' : ''}
          />
          {errors.zipCode && <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>}
        </div>
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Agency Phone Number *
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
