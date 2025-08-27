'use client'

import { useEffect } from 'react'
import { useAppStore } from '@/store/useAppStore'

export default function BudgetRangeTestPage() {
  const { budgetRange, setBudgetRange } = useAppStore()
  
  useEffect(() => {
    console.log('Current budgetRange:', budgetRange)
  }, [budgetRange])

  const testNull = () => {
    setBudgetRange(null)
    console.log('Set budgetRange to null')
  }

  const testRange = () => {
    setBudgetRange([10000, 30000])
    console.log('Set budgetRange to [10000, 30000]')
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Budget Range Test</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Current Budget Range</h2>
        <p className="text-lg">
          {budgetRange ? 
            `$${budgetRange[0].toLocaleString()} - $${budgetRange[1].toLocaleString()}` : 
            'No budget filter (null)'
          }
        </p>
      </div>

      <div className="space-x-4">
        <button 
          onClick={testNull}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Set to Null
        </button>
        <button 
          onClick={testRange}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Set to [10000, 30000]
        </button>
      </div>

      <div className="mt-6 bg-gray-100 p-4 rounded">
        <h3 className="font-semibold mb-2">Safe Access Test:</h3>
        <p>budgetRange is null: {budgetRange === null ? 'true' : 'false'}</p>
        <p>Safe access test: {budgetRange && budgetRange[0] ? budgetRange[0] : 'No value'}</p>
      </div>
    </div>
  )
}
