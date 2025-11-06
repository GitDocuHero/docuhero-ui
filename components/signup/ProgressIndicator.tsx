'use client'

interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
}

export function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  return (
    <div className="flex items-center gap-2">
      {/* Text indicator */}
      <span className="text-sm text-muted-foreground">
        Step {currentStep} of {totalSteps}
      </span>

      {/* Visual dots */}
      <div className="flex gap-1.5">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full transition-colors ${
              i + 1 === currentStep
                ? 'bg-primary'
                : i + 1 < currentStep
                ? 'bg-primary/50'
                : 'bg-gray-200'
            }`}
            aria-label={`Step ${i + 1}${i + 1 === currentStep ? ' (current)' : i + 1 < currentStep ? ' (completed)' : ''}`}
          />
        ))}
      </div>
    </div>
  )
}
