'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Upload, FileText, CheckCircle2, Loader2 } from 'lucide-react'

interface ServicePlanUploadModalProps {
  isOpen: boolean
  onClose: () => void
}

type UploadState = 'idle' | 'uploading' | 'processing' | 'success'

export function ServicePlanUploadModal({ isOpen, onClose }: ServicePlanUploadModalProps) {
  const [uploadState, setUploadState] = useState<UploadState>('idle')
  const [fileName, setFileName] = useState<string>('')
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File) => {
    if (file && file.type === 'application/pdf') {
      setFileName(file.name)
      setUploadState('uploading')

      // Simulate upload and AI processing
      setTimeout(() => {
        setUploadState('processing')
        setTimeout(() => {
          setUploadState('success')
          setTimeout(() => {
            handleClose()
          }, 2000)
        }, 2000)
      }, 1500)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0])
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleClose = () => {
    setUploadState('idle')
    setFileName('')
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Onboard Person Served</DialogTitle>
          <DialogDescription>
            Upload the service plan (ISP) and our AI will handle the rest
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <AnimatePresence mode="wait">
            {uploadState === 'idle' && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div
                  className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-300 hover:border-slate-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-900">
                      Drop service plan here or click to upload
                    </p>
                    <p className="text-xs text-slate-500">PDF files only</p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileSelect(e.target.files[0])
                      }
                    }}
                  />
                </div>
              </motion.div>
            )}

            {uploadState === 'uploading' && (
              <motion.div
                key="uploading"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center py-8"
              >
                <Loader2 className="mx-auto h-12 w-12 text-blue-600 animate-spin mb-4" />
                <p className="text-sm font-medium text-slate-900">
                  Uploading {fileName}...
                </p>
                <p className="text-xs text-slate-500 mt-1">Please wait</p>
              </motion.div>
            )}

            {uploadState === 'processing' && (
              <motion.div
                key="processing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center py-8"
              >
                <div className="relative mb-4">
                  <FileText className="mx-auto h-12 w-12 text-blue-600" />
                  <motion.div
                    className="absolute -inset-2 border-2 border-blue-400 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </div>
                <p className="text-sm font-medium text-slate-900">
                  AI is processing service plan...
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Extracting goals, dates, and participant information
                </p>
              </motion.div>
            )}

            {uploadState === 'success' && (
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
                  Person served onboarded successfully!
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  All information has been extracted and saved
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {uploadState === 'idle' && (
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
