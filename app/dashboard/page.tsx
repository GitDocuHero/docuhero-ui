'use client'

import { useState } from 'react'
import { StatCard } from '@/components/dashboard/StatCard'
import { ActionCard } from '@/components/dashboard/ActionCard'
import { ActivityFeed } from '@/components/dashboard/ActivityFeed'
import { ServicePlanUploadModal } from '@/components/dashboard/ServicePlanUploadModal'
import { EmployeeInviteModal } from '@/components/dashboard/EmployeeInviteModal'
import { Users, UserPlus, ClipboardList, Activity } from 'lucide-react'

export default function DashboardPage() {
  const [showServicePlanModal, setShowServicePlanModal] = useState(false)
  const [showEmployeeModal, setShowEmployeeModal] = useState(false)

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Welcome back, Agency Admin
        </h1>
        <p className="text-slate-600 mt-1">
          Here's what's happening with your agency today
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Participants"
          value="24"
          icon={Users}
          trend={{ value: 12, isPositive: true }}
          subtitle="2 new this week"
        />
        <StatCard
          title="Team Members"
          value="12"
          icon={UserPlus}
          trend={{ value: 8, isPositive: true }}
          subtitle="Across 3 departments"
        />
        <StatCard
          title="Pending Tasks"
          value="5"
          icon={ClipboardList}
          trend={{ value: 3, isPositive: false }}
          subtitle="Require attention"
        />
        <StatCard
          title="Recent Activity"
          value="48"
          icon={Activity}
          subtitle="Actions this week"
        />
      </div>

      {/* Main Action Cards */}
      <div>
        <h2 className="text-xl font-semibold text-slate-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ActionCard
            title="Onboard Person Served"
            description="Upload service plan and let AI handle the rest"
            icon={
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            }
            gradientFrom="from-blue-500"
            gradientTo="to-indigo-600"
            onClick={() => setShowServicePlanModal(true)}
          />
          <ActionCard
            title="Onboard Employee"
            description="Send invitation link to new team member"
            icon={
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            }
            gradientFrom="from-purple-500"
            gradientTo="to-pink-600"
            onClick={() => setShowEmployeeModal(true)}
          />
        </div>
      </div>

      {/* Activity Feed */}
      <ActivityFeed />

      {/* Modals */}
      <ServicePlanUploadModal
        isOpen={showServicePlanModal}
        onClose={() => setShowServicePlanModal(false)}
      />
      <EmployeeInviteModal
        isOpen={showEmployeeModal}
        onClose={() => setShowEmployeeModal(false)}
      />
    </div>
  )
}
