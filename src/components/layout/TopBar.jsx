import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Bell, LayoutDashboard, Gavel, Home as HomeIcon, Plus, Receipt, LogOut } from 'lucide-react'

const TopBar = ({ currentPage, onLogout, isDesktop = false }) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [notificationCount, setNotificationCount] = useState(3)
  const [user, setUser] = useState(null)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const userData = localStorage.getItem('roomie_user')
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      setUser({
        name: 'John Doe',
        initials: 'JD',
        avatar: null
      })
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const pageTitles = {
    home: 'Home',
    browse: 'Browse Rooms',
    messages: 'Messages',
    roommates: 'Find Roommates',
    'lend-me': 'Lend-Me',
    settings: 'Settings'
  }

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Gavel, label: 'My Bids', path: '/my-bids' },
    { icon: HomeIcon, label: 'My Properties', path: '/my-properties' },
    { icon: Plus, label: 'Post Property', path: '/post-property' },
    { icon: Receipt, label: 'Transactions', path: '/transactions' },
  ]

  const handleMenuClick = (path) => {
    setShowDropdown(false)
    navigate(path)
  }

  const handleLogoutClick = () => {
    setShowDropdown(false)
    if (confirm('Are you sure you want to logout?')) {
      onLogout()
    }
  }

  // DESKTOP VERSION
  if (isDesktop) {
    return (
      <header className="bg-white border-b border-border px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Page Title */}
          <h1 className="text-2xl font-bold text-textDark">
            {pageTitles[currentPage] || 'Roomie'}
          </h1>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative w-80">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-textLight" />
              <input
                type="text"
                placeholder="Search rooms, roommates..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-border rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all text-sm"
              />
            </div>

            {/* Notifications */}
            <button
              onClick={() => navigate('/notifications')}
              className="relative p-2 rounded-xl hover:bg-gray-50 transition-colors"
              aria-label="Notifications"
            >
              <Bell size={20} className="text-textDark" />
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-error text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-white font-semibold text-sm">
                  {user?.initials || 'U'}
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-textDark">{user?.name}</p>
                  <p className="text-xs text-textLight">View Profile</p>
                </div>
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 top-full mt-2 bg-white rounded-2xl shadow-xl w-56 overflow-hidden z-50 animate-slide-down">
                  <div className="py-2">
                    {menuItems.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleMenuClick(item.path)}
                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                      >
                        <item.icon size={18} className="text-primary-500" />
                        <span className="text-sm font-medium text-textDark">{item.label}</span>
                      </button>
                    ))}
                  </div>
                  <div className="border-t border-border">
                    <button
                      onClick={handleLogoutClick}
                      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-red-50 transition-colors text-left"
                    >
                      <LogOut size={18} className="text-error" />
                      <span className="text-sm font-medium text-error">Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    )
  }

  // MOBILE VERSION
  return (
    <>
      <div className="fixed top-0 left-0 right-0 bg-white shadow-top z-50 safe-top">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-semibold text-sm shadow-lg active:scale-95 transition-transform"
          >
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              user?.initials || 'U'
            )}
          </button>

          <h1 className="text-lg font-bold text-textDark flex-1 text-center">
            {pageTitles[currentPage] || 'Roomie'}
          </h1>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/browse')}
              className="p-2 rounded-lg hover:bg-gray-100 active:scale-95 transition-all"
              aria-label="Search"
            >
              <Search size={20} className="text-textDark" />
            </button>

            <button
              onClick={() => navigate('/notifications')}
              className="p-2 rounded-lg hover:bg-gray-100 active:scale-95 transition-all relative"
              aria-label="Notifications"
            >
              <Bell size={20} className="text-textDark" />
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full border-2 border-white"></span>
              )}
            </button>
          </div>
        </div>
      </div>

      {showDropdown && (
        <>
          <div
            ref={dropdownRef}
            className="fixed top-16 left-4 bg-white rounded-2xl shadow-xl w-56 overflow-hidden z-50 animate-slide-down"
          >
            <div className="px-4 py-3 border-b border-border bg-gradient-to-r from-primary-50 to-secondary-50">
              <p className="font-semibold text-textDark text-sm">{user?.name}</p>
              <p className="text-xs text-textLight">View Profile</p>
            </div>

            <div className="py-2">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleMenuClick(item.path)}
                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                >
                  <item.icon size={18} className="text-primary-500" />
                  <span className="text-sm font-medium text-textDark">{item.label}</span>
                </button>
              ))}
            </div>

            <div className="border-t border-border">
              <button
                onClick={handleLogoutClick}
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-red-50 transition-colors text-left"
              >
                <LogOut size={18} className="text-error" />
                <span className="text-sm font-medium text-error">Logout</span>
              </button>
            </div>
          </div>

          <div
            className="fixed inset-0 bg-black/20 z-40 animate-fade-in"
            onClick={() => setShowDropdown(false)}
          ></div>
        </>
      )}
    </>
  )
}

export default TopBar