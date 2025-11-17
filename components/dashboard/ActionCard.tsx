'use client'

import { ReactNode, useState } from 'react'
import { motion } from 'framer-motion'

interface ActionCardProps {
  title: string
  description: string
  icon: ReactNode
  gradientFrom: string
  gradientTo: string
  onClick: () => void
}

export function ActionCard({
  title,
  description,
  icon,
  gradientFrom,
  gradientTo,
  onClick,
}: ActionCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Card Container with 3D Tilt Effect */}
      <motion.div
        className="relative overflow-hidden rounded-2xl bg-white border border-slate-200/60 p-8 h-64"
        style={{
          transformStyle: 'preserve-3d',
          perspective: 1000,
        }}
        animate={isHovered ? {
          rotateX: -2,
          rotateY: 2,
          transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
        } : {
          rotateX: 0,
          rotateY: 0,
          transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
        }}
      >
        {/* Gradient Background Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} ${gradientTo} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Icon */}
          <motion.div
            className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${gradientFrom} ${gradientTo} text-white w-fit mb-6`}
            animate={isHovered ? {
              scale: 1.05,
              transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
            } : {
              scale: 1,
              transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
            }}
          >
            {icon}
          </motion.div>

          {/* Text Content */}
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              {title}
            </h3>
            <p className="text-slate-600 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Arrow Icon */}
          <motion.div
            className="flex items-center gap-2 text-slate-400 group-hover:text-slate-900 transition-colors duration-300 mt-4"
            animate={isHovered ? {
              x: 4,
              transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
            } : {
              x: 0,
              transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
            }}
          >
            <span className="text-sm font-medium">Get started</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </motion.div>
        </div>

        {/* Shimmer Effect on Hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
          animate={isHovered ? {
            x: ['-100%', '100%'],
            opacity: [0, 0.2, 0],
            transition: { duration: 1, ease: 'linear', repeat: 0 }
          } : {}}
        />
      </motion.div>

      {/* Enhanced Shadow on Hover */}
      <motion.div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradientFrom} ${gradientTo} -z-10 blur-xl`}
        animate={isHovered ? {
          opacity: 0.15,
          scale: 1.02,
          transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
        } : {
          opacity: 0,
          scale: 0.95,
          transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
        }}
      />
    </motion.div>
  )
}
