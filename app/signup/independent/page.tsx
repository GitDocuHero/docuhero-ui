'use client'

import { useSignupStore } from '@/lib/stores/signupStore'
import { MultiStepLayout } from '@/components/signup/MultiStepLayout'
import { AccountSetupStep } from '../../agency/steps/AccountSetupStep'
import { SoloPracticeStep } from './steps/SoloPracticeStep'
import { MFAStep } from '../../agency/steps/MFAStep'

export default function IndependentProviderSignupPage() {
  const { currentStep, setCurrentStep, goToPreviousStep } = useSignupStore()

  const TOTAL_STEPS = 3

  // Render the appropriate step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <AccountSetupStep />
      case 2:
        return <SoloPracticeStep />
      case 3:
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
          description: 'Start your independent practice journey',
        }
      case 2:
        return {
          title: 'Solo Practice Information',
          description: 'Tell us about your independent practice',
        }
      case 3:
        return {
          title: 'Enable Two-Factor Authentication',
          description: 'Secure your account with 2FA',
        }
      default:
        return {
          title: 'Create Your Account',
          description: 'Start your independent practice journey',
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
