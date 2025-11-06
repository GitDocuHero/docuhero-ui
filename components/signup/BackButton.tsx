'use client'

import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface BackButtonProps {
  onClick: () => void
  disabled?: boolean
}

export function BackButton({ onClick, disabled = false }: BackButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      disabled={disabled}
      className="gap-2"
      aria-label="Go back to previous step"
    >
      <ArrowLeft className="h-4 w-4" />
      Back
    </Button>
  )
}
