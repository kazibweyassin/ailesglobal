import { BarChart3, TrendingUp, FileCheck, AlertTriangle, Clock, Zap } from 'lucide-react'

interface DocumentAnalyticsProps {
  documents: Array<{
    id: string
    status: 'pending' | 'verified' | 'rejected'
    uploadDate: Date
    type: string
    aiScore?: number
    complianceScore?: number
  }>
}

export function DocumentAnalytics({ documents }: DocumentAnalyticsProps) {
  const totalDocs = documents.length
  const verifiedDocs = documents.filter(d => d.status === 'verified').length
  const pendingDocs = documents.filter(d => d.status === 'pending').length
  const rejectedDocs = documents.filter(d => d.status === 'rejected').length
  
  const avgAiScore = documents
    .filter(d => d.aiScore)
    .reduce((sum, d) => sum + (d.aiScore || 0), 0) / documents.filter(d => d.aiScore).length || 0
  
  const avgComplianceScore = documents
    .filter(d => d.complianceScore)
    .reduce((sum, d) => sum + (d.complianceScore || 0), 0) / documents.filter(d => d.complianceScore).length || 0

  const recentUploads = documents.filter(d => {
    const dayAgo = new Date()
    dayAgo.setDate(dayAgo.getDate() - 1)
    return d.uploadDate > dayAgo
  }).length

  const completionRate = totalDocs > 0 ? (verifiedDocs / totalDocs) * 100 : 0

  const analytics = [
    {
      title: 'Completion Rate',
      value: `${completionRate.toFixed(1)}%`,
      change: '+12%',
      icon: FileCheck,
      color: 'success',
      trend: 'up'
    },
    {
      title: 'AI Quality Score',
      value: avgAiScore.toFixed(1),
      change: '+5.2',
      icon: Zap,
      color: 'primary',
      trend: 'up'
    },
    {
      title: 'Compliance Score',
      value: `${avgComplianceScore.toFixed(1)}%`,
      change: '+8%',
      icon: BarChart3,
      color: 'secondary',
      trend: 'up'
    },
    {
      title: 'Recent Uploads',
      value: recentUploads.toString(),
      change: pendingDocs > 0 ? `${pendingDocs} pending` : 'All current',
      icon: Clock,
      color: pendingDocs > 0 ? 'warning' : 'success',
      trend: pendingDocs > 0 ? 'neutral' : 'up'
    }
  ]

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Document Analytics</h3>
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5 text-primary-500" />
          <span className="text-sm font-medium text-gray-600">Real-time Insights</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {analytics.map((metric, index) => (
          <div key={index} className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white rounded-lg p-4 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg ${
                metric.color === 'success' ? 'bg-success-100' :
                metric.color === 'warning' ? 'bg-warning-100' :
                metric.color === 'primary' ? 'bg-primary-100' :
                metric.color === 'secondary' ? 'bg-secondary-100' :
                'bg-gray-100'
              }`}>
                <metric.icon className={`h-5 w-5 ${
                  metric.color === 'success' ? 'text-success-600' :
                  metric.color === 'warning' ? 'text-warning-600' :
                  metric.color === 'primary' ? 'text-primary-600' :
                  metric.color === 'secondary' ? 'text-secondary-600' :
                  'text-gray-600'
                }`} />
              </div>
              <div className={`flex items-center space-x-1 text-xs ${
                metric.trend === 'up' ? 'text-success-600' :
                metric.trend === 'down' ? 'text-error-600' :
                'text-gray-500'
              }`}>
                <TrendingUp className="h-3 w-3" />
                <span>{metric.change}</span>
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
              <div className="text-sm text-gray-600">{metric.title}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Status Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Document Status Distribution</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Verified</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-success-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${totalDocs > 0 ? (verifiedDocs / totalDocs) * 100 : 0}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-900 w-8">{verifiedDocs}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Pending</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-warning-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${totalDocs > 0 ? (pendingDocs / totalDocs) * 100 : 0}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-900 w-8">{pendingDocs}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Rejected</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-error-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${totalDocs > 0 ? (rejectedDocs / totalDocs) * 100 : 0}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-900 w-8">{rejectedDocs}</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Quick Actions</h4>
          <div className="space-y-2">
            <button className="w-full flex items-center justify-between p-3 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors duration-200">
              <span className="text-sm font-medium text-primary-700">Generate Document Report</span>
              <BarChart3 className="h-4 w-4 text-primary-600" />
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-secondary-50 hover:bg-secondary-100 rounded-lg transition-colors duration-200">
              <span className="text-sm font-medium text-secondary-700">AI Quality Analysis</span>
              <Zap className="h-4 w-4 text-secondary-600" />
            </button>
            {rejectedDocs > 0 && (
              <button className="w-full flex items-center justify-between p-3 bg-error-50 hover:bg-error-100 rounded-lg transition-colors duration-200">
                <span className="text-sm font-medium text-error-700">Review Rejected Documents</span>
                <AlertTriangle className="h-4 w-4 text-error-600" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
