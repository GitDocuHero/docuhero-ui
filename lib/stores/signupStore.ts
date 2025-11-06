import { create } from 'zustand'

// Types for signup data
export interface AccountSetupData {
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  termsAccepted: boolean
}

export interface AgencyInfoData {
  legalName: string
  ein: string
  sector: string
  address: string
  city: string
  state: string
  zipCode: string
  phone: string
}

export interface BillingData {
  cardToken?: string
  billingAddress?: string
}

export interface ComplianceData {
  hipaaAccepted: boolean
  baaAccepted: boolean
}

export interface MFAData {
  totpSecret?: string
  backupCodes?: string[]
  verified: boolean
}

export interface SignupState {
  // Current step
  currentStep: number

  // Form data for each step
  accountSetup: Partial<AccountSetupData>
  agencyInfo: Partial<AgencyInfoData>
  billing: Partial<BillingData>
  compliance: Partial<ComplianceData>
  mfa: Partial<MFAData>

  // Actions
  setCurrentStep: (step: number) => void
  setAccountSetup: (data: Partial<AccountSetupData>) => void
  setAgencyInfo: (data: Partial<AgencyInfoData>) => void
  setBilling: (data: Partial<BillingData>) => void
  setCompliance: (data: Partial<ComplianceData>) => void
  setMFA: (data: Partial<MFAData>) => void
  goToNextStep: () => void
  goToPreviousStep: () => void
  resetSignup: () => void
}

const initialState = {
  currentStep: 1,
  accountSetup: {},
  agencyInfo: {},
  billing: {},
  compliance: {},
  mfa: {},
}

export const useSignupStore = create<SignupState>()(
  persist(
    (set) => ({
      ...initialState,

      setCurrentStep: (step) => set({ currentStep: step }),

      setAccountSetup: (data) =>
        set((state) => ({
          accountSetup: { ...state.accountSetup, ...data },
        })),

      setAgencyInfo: (data) =>
        set((state) => ({
          agencyInfo: { ...state.agencyInfo, ...data },
        })),

      setBilling: (data) =>
        set((state) => ({
          billing: { ...state.billing, ...data },
        })),

      setCompliance: (data) =>
        set((state) => ({
          compliance: { ...state.compliance, ...data },
        })),

      setMFA: (data) =>
        set((state) => ({
          mfa: { ...state.mfa, ...data },
        })),

      goToNextStep: () =>
        set((state) => ({
          currentStep: Math.min(state.currentStep + 1, 5),
        })),

      goToPreviousStep: () =>
        set((state) => ({
          currentStep: Math.max(state.currentStep - 1, 1),
        })),

      resetSignup: () => set(initialState),
    }),
    {
      name: 'docuhero-signup-storage', // LocalStorage key
      partialize: (state) => ({
        // Only persist form data, not current step
        accountSetup: state.accountSetup,
        agencyInfo: state.agencyInfo,
        billing: state.billing,
        compliance: state.compliance,
      }),
    }
  )
)
