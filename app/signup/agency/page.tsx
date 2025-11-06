'use client'

import { useSignupStore } from '@/lib/stores/signupStore'
import { MultiStepLayout } from '@/components/signup/MultiStepLayout'
import { AccountSetupStep } from './steps/AccountSetupStep'
import { AgencyInfoStep } from './steps/AgencyInfoStep'
import { BillingStep } from './steps/BillingStep'
import { ComplianceStep } from './steps/ComplianceStep'
import { MFAStep } from './steps/MFAStep'

export default function AgencySignupPage() {
  const { currentStep, setCurrentStep, goToPreviousStep } = useSignupStore()

  const TOTAL_STEPS = 5

  // Render the appropriate step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <AccountSetupStep />
      case 2:
        return <AgencyInfoStep />
      case 3:
        return <BillingStep />
      case 4:
        return <ComplianceStep />
      case 5:
        return <MFAStep />
      default:
        return <AccountSetupStep />
    }
  }

  // Get step title and description
  const getStepInfo = () => {
    switch (currentStep) {
      case 1:
        return {
          title: 'Create Your Account',
          description: 'Start by setting up your admin credentials',
        }
      case 2:
        return {
          title: 'Agency Information',
          description: 'Tell us about your healthcare organization',
        }
      case 3:
        return {
          title: 'Billing Information',
          description: 'Add your payment method to activate your subscription',
        }
      case 4:
        return {
          title: 'Compliance Agreement',
          description: 'Review and accept HIPAA and compliance terms',
        }
      case 5:
        return {
          title: 'Enable Two-Factor Authentication',
          description: 'Secure your account with 2FA (required for admin accounts)',
        }
      default:
        return {
          title: 'Create Your Account',
          description: 'Start by setting up your admin credentials',
        }
    }
  }

  const stepInfo = getStepInfo()

  return (
    <MultiStepLayout
      currentStep={currentStep}
      totalSteps={TOTAL_STEPS}
      title={stepInfo.title}
      description={stepInfo.description}
      onBack={currentStep > 1 ? goToPreviousStep : undefined}
      showBackButton={currentStep > 1}
    >
      {renderStep()}
    </MultiStepLayout>
  )
}
