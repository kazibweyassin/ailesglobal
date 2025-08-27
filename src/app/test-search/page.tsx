'use client'

import { useEffect, useState } from 'react'
import { useAppStore } from '@/store/useAppStore'
import { mockPrograms } from '@/data/programs'

export default function TestSearchPage() {
  const { 
    setPrograms, 
    filteredPrograms, 
    setSearchQuery, 
    setSelectedCountry, 
    setSelectedField,
    setBudgetRange,
    searchQuery,
    selectedCountry,
    selectedField,
    budgetRange
  } = useAppStore()

  const [testResults, setTestResults] = useState<string[]>([])

  useEffect(() => {
    // Initialize with mock data
    setPrograms(mockPrograms)
    
    // Run tests
    const runTests = async () => {
      const results = []
      
      // Test 1: Basic filtering
      setSearchQuery('Computer Science')
      await new Promise(r => setTimeout(r, 100))
      results.push(`Search test: Found ${filteredPrograms.length} programs for "Computer Science"`)
      
      // Test 2: Country filtering  
      setSearchQuery('')
      setSelectedCountry('United States')
      await new Promise(r => setTimeout(r, 100))
      results.push(`Country test: Found ${filteredPrograms.length} programs in United States`)
      
      // Test 3: Field filtering
      setSelectedCountry('')
      setSelectedField('Business Administration')
      await new Promise(r => setTimeout(r, 100))
      results.push(`Field test: Found ${filteredPrograms.length} programs in Business Administration`)
      
      // Test 4: Budget filtering
      setSelectedField('')
      setBudgetRange([0, 30000])
      await new Promise(r => setTimeout(r, 100))
      results.push(`Budget test: Found ${filteredPrograms.length} programs under $30,000`)
      
      // Test 5: Clear all filters
      setSearchQuery('')
      setSelectedCountry('')
      setSelectedField('')
      setBudgetRange(null)
      await new Promise(r => setTimeout(r, 100))
      results.push(`Clear test: Found ${filteredPrograms.length} total programs`)
      
      setTestResults(results)
    }
    
    runTests()
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Search Functionality Test</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Current State</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Search Query:</strong> {searchQuery || 'None'}
          </div>
          <div>
            <strong>Selected Country:</strong> {selectedCountry || 'None'}
          </div>
          <div>
            <strong>Selected Field:</strong> {selectedField || 'None'}
          </div>
          <div>
            <strong>Budget Range:</strong> {budgetRange ? `$${budgetRange[0].toLocaleString()} - $${budgetRange[1].toLocaleString()}` : 'None'}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Test Results</h2>
        <ul className="space-y-2">
          {testResults.map((result, index) => (
            <li key={index} className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>{result}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Current Filtered Programs</h2>
        <div className="text-sm text-gray-600 mb-4">
          Showing {filteredPrograms.length} programs
        </div>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filteredPrograms.map(program => (
            <div key={program.id} className="border rounded p-3">
              <div className="font-medium">{program.name}</div>
              <div className="text-sm text-gray-600">
                {program.country} • {program.field} • ${program.tuitionFee?.toLocaleString() || 'N/A'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
