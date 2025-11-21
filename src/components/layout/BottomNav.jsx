import { useNavigate, useLocation } from 'react-router-dom'
import { Home, Users, MessageCircle, CreditCard, Settings } from 'lucide-react'

const BottomNav = ({ currentPage, setCurrentPage }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { id: 'roommates', label: 'Roommates', icon: Users, path: '/roommates' },
    { id: 'messages', label: 'Messages', icon: MessageCircle, path: '/messages' },
    { id: 'home', label: 'Home', icon: Home, path: '/', isCenter: true },
    { id: 'lend-me', label: 'Lend-Me', icon: CreditCard, path: '/lend-me' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
  ]

  const handleNavClick = (item) => {
    setCurrentPage(item.id)
    navigate(item.path)
  }

  const isActive = (item) => {
    if (item.path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(item.path)
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-nav z-40 safe-bottom">
      <div className="max-w-lg mx-auto px-4 pt-2 pb-3">
        <div className="flex items-end justify-between">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item)

            // Center Home button with special styling
            if (item.isCenter) {
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className="flex flex-col items-center px-4 -mt-4 group"
                >
                  <div className={`
                    w-14 h-14 rounded-full shadow-lg 
                    flex items-center justify-center mb-1
                    transition-all duration-200
                    ${active 
                      ? 'gradient-primary scale-110' 
                      : 'bg-white border-2 border-primary-500 group-hover:scale-105'
                    }
                  `}>
                    <Icon 
                      size={24} 
                      className={active ? 'text-white' : 'text-primary-500'}
                      strokeWidth={2.5}
                    />
                  </div>
                  <span className={`
                    text-xs font-medium transition-colors
                    ${active ? 'text-primary-500' : 'text-textLight'}
                  `}>
                    {item.label}
                  </span>
                </button>
              )
            }

            // Regular nav items
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className="flex flex-col items-center px-3 py-2 rounded-xl transition-all group min-w-0"
              >
                <div className={`
                  p-2 rounded-xl transition-all
                  ${active 
                    ? 'bg-primary-50' 
                    : 'group-hover:bg-gray-50'
                  }
                `}>
                  <Icon 
                    size={22} 
                    className={`
                      transition-colors
                      ${active ? 'text-primary-500' : 'text-textLight'}
                    `}
                    strokeWidth={active ? 2.5 : 2}
                  />
                </div>
                <span className={`
                  text-[10px] font-medium mt-1 transition-colors
                  ${active ? 'text-primary-500' : 'text-textLight'}
                `}>
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default BottomNav