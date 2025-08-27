import { useState, useEffect } from 'react'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts'
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Globe,
  Award,
  BookOpen,
  Calendar,
  Target
} from 'lucide-react'

interface AnalyticsData {
  applications: {
    total: number
    pending: number
    accepted: number
    rejected: number
    trend: number
  }
  programs: {
    totalViewed: number
    saved: number
    applied: number
    trending: Array<{ name: string; views: number }>
  }
  scholarships: {
    totalAmount: number
    applied: number
    awarded: number
    averageAmount: number
  }
  demographics: {
    countries: Array<{ country: string; students: number }>
    fields: Array<{ field: string; popularity: number }>
    budgetRanges: Array<{ range: string; count: number }>
  }
  timeline: Array<{
    month: string
    applications: number
    acceptances: number
    scholarships: number
  }>
}

export function AnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [timeRange, setTimeRange] = useState('6months')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [timeRange])

  const fetchAnalytics = async () => {
    setLoading(true)
    try {
      // This would be replaced with actual API call
      const mockData: AnalyticsData = {
        applications: {
          total: 1247,
          pending: 45,
          accepted: 389,
          rejected: 156,
          trend: 12.5
        },
        programs: {
          totalViewed: 15672,
          saved: 3421,
          applied: 891,
          trending: [
            { name: 'Computer Science - MIT', views: 234 },
            { name: 'MBA - Oxford', views: 189 },
            { name: 'Engineering - TU Berlin', views: 167 }
          ]
        },
        scholarships: {
          totalAmount: 12500000,
          applied: 567,
          awarded: 89,
          averageAmount: 25000
        },
        demographics: {
          countries: [
            { country: 'United States', students: 445 },
            { country: 'United Kingdom', students: 298 },
            { country: 'Germany', students: 256 },
            { country: 'Canada', students: 189 },
            { country: 'Australia', students: 167 }
          ],
          fields: [
            { field: 'Computer Science', popularity: 28 },
            { field: 'Business', popularity: 22 },
            { field: 'Engineering', popularity: 18 },
            { field: 'Medicine', popularity: 15 },
            { field: 'Arts', popularity: 17 }
          ],
          budgetRanges: [
            { range: '$0-20k', count: 234 },
            { range: '$20k-40k', count: 456 },
            { range: '$40k-60k', count: 298 },
            { range: '$60k+', count: 167 }
          ]
        },
        timeline: [
          { month: 'Jan', applications: 45, acceptances: 12, scholarships: 5 },
          { month: 'Feb', applications: 67, acceptances: 18, scholarships: 8 },
          { month: 'Mar', applications: 89, acceptances: 25, scholarships: 12 },
          { month: 'Apr', applications: 123, acceptances: 34, scholarships: 15 },
          { month: 'May', applications: 156, acceptances: 45, scholarships: 22 },
          { month: 'Jun', applications: 178, acceptances: 52, scholarships: 28 }
        ]
      }
      
      setAnalyticsData(mockData)
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading || !analyticsData) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Comprehensive insights into platform performance</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2"
        >
          <option value="1month">Last Month</option>
          <option value="3months">Last 3 Months</option>
          <option value="6months">Last 6 Months</option>
          <option value="1year">Last Year</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Applications</p>
              <p className="text-3xl font-bold text-gray-900">{analyticsData.applications.total.toLocaleString()}</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                +{analyticsData.applications.trend}% from last period
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Programs Viewed</p>
              <p className="text-3xl font-bold text-gray-900">{analyticsData.programs.totalViewed.toLocaleString()}</p>
              <p className="text-sm text-gray-600 mt-1">
                {analyticsData.programs.saved.toLocaleString()} saved
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Globe className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Scholarship Value</p>
              <p className="text-3xl font-bold text-gray-900">
                ${(analyticsData.scholarships.totalAmount / 1000000).toFixed(1)}M
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {analyticsData.scholarships.awarded} awarded
              </p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <Award className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-3xl font-bold text-gray-900">
                {Math.round((analyticsData.applications.accepted / analyticsData.applications.total) * 100)}%
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {analyticsData.applications.accepted} accepted
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Target className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Timeline Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Application Timeline</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData.timeline}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="applications" stroke="#2563eb" strokeWidth={2} />
              <Line type="monotone" dataKey="acceptances" stroke="#10b981" strokeWidth={2} />
              <Line type="monotone" dataKey="scholarships" stroke="#f59e0b" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Countries */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Popular Destinations</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.demographics.countries}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="country" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="students" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Field of Study Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Field of Study Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analyticsData.demographics.fields}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ field, popularity }) => `${field} (${popularity}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="popularity"
              >
                {analyticsData.demographics.fields.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Budget Ranges */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Budget Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.demographics.budgetRanges}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Trending Programs */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Trending Programs</h3>
        <div className="space-y-3">
          {analyticsData.programs.trending.map((program, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <span className="font-medium">{program.name}</span>
              </div>
              <div className="text-sm text-gray-600">
                {program.views} views
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
