'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { 
  Settings, 
  User, 
  Bell, 
  Palette, 
  Database, 
  Shield, 
  LogOut, 
  Save,
  Trash2,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  ArrowLeft,
  Download,
  Upload
} from 'lucide-react'

interface UserSettings {
  theme: 'light' | 'dark' | 'auto'
  notifications: boolean
  soundEnabled: boolean
  chatHistory: boolean
  autoSave: boolean
  fontSize: 'small' | 'medium' | 'large'
  language: string
}

export default function SettingsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  
  const [settings, setSettings] = useState<UserSettings>({
    theme: 'auto',
    notifications: true,
    soundEnabled: true,
    chatHistory: true,
    autoSave: true,
    fontSize: 'medium',
    language: 'en'
  })

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/api/auth/signin')
    }
  }, [session, status, router])

  // Load settings from localStorage
  useEffect(() => {
    if (session?.user?.email) {
      const storageKey = `gemini-settings-${session.user.email}`
      const savedSettings = localStorage.getItem(storageKey)
      if (savedSettings) {
        try {
          const parsedSettings = JSON.parse(savedSettings)
          setSettings({ ...settings, ...parsedSettings })
        } catch (error) {
          console.error('Error loading settings:', error)
        }
      }
    }
  }, [session])

  // Save settings to localStorage on change
  const saveSettings = async () => {
    if (!session?.user?.email) return

    setSaveStatus('saving')
    setLoading(true)

    try {
      const storageKey = `gemini-settings-${session.user.email}`
      localStorage.setItem(storageKey, JSON.stringify(settings))
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus('idle'), 2000)
    } catch (error) {
      console.error('Error saving settings:', error)
      setSaveStatus('error')
      setTimeout(() => setSaveStatus('idle'), 2000)
    } finally {
      setLoading(false)
    }
  }

  const clearAllData = () => {
    if (!session?.user?.email) return
    
    if (window.confirm('Are you sure you want to clear all your data? This will delete your chat history, settings, and cannot be undone.?')) {
      const email = session.user.email
      // Clear chat history

      const chatStorageKey = `gemini-chat-history-${email}`
      localStorage.removeItem(chatStorageKey)
      // Clear settings
      const settingsStorageKey = `gemini-settings-${email}`
      localStorage.removeItem(settingsStorageKey)

      // Reset to defaults
      setSettings({
        theme: 'auto',
        notifications: true,
        soundEnabled: true,
        chatHistory: true,
        autoSave: true,
        fontSize: 'medium',
        language: 'en'
      })

      
      alert('All data has been cleared successfully.')
    }
  }

  const exportData = () => {
    if (!session?.user?.email) return
    
    const email = session.user.email
    const chatHistory = localStorage.getItem(`gemini-chat-history-${email}`)
    const userSettings = localStorage.getItem(`gemini-settings-${email}`)
    
    const exportData = {
      chatHistory: chatHistory ? JSON.parse(chatHistory) : [],
      settings: userSettings ? JSON.parse(userSettings) : settings,
      exportedAt: new Date().toISOString(),
      user: {
        name: session.user.name,
        email: session.user.email
      }
    }
    
    const dataStr = JSON.stringify(exportData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `gemini-ai-data-${new Date().toISOString().split('T')[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleSignOut = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      signOut()
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto max-w-4xl px-4 py-6">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 mb-6">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.push('/')}
                  className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <Settings className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      Settings
                    </h1>
                    <p className="text-sm text-gray-500">
                      Customize your AI Assistant experience
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={saveSettings}
                disabled={loading}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  saveStatus === 'saved' 
                    ? 'bg-green-500 text-white' 
                    : saveStatus === 'error'
                    ? 'bg-red-500 text-white'
                    : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white'
                } disabled:opacity-50`}
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span>
                  {saveStatus === 'saving' ? 'Saving...' : 
                   saveStatus === 'saved' ? 'Saved!' : 
                   saveStatus === 'error' ? 'Error' : 'Save Changes'}
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Profile */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <User className="w-5 h-5 text-purple-500" />
              <h2 className="text-lg font-semibold">Profile</h2>
            </div>
            <div className="text-center">
              {session.user?.image && (
                <img
                  src={session.user.image}
                  alt="Profile"
                  className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-purple-200"
                />
              )}
              <h3 className="font-medium text-gray-800">{session.user?.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{session.user?.email}</p>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 w-full justify-center px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Appearance */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Palette className="w-5 h-5 text-purple-500" />
                <h2 className="text-lg font-semibold">Appearance</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                  <div className="flex space-x-2">
                    {[
                      { value: 'light', icon: Sun, label: 'Light' },
                      { value: 'dark', icon: Moon, label: 'Dark' },
                      { value: 'auto', icon: Settings, label: 'Auto' }
                    ].map(({ value, icon: Icon, label }) => (
                      <button
                        key={value}
                        onClick={() => setSettings({ ...settings, theme: value as any })}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors ${
                          settings.theme === value
                            ? 'bg-purple-100 border-purple-300 text-purple-700'
                            : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Font Size</label>
                  <select
                    value={settings.fontSize}
                    onChange={(e) => setSettings({ ...settings, fontSize: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Privacy & Data */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-5 h-5 text-purple-500" />
                <h2 className="text-lg font-semibold">Privacy & Data</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-700">Save Chat History</label>
                    <p className="text-sm text-gray-500">Store conversations locally for future reference</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.chatHistory}
                      onChange={(e) => setSettings({ ...settings, chatHistory: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-700">Auto-save Settings</label>
                    <p className="text-sm text-gray-500">Automatically save your preferences</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.autoSave}
                      onChange={(e) => setSettings({ ...settings, autoSave: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Bell className="w-5 h-5 text-purple-500" />
                <h2 className="text-lg font-semibold">Notifications</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-700">Enable Notifications</label>
                    <p className="text-sm text-gray-500">Get notified about responses and updates</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications}
                      onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-700">Sound Effects</label>
                    <p className="text-sm text-gray-500">Enable audio feedback for interactions</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.soundEnabled}
                      onChange={(e) => setSettings({ ...settings, soundEnabled: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Data Management */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Database className="w-5 h-5 text-purple-500" />
                <h2 className="text-lg font-semibold">Data Management</h2>
              </div>
              <div className="space-y-3">
                <button
                  onClick={exportData}
                  className="flex items-center space-x-2 w-full px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Export My Data</span>
                </button>
                <button
                  onClick={clearAllData}
                  className="flex items-center space-x-2 w-full px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Clear All Data</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}