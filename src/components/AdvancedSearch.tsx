import { useState, useEffect, useMemo } from 'react'
import { Search, Filter, MapPin, DollarSign, Clock, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface SearchFilters {
  query: string
  country: string[]
  field: string[]
  degree: string[]
  tuitionRange: [number, number]
  language: string[]
  duration: string[]
  startDate: string
  scholarshipAvailable: boolean
  ranking: string
}

interface AdvancedSearchProps {
  onFiltersChange: (filters: SearchFilters) => void
  totalResults: number
}

export function AdvancedSearch({ onFiltersChange, totalResults }: AdvancedSearchProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    country: [],
    field: [],
    degree: [],
    tuitionRange: [0, 100000],
    language: [],
    duration: [],
    startDate: '',
    scholarshipAvailable: false,
    ranking: ''
  })

  const [showAdvanced, setShowAdvanced] = useState(false)

  // Filter options (these would come from your database)
  const filterOptions = {
    countries: [
      'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany',
      'Netherlands', 'France', 'Sweden', 'Norway', 'Denmark', 'Switzerland',
      'Austria', 'Italy', 'Spain', 'Japan', 'South Korea', 'Singapore'
    ],
    fields: [
      'Computer Science', 'Engineering', 'Business Administration', 'Medicine',
      'Law', 'Psychology', 'Economics', 'Mathematics', 'Physics', 'Chemistry',
      'Biology', 'Art & Design', 'Architecture', 'Education', 'Social Sciences'
    ],
    degrees: ['Bachelor', 'Master', 'PhD', 'Certificate', 'Diploma'],
    languages: ['English', 'German', 'French', 'Spanish', 'Italian', 'Dutch', 'Swedish'],
    durations: ['6 months', '1 year', '2 years', '3 years', '4+ years']
  }

  useEffect(() => {
    onFiltersChange(filters)
  }, [filters, onFiltersChange])

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleArrayFilterToggle = (key: keyof SearchFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: (prev[key] as string[]).includes(value)
        ? (prev[key] as string[]).filter(item => item !== value)
        : [...(prev[key] as string[]), value]
    }))
  }

  const clearFilters = () => {
    setFilters({
      query: '',
      country: [],
      field: [],
      degree: [],
      tuitionRange: [0, 100000],
      language: [],
      duration: [],
      startDate: '',
      scholarshipAvailable: false,
      ranking: ''
    })
  }

  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (filters.query) count++
    if (filters.country.length) count++
    if (filters.field.length) count++
    if (filters.degree.length) count++
    if (filters.tuitionRange[0] > 0 || filters.tuitionRange[1] < 100000) count++
    if (filters.language.length) count++
    if (filters.duration.length) count++
    if (filters.startDate) count++
    if (filters.scholarshipAvailable) count++
    if (filters.ranking) count++
    return count
  }, [filters])

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
      {/* Main Search Bar */}
      <div className="flex gap-4 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search programs, universities, or fields..."
            value={filters.query}
            onChange={(e) => handleFilterChange('query', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center space-x-2 px-6"
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1 ml-2">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => handleFilterChange('scholarshipAvailable', !filters.scholarshipAvailable)}
          className={`px-3 py-1 rounded-full text-sm border ${
            filters.scholarshipAvailable
              ? 'bg-green-100 text-green-800 border-green-300'
              : 'bg-gray-100 text-gray-600 border-gray-300'
          }`}
        >
          Scholarships Available
        </button>
        {['United States', 'United Kingdom', 'Canada', 'Germany'].map(country => (
          <button
            key={country}
            onClick={() => handleArrayFilterToggle('country', country)}
            className={`px-3 py-1 rounded-full text-sm border ${
              filters.country.includes(country)
                ? 'bg-blue-100 text-blue-800 border-blue-300'
                : 'bg-gray-100 text-gray-600 border-gray-300'
            }`}
          >
            {country}
          </button>
        ))}
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="border-t pt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Country Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="inline h-4 w-4 mr-1" />
                Countries
              </label>
              <div className="max-h-40 overflow-y-auto border rounded-lg p-2">
                {filterOptions.countries.map(country => (
                  <label key={country} className="flex items-center space-x-2 py-1">
                    <input
                      type="checkbox"
                      checked={filters.country.includes(country)}
                      onChange={() => handleArrayFilterToggle('country', country)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">{country}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Field of Study */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <GraduationCap className="inline h-4 w-4 mr-1" />
                Field of Study
              </label>
              <div className="max-h-40 overflow-y-auto border rounded-lg p-2">
                {filterOptions.fields.map(field => (
                  <label key={field} className="flex items-center space-x-2 py-1">
                    <input
                      type="checkbox"
                      checked={filters.field.includes(field)}
                      onChange={() => handleArrayFilterToggle('field', field)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">{field}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Degree Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Degree Level
              </label>
              <div className="space-y-1">
                {filterOptions.degrees.map(degree => (
                  <label key={degree} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.degree.includes(degree)}
                      onChange={() => handleArrayFilterToggle('degree', degree)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">{degree}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Tuition Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="inline h-4 w-4 mr-1" />
                Tuition Range (USD)
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="5000"
                  value={filters.tuitionRange[1]}
                  onChange={(e) => handleFilterChange('tuitionRange', [0, parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>$0</span>
                  <span className="font-medium">${filters.tuitionRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="inline h-4 w-4 mr-1" />
                Duration
              </label>
              <div className="space-y-1">
                {filterOptions.durations.map(duration => (
                  <label key={duration} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.duration.includes(duration)}
                      onChange={() => handleArrayFilterToggle('duration', duration)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">{duration}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <select
                value={filters.startDate}
                onChange={(e) => handleFilterChange('startDate', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="">Any time</option>
                <option value="2025-spring">Spring 2025</option>
                <option value="2025-summer">Summer 2025</option>
                <option value="2025-fall">Fall 2025</option>
                <option value="2026-spring">Spring 2026</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <p className="text-sm text-gray-600">
              {totalResults.toLocaleString()} programs found
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={clearFilters}>
                Clear All
              </Button>
              <Button onClick={() => setShowAdvanced(false)}>
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
