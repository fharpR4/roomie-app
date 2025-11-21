import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useState, useEffect } from 'react'

// Layout Components
import TopBar from './components/layout/TopBar'
import BottomNav from './components/layout/BottomNav'
import Sidebar from './components/layout/Sidebar'

// Pages
import Home from './pages/Home'
import Browse from './pages/Browse'
import Messages from './pages/Messages'
import Roommates from './pages/Roommates'
import LendMe from './pages/LendMe'
import Settings from './pages/Settings'

// Auth Pages
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Verify from './pages/Auth/Verify'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState('home')

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('roomie_token')
      setIsAuthenticated(!!token)
    } catch (error) {
      console.error('Auth check failed:', error)
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('roomie_token')
    localStorage.removeItem('roomie_user')
    setIsAuthenticated(false)
  }

  // Loading screen
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-textLight font-medium">Loading Roomie...</p>
        </div>
      </div>
    )
  }

  // Auth pages (no layout)
  if (!isAuthenticated) {
    return (
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Toaster position="top-center" />
          <Routes>
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify" element={<Verify setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    )
  }

  // Main app with responsive layout
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Toaster position="top-center" />
        
        {/* MOBILE LAYOUT (< 768px) */}
        <div className="md:hidden">
          <div className="pb-20">
            {/* Mobile Top Bar */}
            <TopBar 
              currentPage={currentPage} 
              onLogout={handleLogout}
            />

            {/* Mobile Content */}
            <main className="max-w-lg mx-auto px-4 pt-20 pb-24">
              <Routes>
                <Route path="/" element={<Home setCurrentPage={setCurrentPage} />} />
                <Route path="/browse" element={<Browse setCurrentPage={setCurrentPage} />} />
                <Route path="/messages" element={<Messages setCurrentPage={setCurrentPage} />} />
                <Route path="/roommates" element={<Roommates setCurrentPage={setCurrentPage} />} />
                <Route path="/lend-me" element={<LendMe setCurrentPage={setCurrentPage} />} />
                <Route path="/settings" element={<Settings setCurrentPage={setCurrentPage} />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>

            {/* Mobile Bottom Nav */}
            <BottomNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
          </div>
        </div>

        {/* DESKTOP LAYOUT (>= 768px) */}
        <div className="hidden md:flex h-screen">
          {/* Desktop Sidebar */}
          <Sidebar 
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage}
            onLogout={handleLogout}
          />

          {/* Desktop Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Desktop Top Bar */}
            <TopBar 
              currentPage={currentPage} 
              onLogout={handleLogout}
              isDesktop={true}
            />

            {/* Desktop Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
              <div className="max-w-7xl mx-auto">
                <Routes>
                  <Route path="/" element={<Home setCurrentPage={setCurrentPage} />} />
                  <Route path="/browse" element={<Browse setCurrentPage={setCurrentPage} />} />
                  <Route path="/messages" element={<Messages setCurrentPage={setCurrentPage} />} />
                  <Route path="/roommates" element={<Roommates setCurrentPage={setCurrentPage} />} />
                  <Route path="/lend-me" element={<LendMe setCurrentPage={setCurrentPage} />} />
                  <Route path="/settings" element={<Settings setCurrentPage={setCurrentPage} />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>
            </main>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App