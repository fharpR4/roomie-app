import { useNavigate, useLocation } from 'react-router-dom'
import { Home, Search, MessageCircle, Users, CreditCard, Settings, LogOut, LayoutDashboard, Gavel, HomeIcon, Plus, Receipt } from 'lucide-react'

const Sidebar = ({ currentPage, setCurrentPage, onLogout }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const mainNavItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'browse', label: 'Browse Rooms', icon: Search, path: '/browse' },
    { id: 'messages', label: 'Messages', icon: MessageCircle, path: '/messages' },
    { id: 'roommates', label: 'Roommates', icon: Users, path: '/roommates' },
    { id: 'lend-me', label: 'Lend-Me', icon: CreditCard, path: '/lend-me' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
  ]

  const quickActions = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Gavel, label: 'My Bids', path: '/my-bids' },
    { icon: HomeIcon, label: 'My Properties', path: '/my-properties' },
    { icon: Plus, label: 'Post Property', path: '/post-property' },
    { icon: Receipt, label: 'Transactions', path: '/transactions' },
  ]

  const handleNavClick = (item) => {
    setCurrentPage(item.id)
    navigate(item.path)
  }

  const handleQuickAction = (path) => {
    navigate(path)
  }

  const handleLogoutClick = () => {
    if (confirm('Are you sure you want to logout?')) {
      onLogout()
    }
  }

  const isActive = (item) => {
    if (item.path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(item.path)
  }

  return (
    <aside className="w-64 bg-white border-r border-border flex flex-col h-screen">
      {/* Logo Section */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-lg">
            <Home size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-textDark">Roomie</h1>
            <p className="text-xs text-textLight">Housing Made Easy</p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1">
          {mainNavItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item)

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl
                  transition-all duration-200 group
                  ${active 
                    ? 'bg-primary-50 text-primary-600' 
                    : 'text-textLight hover:bg-gray-50 hover:text-textDark'
                  }
                `}
              >
                <Icon 
                  size={20} 
                  className={`transition-all ${active ? 'scale-110' : 'group-hover:scale-105'}`}
                  strokeWidth={active ? 2.5 : 2}
                />
                <span className={`font-medium ${active ? 'font-semibold' : ''}`}>
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h3 className="px-4 text-xs font-semibold text-textLight uppercase tracking-wider mb-3">
            Quick Actions
          </h3>
          <div className="space-y-1">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action.path)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-textLight hover:bg-gray-50 hover:text-textDark transition-all"
                >
                  <Icon size={18} />
                  <span className="text-sm font-medium">{action.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* User Profile & Logout */}
      <div className="p-4 border-t border-border">
        {/* User Card */}
        <div className="card-flat mb-3 bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-semibold text-sm">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-textDark truncate">John Doe</p>
              <p className="text-xs text-textLight truncate">john@example.com</p>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogoutClick}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 text-error hover:bg-red-100 transition-all"
        >
          <LogOut size={18} />
          <span className="text-sm font-semibold">Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar