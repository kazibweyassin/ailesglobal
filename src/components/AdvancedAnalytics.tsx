'use client'

import { useState, useEffect } from 'react'
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts'
import { 
  Users, 
  TrendingUp, 
  BookOpen, 
  GraduationCap,
  Globe,
  Calendar,
  Target,
  Award
} from 'lucide-react'

interface AnalyticsData {
  userGrowth: Array<{ month: string; users: number; active: number }>
  programViews: Array<{ program: string; views: number; applications: number }>
  countryDistribution: Array<{ country: string; users: number; color: string }>
  applicationSuccess: Array<{ month: string; applications: number; acceptances: number }>
  userActivity: Array<{ hour: string; sessions: number }>
}

interface MetricCardProps {
  title: string
  value: string | number
  change: number
  icon: React.ReactNode
  color: string
}

function MetricCard({ title, value, change, icon, color }: MetricCardProps) {
  const isPositive = change >= 0
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          <div className="flex items-center mt-2">
            <TrendingUp className={`w-4 h-4 mr-1 ${isPositive ? 'text-green-500' : 'text-red-500 rotate-180'}`} />
            <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? '+' : ''}{change}%
            </span>
            <span className="text-sm text-gray-500 ml-1">vs last month</span>
          </div>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  )
}

export default function AdvancedAnalytics() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [selectedPeriod, setSelectedPeriod] = useState('7d')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalyticsData()
  }, [selectedPeriod])

  const fetchAnalyticsData = async () => {
    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      const mockData: AnalyticsData = {
        userGrowth: [
          { month: 'Jan', users: 120, active: 89 },
          { month: 'Feb', users: 180, active: 134 },
          { month: 'Mar', users: 240, active: 187 },
          { month: 'Apr', users: 320, active: 248 },
          { month: 'May', users: 410, active: 321 },
          { month: 'Jun', users: 520, active: 412 },
          { month: 'Jul', users: 650, active: 523 }
        ],
        programViews: [
          { program: 'MIT Computer Science', views: 1240, applications: 89 },
          { program: 'Oxford MBA', views: 980, applications: 67 },
          { program: 'Stanford AI/ML', views: 890, applications: 78 },
          { program: 'Cambridge Medicine', views: 780, applications: 45 },
          { program: 'ETH Data Science', views: 650, applications: 52 }
        ],
        countryDistribution: [
          { country: 'India', users: 180, color: '#3B82F6' },
          { country: 'China', users: 145, color: '#10B981' },
          { country: 'Nigeria', users: 98, color: '#F59E0B' },
          { country: 'Brazil', users: 76, color: '#EF4444' },
          { country: 'Others', users: 151, color: '#8B5CF6' }
        ],
        applicationSuccess: [
          { month: 'Jan', applications: 45, acceptances: 12 },
          { month: 'Feb', applications: 67, acceptances: 19 },
          { month: 'Mar', applications: 89, acceptances: 28 },
          { month: 'Apr', applications: 112, acceptances: 34 },
          { month: 'May', applications: 134, acceptances: 42 },
          { month: 'Jun', applications: 156, acceptances: 51 }
        ],
        userActivity: [
          { hour: '00', sessions: 12 },
          { hour: '04', sessions: 8 },
          { hour: '08', sessions: 45 },
          { hour: '12', sessions: 78 },
          { hour: '16', sessions: 92 },
          { hour: '20', sessions: 67 }
        ]
      }
      
      setAnalyticsData(mockData)
      setLoading(false)
    }, 1000)
  }

  if (loading || !analyticsData) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-32 rounded-lg"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-64 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Track user engagement and platform performance</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Users"
          value="2,543"
          change={12.5}
          icon={<Users className="w-6 h-6 text-white" />}
          color="bg-blue-500"
        />
        <MetricCard
          title="Active Applications"
          value="847"
          change={8.2}
          icon={<BookOpen className="w-6 h-6 text-white" />}
          color="bg-green-500"
        />
        <MetricCard
          title="Program Views"
          value="15.2K"
          change={15.8}
          icon={<GraduationCap className="w-6 h-6 text-white" />}
          color="bg-purple-500"
        />
        <MetricCard
          title="Success Rate"
          value="34.2%"
          change={-2.1}
          icon={<Award className="w-6 h-6 text-white" />}
          color="bg-orange-500"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={analyticsData.userGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="users" 
                stroke="#3B82F6" 
                fill="#3B82F6" 
                fillOpacity={0.1}
                name="Total Users"
              />
              <Area 
                type="monotone" 
                dataKey="active" 
                stroke="#10B981" 
                fill="#10B981" 
                fillOpacity={0.1}
                name="Active Users"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Country Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Distribution by Country</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analyticsData.countryDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ country, percent }) => `${country} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="users"
              >
                {analyticsData.countryDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Program Performance */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Program Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.programViews} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="program" type="category" width={120} />
              <Tooltip />
              <Bar dataKey="views" fill="#3B82F6" name="Views" />
              <Bar dataKey="applications" fill="#10B981" name="Applications" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Application Success Rate */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Success Rate</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData.applicationSuccess}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="applications" 
                stroke="#3B82F6" 
                strokeWidth={2}
                name="Total Applications"
              />
              <Line 
                type="monotone" 
                dataKey="acceptances" 
                stroke="#10B981" 
                strokeWidth={2}
                name="Acceptances"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* User Activity Heatmap */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">User Activity by Hour</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={analyticsData.userActivity}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sessions" fill="#8B5CF6" name="Active Sessions" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: 'New user registration', user: 'John Doe', time: '2 minutes ago' },
              { action: 'Program application submitted', user: 'Jane Smith', time: '5 minutes ago' },
              { action: 'Document uploaded', user: 'Mike Johnson', time: '12 minutes ago' },
              { action: 'Interview scheduled', user: 'Sarah Wilson', time: '18 minutes ago' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.user}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
