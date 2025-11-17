'use client'

import { motion } from 'framer-motion'
import { FileText, UserPlus, CheckCircle, Clock } from 'lucide-react'

interface Activity {
  id: string
  type: 'upload' | 'invite' | 'approval'
  user: string
  action: string
  timestamp: string
  initials: string
}

const MOCK_ACTIVITIES: Activity[] = [
  {
    id: '1',
    type: 'upload',
    user: 'Sarah Johnson',
    action: 'uploaded service plan for John Doe',
    timestamp: '2 hours ago',
    initials: 'SJ',
  },
  {
    id: '2',
    type: 'invite',
    user: 'Michael Chen',
    action: 'invited new employee jane.smith@example.com',
    timestamp: '5 hours ago',
    initials: 'MC',
  },
  {
    id: '3',
    type: 'approval',
    user: 'Emily Rodriguez',
    action: 'approved service plan for Jane Smith',
    timestamp: '1 day ago',
    initials: 'ER',
  },
  {
    id: '4',
    type: 'upload',
    user: 'David Kim',
    action: 'uploaded service plan for Robert Brown',
    timestamp: '2 days ago',
    initials: 'DK',
  },
  {
    id: '5',
    type: 'invite',
    user: 'Lisa Anderson',
    action: 'invited new employee mark.wilson@example.com',
    timestamp: '3 days ago',
    initials: 'LA',
  },
]

const getActivityIcon = (type: Activity['type']) => {
  switch (type) {
    case 'upload':
      return <FileText className="w-4 h-4" />
    case 'invite':
      return <UserPlus className="w-4 h-4" />
    case 'approval':
      return <CheckCircle className="w-4 h-4" />
  }
}

const getActivityColor = (type: Activity['type']) => {
  switch (type) {
    case 'upload':
      return 'from-blue-500 to-indigo-600'
    case 'invite':
      return 'from-purple-500 to-pink-600'
    case 'approval':
      return 'from-green-500 to-emerald-600'
  }
}

export function ActivityFeed() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-slate-900">
          Recent Activity
        </h2>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
          View all
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200/60 divide-y divide-slate-100">
        {MOCK_ACTIVITIES.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br ${getActivityColor(
                  activity.type
                )} flex items-center justify-center text-white text-sm font-medium`}
              >
                {activity.initials}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-900">
                  <span className="font-medium">{activity.user}</span>{' '}
                  <span className="text-slate-600">{activity.action}</span>
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-br ${getActivityColor(
                      activity.type
                    )} text-white`}
                  >
                    {getActivityIcon(activity.type)}
                    <span className="capitalize">{activity.type}</span>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-slate-500">
                    <Clock className="w-3 h-3" />
                    {activity.timestamp}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {MOCK_ACTIVITIES.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-slate-500">No recent activity</p>
          </div>
        )}
      </div>
    </div>
  )
}
