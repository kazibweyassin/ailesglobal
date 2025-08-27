'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { mockPrograms, countries, fields } from '@/data/programs'
import { Program } from '@/types'
import { useAppStore } from '@/store/useAppStore'
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  DollarSign,
  GraduationCap,
  Clock,
  Award
} from 'lucide-react'
import { formatCurrency, formatDate, getDaysUntilDeadline } from '@/lib/utils'

export default function SearchPage() {
  // Get search state from store
  const { 
    selectedCountry,
    selectedField,
    budgetRange,
    searchQuery,
    filteredPrograms,
    setSearchQuery,
    setSelectedCountry,
    setSelectedField,
    setBudgetRange,
    setPrograms
  } = useAppStore()
  
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const itemsPerPage = 6

  // Initialize programs on mount
  useEffect(() => {
    setPrograms(mockPrograms)
  }, [setPrograms])

  // Filter programs based on search criteria (now using store state)
  const displayPrograms = useMemo(() => {
    return filteredPrograms
  }, [filteredPrograms])

  // Pagination
  const totalPages = Math.ceil(displayPrograms.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedPrograms = displayPrograms.slice(startIndex, startIndex + itemsPerPage)

  const handleFilterChange = (key: string, value: string | [number, number] | null | undefined) => {
    switch (key) {
      case 'searchQuery':
        setSearchQuery(value as string)
        break
      case 'country':
        setSelectedCountry(value as string)
        break
      case 'field':
        setSelectedField(value as string)
        break
      case 'budgetRange':
        setBudgetRange(value as [number, number] | null)
        break
    }
    setCurrentPage(1) // Reset to first page when filters change
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Search Study Programs</h1>
          <p className="text-lg text-gray-600">
            Find your perfect study abroad program from our database of opportunities
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  {showFilters ? 'Hide' : 'Show'}
                </Button>
              </div>

              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Search Query */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search programs..."
                      value={searchQuery || ''}
                      onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Country Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <select
                    value={selectedCountry || ''}
                    onChange={(e) => handleFilterChange('country', e.target.value || undefined)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Countries</option>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>

                {/* Field Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Field of Study
                  </label>
                  <select
                    value={selectedField || ''}
                    onChange={(e) => handleFilterChange('field', e.target.value || undefined)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Fields</option>
                    {fields.map(field => (
                      <option key={field} value={field}>{field}</option>
                    ))}
                  </select>
                </div>

                {/* Budget Range Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Budget Range
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="budget"
                        checked={budgetRange === null}
                        onChange={() => handleFilterChange('budgetRange', null)}
                        className="text-orange-600 focus:ring-orange-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Any Budget</span>
                    </label>
                    {[
                      { label: 'Under $5,000', range: [0, 5000] as [number, number] },
                      { label: '$5,000 - $10,000', range: [5000, 10000] as [number, number] },
                      { label: '$10,000 - $20,000', range: [10000, 20000] as [number, number] },
                      { label: '$20,000 - $30,000', range: [20000, 30000] as [number, number] },
                      { label: 'Over $30,000', range: [30000, 100000] as [number, number] }
                    ].map(({ label, range }) => (
                      <label key={label} className="flex items-center">
                        <input
                          type="radio"
                          name="budget"
                          checked={budgetRange !== null && budgetRange[0] === range[0] && budgetRange[1] === range[1]}
                          onChange={() => handleFilterChange('budgetRange', range)}
                          className="text-orange-600 focus:ring-orange-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedCountry('')
                      setSelectedField('')
                      setBudgetRange(null)
                      setCurrentPage(1)
                    }}
                    className="w-full"
                  >
                    Clear All Filters
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, displayPrograms.length)} of {displayPrograms.length} programs
              </p>
            </div>

            {/* Program Cards */}
            <div className="space-y-6">
              {paginatedPrograms.map(program => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>

            {/* No Results */}
            {displayPrograms.length === 0 && (
              <div className="text-center py-12">
                <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No programs found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters to see more results</p>
                <Button onClick={() => {
                  setSearchQuery('')
                  setSelectedCountry('')
                  setSelectedField('')
                  setBudgetRange(null)
                  setCurrentPage(1)
                }}>Clear Filters</Button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-8">
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </Button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    onClick={() => setCurrentPage(page)}
                    className="w-10 h-10 p-0"
                  >
                    {page}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProgramCard({ program }: { program: Program }) {
  const daysUntilDeadline = getDaysUntilDeadline(program.deadline)
  const isUrgent = daysUntilDeadline <= 30

  return (
    <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-500">{program.country}</span>
              <span className="text-gray-300">•</span>
              <span className="text-sm text-gray-500">{program.field}</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {program.name}
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-2">
              {program.description}
            </p>
          </div>
          
          {program.scholarshipAmount > 0 && (
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ml-0 sm:ml-4 mb-4 sm:mb-0">
              <Award className="h-4 w-4 inline mr-1" />
              {formatCurrency(program.scholarshipAmount)} Scholarship
            </div>
          )}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 text-sm">
          {program.university && (
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">{program.university}</span>
            </div>
          )}
          
          {program.duration && (
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">{program.duration}</span>
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <Calendar className={`h-4 w-4 ${isUrgent ? 'text-red-400' : 'text-gray-400'}`} />
            <span className={`${isUrgent ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
              {formatDate(program.deadline)}
              {isUrgent && ` (${daysUntilDeadline} days left)`}
            </span>
          </div>
          
          {program.tuitionFee !== undefined && (
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">
                {program.tuitionFee === 0 ? 'Free' : formatCurrency(program.tuitionFee)}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {daysUntilDeadline > 0 ? (
              `${daysUntilDeadline} days until deadline`
            ) : (
              'Deadline passed'
            )}
          </div>
          <Link href={`/programs/${program.id}`}>
            <Button>View Details</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
