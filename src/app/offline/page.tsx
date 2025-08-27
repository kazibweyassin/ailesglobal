import { Wifi, RefreshCw, Home, Search } from 'lucide-react'
import Link from 'next/link'

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Offline Icon */}
        <div className="mb-6">
          <div className="bg-gray-200 rounded-full p-6 inline-block">
            <Wifi className="text-gray-400" size={48} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          You&apos;re Offline
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-8">
          It looks like you&apos;ve lost your internet connection. Don&apos;t worry, 
          some content is still available offline.
        </p>

        {/* Actions */}
        <div className="space-y-4">
          <button
            onClick={() => window.location.reload()}
            className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <RefreshCw size={18} />
            <span>Try Again</span>
          </button>

          <div className="flex space-x-3">
            <Link
              href="/"
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Home size={16} />
              <span>Home</span>
            </Link>

            <Link
              href="/search"
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Search size={16} />
              <span>Search</span>
            </Link>
          </div>
        </div>

        {/* Offline Features */}
        <div className="mt-12 text-left">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Available Offline:
          </h2>
          
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Recently viewed programs</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Saved programs and bookmarks</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Basic search functionality</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Profile and preferences</span>
            </li>
          </ul>
        </div>

        {/* Connection Status */}
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Tip:</strong> Your data will sync automatically when you&apos;re back online.
          </p>
        </div>
      </div>
    </div>
  )
}
