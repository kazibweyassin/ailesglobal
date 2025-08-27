import { useState, useRef } from 'react'
import { 
  Upload, 
  FileText, 
  Image, 
  CheckCircle, 
  AlertCircle, 
  X,
  Download,
  Eye,
  Clock,
  Shield,
  Zap,
  Camera,
  FileCheck,
  History,
  Share2,
  MessageSquare,
  Star,
  Filter,
  Search
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface Document {
  id: string
  name: string
  type: 'transcript' | 'essay' | 'recommendation' | 'passport' | 'financial' | 'certificate' | 'other'
  size: number
  uploadDate: Date
  status: 'pending' | 'verified' | 'rejected'
  url?: string
  preview?: string
  version?: number
  lastModified?: Date
  uploadedBy?: string
  verifiedBy?: string
  notes?: string
  tags?: string[]
  aiScore?: number
  complianceScore?: number
}

interface DocumentManagerProps {
  applicationId: string
  documents: Document[]
  onUpload: (file: File, type: string) => void
  onDelete: (documentId: string) => void
  onView?: (documentId: string) => void
  onShare?: (documentId: string) => void
  onAddNote?: (documentId: string, note: string) => void
  showAnalytics?: boolean
}

export function DocumentManager({ 
  applicationId, 
  documents, 
  onUpload, 
  onDelete, 
  onView, 
  onShare, 
  onAddNote,
  showAnalytics = true 
}: DocumentManagerProps) {
  const [dragActive, setDragActive] = useState(false)
  const [selectedType, setSelectedType] = useState('transcript')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const documentTypes = [
    { value: 'transcript', label: 'Academic Transcript', icon: FileText, required: true },
    { value: 'essay', label: 'Personal Statement', icon: FileText, required: true },
    { value: 'recommendation', label: 'Letter of Recommendation', icon: FileText, required: true },
    { value: 'passport', label: 'Passport Copy', icon: Image, required: true },
    { value: 'financial', label: 'Financial Statement', icon: FileText, required: true },
    { value: 'certificate', label: 'Language Certificate', icon: FileText, required: false },
    { value: 'other', label: 'Other Documents', icon: FileText, required: false },
  ]

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach(file => {
      if (file.size <= 10 * 1024 * 1024) { // 10MB limit
        onUpload(file, selectedType)
      } else {
        alert('File size must be less than 10MB')
      }
    })
  }

  const getDocumentsByType = (type: string) => {
    return documents.filter(doc => doc.type === type)
  }

  const getCompletionStatus = () => {
    const requiredTypes = documentTypes.filter(type => type.required).map(type => type.value)
    const completedTypes = requiredTypes.filter(type => 
      documents.some(doc => doc.type === type && doc.status === 'verified')
    )
    return { completed: completedTypes.length, total: requiredTypes.length }
  }

  const { completed, total } = getCompletionStatus()

  // Filter documents based on search and status
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || doc.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header with Analytics */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">Document Manager</h2>
            <p className="text-primary-100 mt-1">
              Secure, AI-powered document management for {applicationId}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{documents.length}</div>
              <div className="text-sm text-primary-100">Total Docs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{completed}</div>
              <div className="text-sm text-primary-100">Verified</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {documents.filter(d => d.status === 'pending').length}
              </div>
              <div className="text-sm text-primary-100">Pending</div>
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-white/20 rounded-full h-3">
          <div 
            className="bg-white h-3 rounded-full transition-all duration-500 shadow-lg"
            style={{ width: `${(completed / total) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-sm text-primary-100 mt-2">
          <span>{completed}/{total} Required Documents Complete</span>
          <span>{Math.round((completed / total) * 100)}% Complete</span>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="verified">Verified</option>
              <option value="rejected">Rejected</option>
            </select>
            <Button
              variant={viewMode === 'list' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              List
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              Grid
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Document Checklist</h3>
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-primary-500" />
            <span className="text-sm font-medium text-gray-600">
              Secure & Encrypted
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documentTypes.map(type => {
            const typeDocuments = getDocumentsByType(type.value)
            const hasVerified = typeDocuments.some(doc => doc.status === 'verified')
            const hasPending = typeDocuments.some(doc => doc.status === 'pending')
            const hasRejected = typeDocuments.some(doc => doc.status === 'rejected')

            return (
              <div key={type.value} className="group relative overflow-hidden border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${
                    hasVerified ? 'bg-success-100' :
                    hasPending ? 'bg-warning-100' :
                    hasRejected ? 'bg-error-100' : 'bg-gray-100'
                  }`}>
                    <type.icon className={`h-6 w-6 ${
                      hasVerified ? 'text-success-600' :
                      hasPending ? 'text-warning-600' :
                      hasRejected ? 'text-error-600' : 'text-gray-500'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold text-gray-900">{type.label}</span>
                      {type.required && <span className="text-primary-500 text-sm font-bold">*</span>}
                    </div>
                    <div className="text-sm text-gray-500">
                      {typeDocuments.length} file{typeDocuments.length !== 1 ? 's' : ''}
                      {typeDocuments.length > 0 && (
                        <span className="ml-2">
                          • {typeDocuments.reduce((acc, doc) => acc + doc.size, 0) / (1024 * 1024) > 1 
                            ? (typeDocuments.reduce((acc, doc) => acc + doc.size, 0) / (1024 * 1024)).toFixed(1) + ' MB'
                            : (typeDocuments.reduce((acc, doc) => acc + doc.size, 0) / 1024).toFixed(1) + ' KB'}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center">
                    {hasVerified && <CheckCircle className="h-6 w-6 text-success-500" />}
                    {hasPending && !hasVerified && <Clock className="h-6 w-6 text-warning-500" />}
                    {hasRejected && !hasVerified && <AlertCircle className="h-6 w-6 text-error-500" />}
                    {typeDocuments.length === 0 && (
                      <div className="h-6 w-6 border-2 border-gray-300 rounded-full flex items-center justify-center">
                        <div className="h-2 w-2 bg-gray-300 rounded-full"></div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Progress indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100">
                  <div 
                    className={`h-1 transition-all duration-500 ${
                      hasVerified ? 'bg-success-500' :
                      hasPending ? 'bg-warning-500' :
                      hasRejected ? 'bg-error-500' : 'bg-gray-300'
                    }`}
                    style={{ 
                      width: hasVerified ? '100%' : 
                             hasPending ? '60%' : 
                             hasRejected ? '30%' : '0%' 
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Smart Upload Area */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Smart Document Upload</h3>
          <div className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-primary-500" />
            <span className="text-sm font-medium text-gray-600">AI-Powered Validation</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Document Type Selector */}
          <div className="lg:col-span-1">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Document Type
            </label>
            <div className="space-y-2">
              {documentTypes.map(type => (
                <button
                  key={type.value}
                  onClick={() => setSelectedType(type.value)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg border-2 transition-all duration-200 ${
                    selectedType === type.value 
                      ? 'border-primary-500 bg-primary-50 shadow-md' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <type.icon className={`h-5 w-5 ${
                    selectedType === type.value ? 'text-primary-600' : 'text-gray-500'
                  }`} />
                  <div className="flex-1 text-left">
                    <div className={`font-medium ${
                      selectedType === type.value ? 'text-primary-900' : 'text-gray-900'
                    }`}>
                      {type.label}
                    </div>
                    {type.required && (
                      <div className="text-xs text-primary-600 font-medium">Required</div>
                    )}
                  </div>
                  {getDocumentsByType(type.value).some(doc => doc.status === 'verified') && (
                    <CheckCircle className="h-4 w-4 text-success-500" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Upload Zone */}
          <div className="lg:col-span-2">
            <div
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                dragActive 
                  ? 'border-primary-400 bg-primary-50 shadow-lg transform scale-105' 
                  : 'border-gray-300 hover:border-primary-300 hover:bg-primary-25'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {/* Upload Icon with Animation */}
              <div className={`mx-auto mb-4 transition-all duration-300 ${
                dragActive ? 'transform scale-110' : ''
              }`}>
                <div className="relative">
                  <Upload className={`h-16 w-16 mx-auto ${
                    dragActive ? 'text-primary-500' : 'text-gray-400'
                  } transition-colors duration-300`} />
                  {dragActive && (
                    <div className="absolute inset-0 bg-primary-500 opacity-20 rounded-full animate-ping"></div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <p className={`text-xl font-semibold transition-colors duration-300 ${
                  dragActive ? 'text-primary-900' : 'text-gray-900'
                }`}>
                  {dragActive ? 'Drop your files here!' : 'Upload Documents'}
                </p>
                <p className="text-gray-500 mb-4">
                  Drag & drop files or{' '}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-primary-600 font-medium hover:text-primary-700 underline"
                  >
                    browse to choose
                  </button>
                </p>
                
                {/* File Type Info */}
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">PDF</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">DOC</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">DOCX</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">JPG</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">PNG</span>
                  <span className="px-3 py-1 bg-primary-100 text-primary-600 text-xs rounded-full font-medium">Max 10MB</span>
                </div>

                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Camera className="h-5 w-5 mr-2" />
                  Choose Files
                </Button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={(e) => e.target.files && handleFiles(e.target.files)}
                className="hidden"
              />

              {/* AI Features Hint */}
              <div className="mt-6 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg border border-primary-200">
                <div className="flex items-center justify-center space-x-2 text-sm text-primary-700">
                  <Zap className="h-4 w-4" />
                  <span className="font-medium">AI will automatically validate and extract key information</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Document List */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Your Documents ({filteredDocuments.length})
          </h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowUploadModal(true)}
            >
              <Upload className="h-4 w-4 mr-2" />
              Quick Upload
            </Button>
          </div>
        </div>
        
        {filteredDocuments.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">No documents found</h4>
            <p className="text-gray-500 mb-6">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Upload your first document to get started'
              }
            </p>
            {!searchTerm && filterStatus === 'all' && (
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Your First Document
              </Button>
            )}
          </div>
        ) : viewMode === 'list' ? (
          <div className="space-y-4">
            {filteredDocuments.map(document => (
              <div key={document.id} className="group border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-primary-200 transition-all duration-200">
                <div className="flex items-center space-x-4">
                  {/* Document Icon */}
                  <div className={`flex-shrink-0 p-3 rounded-lg ${
                    document.status === 'verified' ? 'bg-success-100' :
                    document.status === 'pending' ? 'bg-warning-100' :
                    'bg-error-100'
                  }`}>
                    {document.name.toLowerCase().includes('.pdf') ? (
                      <FileText className={`h-8 w-8 ${
                        document.status === 'verified' ? 'text-success-600' :
                        document.status === 'pending' ? 'text-warning-600' :
                        'text-error-600'
                      }`} />
                    ) : (
                      <Image className={`h-8 w-8 ${
                        document.status === 'verified' ? 'text-success-600' :
                        document.status === 'pending' ? 'text-warning-600' :
                        'text-error-600'
                      }`} alt="Document icon" />
                    )}
                  </div>
                  
                  {/* Document Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-gray-900 truncate">
                        {document.name}
                      </h4>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        document.status === 'verified' 
                          ? 'bg-success-100 text-success-800'
                          : document.status === 'pending'
                          ? 'bg-warning-100 text-warning-800'
                          : 'bg-error-100 text-error-800'
                      }`}>
                        {document.status === 'verified' ? '✓ Verified' :
                         document.status === 'pending' ? '⏳ Pending' :
                         '✗ Rejected'}
                      </span>
                      {document.aiScore && (
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-primary-500" />
                          <span className="text-sm font-medium text-primary-600">
                            {document.aiScore}/100
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{(document.size / (1024 * 1024)).toFixed(2)} MB</span>
                      <span>•</span>
                      <span>{document.uploadDate.toLocaleDateString()}</span>
                      <span>•</span>
                      <span className="capitalize">{document.type.replace('_', ' ')}</span>
                      {document.version && document.version > 1 && (
                        <>
                          <span>•</span>
                          <span>v{document.version}</span>
                        </>
                      )}
                    </div>

                    {/* Tags */}
                    {document.tags && document.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {document.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-md">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Notes Preview */}
                    {document.notes && (
                      <div className="mt-2 p-2 bg-gray-50 rounded-md">
                        <p className="text-sm text-gray-600 line-clamp-2">{document.notes}</p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Button variant="outline" size="sm" onClick={() => onView?.(document.id)}>
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => onShare?.(document.id)}>
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => onAddNote?.(document.id, '')}>
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Note
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(document.id)}
                      className="text-error-600 hover:text-error-700 hover:border-error-300"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Compliance Score Bar */}
                {document.complianceScore && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">Compliance Score</span>
                      <span className="font-medium text-gray-900">{document.complianceScore}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          document.complianceScore >= 90 ? 'bg-success-500' :
                          document.complianceScore >= 70 ? 'bg-warning-500' :
                          'bg-error-500'
                        }`}
                        style={{ width: `${document.complianceScore}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          // Grid View
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.map(document => (
              <div key={document.id} className="group border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`p-2 rounded-lg ${
                    document.status === 'verified' ? 'bg-success-100' :
                    document.status === 'pending' ? 'bg-warning-100' :
                    'bg-error-100'
                  }`}>
                    {document.name.toLowerCase().includes('.pdf') ? (
                      <FileText className={`h-6 w-6 ${
                        document.status === 'verified' ? 'text-success-600' :
                        document.status === 'pending' ? 'text-warning-600' :
                        'text-error-600'
                      }`} />
                    ) : (
                      <Image className={`h-6 w-6 ${
                        document.status === 'verified' ? 'text-success-600' :
                        document.status === 'pending' ? 'text-warning-600' :
                        'text-error-600'
                      }`} alt="Document icon" />
                    )}
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    document.status === 'verified' 
                      ? 'bg-success-100 text-success-800'
                      : document.status === 'pending'
                      ? 'bg-warning-100 text-warning-800'
                      : 'bg-error-100 text-error-800'
                  }`}>
                    {document.status}
                  </span>
                </div>
                
                <h4 className="font-semibold text-gray-900 mb-2 truncate">{document.name}</h4>
                <p className="text-sm text-gray-500 mb-3">
                  {(document.size / (1024 * 1024)).toFixed(2)} MB • {document.uploadDate.toLocaleDateString()}
                </p>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onDelete(document.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Document History & Version Control */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          <History className="h-5 w-5 text-gray-400" />
        </div>
        
        <div className="space-y-3">
          {documents.slice(0, 5).map(document => (
            <div key={`activity-${document.id}`} className="flex items-center space-x-3 py-2">
              <div className={`w-2 h-2 rounded-full ${
                document.status === 'verified' ? 'bg-success-500' :
                document.status === 'pending' ? 'bg-warning-500' :
                'bg-error-500'
              }`} />
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">{document.name}</span> was {document.status}
                </p>
                <p className="text-xs text-gray-500">{document.uploadDate.toLocaleDateString()}</p>
              </div>
              {document.verifiedBy && (
                <span className="text-xs text-gray-500">by {document.verifiedBy}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
