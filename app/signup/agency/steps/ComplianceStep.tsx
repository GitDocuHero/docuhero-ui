'use client'

import { useState } from 'react'
import { useSignupStore } from '@/lib/stores/signupStore'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { ArrowRight, Shield, FileText } from 'lucide-react'

export function ComplianceStep() {
  const { compliance, setCompliance, goToNextStep } = useSignupStore()

  const [formData, setFormData] = useState({
    hipaaAccepted: compliance.hipaaAccepted || false,
    baaAccepted: compliance.baaAccepted || false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.hipaaAccepted) {
      newErrors.hipaa = 'You must acknowledge HIPAA compliance requirements'
    }

    if (!formData.baaAccepted) {
      newErrors.baa = 'You must accept the Business Associate Agreement'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleContinue = () => {
    if (validate()) {
      setCompliance(formData)
      goToNextStep()
    }
  }

  return (
    <div className="space-y-6">
      {/* HIPAA Compliance Card */}
      <div className="border border-gray-200 rounded-lg p-6 bg-white">
        <div className="flex gap-3 mb-4">
          <Shield className="h-6 w-6 text-blue-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">HIPAA Compliance Acknowledgment</h3>
            <p className="text-sm text-gray-600 mb-4">
              As a healthcare documentation platform, DocuHero is designed to be HIPAA-compliant.
              You acknowledge that:
            </p>
            <ul className="text-sm text-gray-600 space-y-2 mb-4">
              <li>• You will use this platform only for authorized healthcare purposes</li>
              <li>• You will protect all patient health information (PHI)</li>
              <li>• You will comply with HIPAA Privacy and Security Rules</li>
              <li>• You will report any suspected security breaches immediately</li>
              <li>• You understand your responsibilities as a Covered Entity</li>
            </ul>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Checkbox
            id="hipaaAccepted"
            checked={formData.hipaaAccepted}
            onCheckedChange={(checked) => setFormData({ ...formData, hipaaAccepted: checked as boolean })}
          />
          <label htmlFor="hipaaAccepted" className="text-sm text-gray-700 leading-tight cursor-pointer">
            I acknowledge and agree to comply with all HIPAA requirements
          </label>
        </div>
        {errors.hipaa && <p className="mt-2 text-sm text-red-600">{errors.hipaa}</p>}
      </div>

      {/* BAA Card */}
      <div className="border border-gray-200 rounded-lg p-6 bg-white">
        <div className="flex gap-3 mb-4">
          <FileText className="h-6 w-6 text-blue-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Business Associate Agreement (BAA)</h3>
            <p className="text-sm text-gray-600 mb-4">
              DocuHero acts as a Business Associate under HIPAA. This agreement establishes:
            </p>
            <ul className="text-sm text-gray-600 space-y-2 mb-4">
              <li>• DocuHero's responsibilities for safeguarding PHI</li>
              <li>• Permitted uses and disclosures of PHI</li>
              <li>• Security measures and breach notification procedures</li>
              <li>• Your rights as a Covered Entity</li>
              <li>• Termination and data return procedures</li>
            </ul>
            <a
              href="/baa-full-text"
              target="_blank"
              className="text-sm text-primary hover:underline inline-flex items-center"
            >
              Read Full BAA Document →
            </a>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Checkbox
            id="baaAccepted"
            checked={formData.baaAccepted}
            onCheckedChange={(checked) => setFormData({ ...formData, baaAccepted: checked as boolean })}
          />
          <label htmlFor="baaAccepted" className="text-sm text-gray-700 leading-tight cursor-pointer">
            I have read and accept the Business Associate Agreement
          </label>
        </div>
        {errors.baa && <p className="mt-2 text-sm text-red-600">{errors.baa}</p>}
      </div>

      {/* Additional Info */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-sm text-amber-800">
          <strong>Important:</strong> These agreements are legally binding. By continuing, you confirm that
          you have the authority to enter into these agreements on behalf of your organization.
        </p>
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
