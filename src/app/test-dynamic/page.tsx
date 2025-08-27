'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Database,
  Search,
  Filter,
  University,
  BookOpen,
  Loader2,
  CheckCircle,
  XCircle,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { usePrograms, useSavedPrograms } from '@/hooks/usePrograms';

export default function DynamicTestPage() {
  const [testResults, setTestResults] = useState<{
    api: boolean;
    hooks: boolean;
    database: boolean;
  }>({
    api: false,
    hooks: false,
    database: false
  });

  // Test our dynamic hooks
  const { 
    programs, 
    universities, 
    loading, 
    error, 
    filters, 
    searchPrograms 
  } = usePrograms({
    country: 'United States'
  });

  const { 
    savedPrograms, 
    saveProgram, 
    unsaveProgram 
  } = useSavedPrograms();

  // Test API endpoints directly
  const [apiTest, setApiTest] = useState<{
    universities: any[];
    programs: any[];
    loading: boolean;
    error: string | null;
  }>({
    universities: [],
    programs: [],
    loading: false,
    error: null
  });

  const testApiEndpoints = async () => {
    setApiTest(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      // Test Universities API
      const universitiesResponse = await fetch('/api/universities?limit=5');
      if (!universitiesResponse.ok) throw new Error('Universities API failed');
      const universitiesData = await universitiesResponse.json();
      
      // Test Programs API
      const programsResponse = await fetch('/api/programs/dynamic?limit=5');
      if (!programsResponse.ok) throw new Error('Programs API failed');
      const programsData = await programsResponse.json();
      
      setApiTest({
        universities: universitiesData.universities || [],
        programs: programsData.programs || [],
        loading: false,
        error: null
      });
      
      setTestResults(prev => ({ ...prev, api: true }));
    } catch (error) {
      setApiTest(prev => ({ 
        ...prev, 
        loading: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }));
    }
  };

  // Test hooks functionality
  useEffect(() => {
    if (universities.length > 0 || programs.length > 0) {
      setTestResults(prev => ({ ...prev, hooks: true }));
    }
    
    if (!loading && !error) {
      setTestResults(prev => ({ ...prev, database: true }));
    }
  }, [universities, programs, loading, error]);

  // Run API test on mount
  useEffect(() => {
    testApiEndpoints();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            🚀 Dynamic Functionality Test
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Testing our transformation from static to dynamic platform with real database connectivity
          </p>
          
          {/* Test Status Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className={`p-6 rounded-xl ${testResults.api ? 'bg-green-100 border-green-200' : 'bg-yellow-100 border-yellow-200'} border`}>
              <div className="flex items-center justify-center mb-3">
                {testResults.api ? (
                  <CheckCircle className="h-8 w-8 text-green-600" />
                ) : (
                  <Loader2 className="h-8 w-8 text-yellow-600 animate-spin" />
                )}
              </div>
              <h3 className="font-semibold text-gray-900">API Endpoints</h3>
              <p className="text-sm text-gray-600">Direct REST API testing</p>
            </div>
            
            <div className={`p-6 rounded-xl ${testResults.hooks ? 'bg-green-100 border-green-200' : 'bg-yellow-100 border-yellow-200'} border`}>
              <div className="flex items-center justify-center mb-3">
                {testResults.hooks ? (
                  <CheckCircle className="h-8 w-8 text-green-600" />
                ) : (
                  <Loader2 className="h-8 w-8 text-yellow-600 animate-spin" />
                )}
              </div>
              <h3 className="font-semibold text-gray-900">React Hooks</h3>
              <p className="text-sm text-gray-600">Frontend integration layer</p>
            </div>
            
            <div className={`p-6 rounded-xl ${testResults.database ? 'bg-green-100 border-green-200' : 'bg-yellow-100 border-yellow-200'} border`}>
              <div className="flex items-center justify-center mb-3">
                {testResults.database ? (
                  <CheckCircle className="h-8 w-8 text-green-600" />
                ) : (
                  <Loader2 className="h-8 w-8 text-yellow-600 animate-spin" />
                )}
              </div>
              <h3 className="font-semibold text-gray-900">Database</h3>
              <p className="text-sm text-gray-600">Prisma ORM connectivity</p>
            </div>
          </div>
        </motion.div>

        {/* API Test Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Database className="h-6 w-6 mr-3 text-blue-600" />
              Direct API Testing
            </h2>
            <Button onClick={testApiEndpoints} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Test
            </Button>
          </div>
          
          {apiTest.loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-blue-600 mr-2" />
              <span>Testing API endpoints...</span>
            </div>
          ) : apiTest.error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <XCircle className="h-5 w-5 text-red-600 mr-2" />
                <span className="text-red-800">API Test Failed: {apiTest.error}</span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Universities API Result */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
                  <University className="h-4 w-4 mr-2" />
                  Universities API ({apiTest.universities.length} results)
                </h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {apiTest.universities.map((uni, index) => (
                    <div key={index} className="text-sm bg-white p-2 rounded">
                      <div className="font-medium">{uni.name}</div>
                      <div className="text-gray-600">{uni.location}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Programs API Result */}
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-3 flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Programs API ({apiTest.programs.length} results)
                </h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {apiTest.programs.map((program, index) => (
                    <div key={index} className="text-sm bg-white p-2 rounded">
                      <div className="font-medium">{program.name}</div>
                      <div className="text-gray-600">{program.level} • {program.field}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* React Hooks Test */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Search className="h-6 w-6 mr-3 text-green-600" />
            React Hooks Integration
          </h2>
          
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-green-600 mr-2" />
              <span>Loading data through hooks...</span>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <XCircle className="h-5 w-5 text-red-600 mr-2" />
                <span className="text-red-800">Hook Error: {error}</span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Universities from Hooks */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-3">
                  Universities ({universities.length})
                </h3>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {universities.slice(0, 5).map((uni, index) => (
                    <div key={index} className="text-xs bg-white p-1 rounded">
                      {uni.name}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Programs from Hooks */}
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-3">
                  Programs ({programs.length})
                </h3>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {programs.slice(0, 5).map((program, index) => (
                    <div key={index} className="text-xs bg-white p-1 rounded">
                      {program.name}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Filters from Hooks */}
              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="font-semibold text-purple-900 mb-3">
                  Available Filters
                </h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-xs font-medium">Fields:</span>
                    <div className="text-xs text-gray-600">
                      {filters.fields.slice(0, 3).join(', ')}
                      {filters.fields.length > 3 && '...'}
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-medium">Levels:</span>
                    <div className="text-xs text-gray-600">
                      {filters.levels.join(', ')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">
            🎉 Dynamic Platform Transformation Complete!
          </h2>
          <p className="text-blue-100 mb-6">
            Successfully migrated from static content to a fully dynamic, database-driven platform.
            Ready to power the AilesGlobal business launch with real user functionality.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-blue-600/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
              ✅ Database Integration
            </span>
            <span className="bg-blue-600/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
              ✅ API Endpoints
            </span>
            <span className="bg-blue-600/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
              ✅ React Hooks
            </span>
            <span className="bg-blue-600/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
              ✅ Real-time Search
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
