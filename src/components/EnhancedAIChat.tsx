'use client'

import { useState, useRef, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useAppStore } from '@/store/useAppStore'
import { Button } from '@/components/ui/Button'
import {
  MessageCircle,
  Send,
  X,
  Bot,
  User,
  Loader2,
  Sparkles,
  Settings
} from 'lucide-react'

export default function EnhancedAIChat() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [showProfileSetup, setShowProfileSetup] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const {
    chatMessages,
    isTyping,
    userProfile,
    sendChatMessage,
    updateUserProfile,
    clearChat
  } = useAppStore()

  useEffect(() => {
    scrollToBottom()
  }, [chatMessages, isTyping])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || !session) return

    const userMessage = message.trim()
    setMessage('')
    
    await sendChatMessage(userMessage)
  }

  const handleProfileUpdate = (updates: any) => {
    updateUserProfile(updates)
    setShowProfileSetup(false)
  }

  const suggestedQuestions = [
    "What programs match my interests?",
    "Help me choose between universities",
    "What are the scholarship opportunities?",
    "How should I prepare my application?",
    "What are the visa requirements?"
  ]

  if (!session) {
    return null
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg transition-all duration-300 z-50 ${
          isOpen 
            ? 'bg-gray-500 hover:bg-gray-600' 
            : 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600'
        } text-white flex items-center justify-center`}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-t-xl">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">AI Study Advisor</h3>
                <p className="text-xs text-gray-600">
                  {userProfile ? 'Personalized guidance' : 'Getting to know you...'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowProfileSetup(true)}
                className="p-1 hover:bg-white rounded-lg transition-colors"
                title="Profile Settings"
              >
                <Settings className="h-4 w-4 text-gray-600" />
              </button>
              <button
                onClick={clearChat}
                className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1 rounded"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatMessages.length === 0 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-primary-600" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Welcome to your AI Study Advisor!</h4>
                <p className="text-sm text-gray-600 mb-4">
                  I'm here to help you navigate your study abroad journey with personalized guidance.
                </p>
                
                {/* Suggested Questions */}
                <div className="space-y-2">
                  <p className="text-xs font-medium text-gray-700 mb-2">Try asking:</p>
                  {suggestedQuestions.slice(0, 3).map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setMessage(question)}
                      className="block w-full text-left text-xs bg-gray-50 hover:bg-gray-100 rounded-lg p-2 transition-colors"
                    >
                      "{question}"
                    </button>
                  ))}
                </div>
              </div>
            )}

            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start space-x-2`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.role === 'user' 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                  }`}>
                    {msg.role === 'user' ? <User className="h-3 w-3" /> : <Bot className="h-3 w-3" />}
                  </div>
                  <div className={`px-3 py-2 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-primary-500 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-900 rounded-bl-none'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    <p className={`text-xs mt-1 ${
                      msg.role === 'user' ? 'text-primary-100' : 'text-gray-500'
                    }`}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                    <Bot className="h-3 w-3 text-white" />
                  </div>
                  <div className="bg-gray-100 px-3 py-2 rounded-lg rounded-bl-none">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={userProfile ? "Ask me anything about studying abroad..." : "Tell me about your study goals..."}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                disabled={isTyping}
              />
              <Button
                type="submit"
                disabled={!message.trim() || isTyping}
                size="sm"
                className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white"
              >
                {isTyping ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Profile Setup Modal */}
      {showProfileSetup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Personalize Your Experience</h3>
            <p className="text-sm text-gray-600 mb-6">
              Help me provide better recommendations by sharing your preferences.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Field of Interest
                </label>
                <select
                  defaultValue={userProfile?.fieldOfInterest || ''}
                  onChange={(e) => handleProfileUpdate({ fieldOfInterest: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select field...</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Business Administration">Business Administration</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Medicine">Medicine</option>
                  <option value="Arts">Arts</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Budget Range (USD/year)
                </label>
                <select
                  onChange={(e) => {
                    const ranges: { [key: string]: [number, number] } = {
                      'low': [0, 20000],
                      'medium': [20000, 50000],
                      'high': [50000, 100000],
                      'premium': [100000, 200000]
                    }
                    handleProfileUpdate({ budgetRange: ranges[e.target.value] || null })
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select budget...</option>
                  <option value="low">$0 - $20,000</option>
                  <option value="medium">$20,000 - $50,000</option>
                  <option value="high">$50,000 - $100,000</option>
                  <option value="premium">$100,000+</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowProfileSetup(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={() => setShowProfileSetup(false)}
                className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
