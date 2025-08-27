'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { 
  Upload, 
  FileText, 
  Image, 
  File, 
  X, 
  CheckCircle, 
  AlertCircle,
  Eye,
  Download
} from 'lucide-react'

interface DocumentUploadProps {
  onUpload: (files: File[]) => void
  allowedTypes?: string[]
  maxFiles?: number
  maxSize?: number
}

interface UploadedDocument {
  id: string
  filename: string
  type: string
  size: number
  status: 'uploading' | 'success' | 'error' | 'analyzing'
  analysis?: {
    type: string
    score: number
    suggestions: string[]
    extractedData?: any
  }
}

export default function DocumentUpload({ 
  onUpload, 
  allowedTypes = ['application/pdf', 'image/*', 'application/msword'],
  maxFiles = 10,
  maxSize = 10 * 1024 * 1024 // 10MB
}: DocumentUploadProps) {
  const [documents, setDocuments] = useState<UploadedDocument[]>([])
  const [isUploading, setIsUploading] = useState(false)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setIsUploading(true)
    
    for (const file of acceptedFiles) {
      const docId = Math.random().toString(36).substr(2, 9)
      
      // Add document to state with uploading status
      setDocuments(prev => [...prev, {
        id: docId,
        filename: file.name,
        type: file.type,
        size: file.size,
        status: 'uploading'
      }])
      
      try {
        // Simulate upload and analysis
        await uploadDocument(file, docId)
        
        // Update status to analyzing
        setDocuments(prev => prev.map(doc => 
          doc.id === docId ? { ...doc, status: 'analyzing' as const } : doc
        ))
        
        // Simulate AI analysis
        const analysis = await analyzeDocument(file)
        
        // Update with analysis results
        setDocuments(prev => prev.map(doc => 
          doc.id === docId ? { 
            ...doc, 
            status: 'success' as const,
            analysis 
          } : doc
        ))
        
      } catch (error) {
        setDocuments(prev => prev.map(doc => 
          doc.id === docId ? { ...doc, status: 'error' as const } : doc
        ))
      }
    }
    
    setIsUploading(false)
    onUpload(acceptedFiles)
  }, [onUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: allowedTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxFiles,
    maxSize
  })

  const removeDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id))
  }

  const getFileIcon = (type: string) => {
    if (type.includes('image')) return <Image className="w-5 h-5" />
    if (type.includes('pdf')) return <FileText className="w-5 h-5" />
    return <File className="w-5 h-5" />
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />
      case 'uploading':
      case 'analyzing':
        return <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
        `}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        
        {isDragActive ? (
          <p className="text-blue-600 font-medium">Drop the files here...</p>
        ) : (
          <div>
            <p className="text-gray-600 font-medium mb-2">
              Drag & drop files here, or click to select
            </p>
            <p className="text-sm text-gray-400">
              Supports PDF, Images, Word docs up to {maxSize / (1024 * 1024)}MB
            </p>
          </div>
        )}
      </div>

      {/* Document List */}
      {documents.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Uploaded Documents</h4>
          
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                {getFileIcon(doc.type)}
                <div>
                  <p className="font-medium text-gray-900">{doc.filename}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>{(doc.size / 1024 / 1024).toFixed(2)} MB</span>
                    {getStatusIcon(doc.status)}
                    <span className="capitalize">{doc.status}</span>
                  </div>
                  
                  {/* Analysis Results */}
                  {doc.analysis && (
                    <div className="mt-2 p-3 bg-white rounded border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          AI Analysis
                        </span>
                        <span className="text-sm text-green-600 font-medium">
                          {(doc.analysis.score * 100).toFixed(0)}% Match
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">
                        Document Type: <span className="font-medium">{doc.analysis.type}</span>
                      </p>
                      
                      {doc.analysis.suggestions.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">
                            Suggestions:
                          </p>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {doc.analysis.suggestions.slice(0, 2).map((suggestion, i) => (
                              <li key={i} className="flex items-start">
                                <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0" />
                                {suggestion}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={() => removeDocument(doc.id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Simulated upload function
async function uploadDocument(file: File, docId: string): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000 + Math.random() * 2000)
  })
}

// Simulated AI analysis function
async function analyzeDocument(file: File) {
  return new Promise(resolve => {
    setTimeout(() => {
      const documentTypes = ['Transcript', 'Passport', 'Language Test', 'Recommendation Letter']
      const suggestions = [
        'Document quality is excellent',
        'All required information is clearly visible',
        'Consider getting an official translation',
        'This document meets university requirements',
        'Recommend uploading a higher resolution scan'
      ]
      
      resolve({
        type: documentTypes[Math.floor(Math.random() * documentTypes.length)],
        score: 0.75 + Math.random() * 0.25, // 75-100% score
        suggestions: suggestions.slice(0, 2 + Math.floor(Math.random() * 2)),
        extractedData: {
          // Simulated extracted data
          detectedText: file.name.includes('transcript'),
          language: 'English',
          pages: 1
        }
      })
    }, 2000 + Math.random() * 3000)
  })
}
