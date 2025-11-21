import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Home as HomeIcon, UserCheck, CreditCard, TrendingUp, Clock, MapPin } from 'lucide-react'

const HomePage = ({ setCurrentPage }) => {
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    availableRooms: 127,
    activeBids: 3,
    nearbyRoommates: 45,
    unreadMessages: 12
  })

  const [featuredRooms, setFeaturedRooms] = useState([
    {
      id: 1,
      title: 'Cozy Single Room',
      location: 'Akungba-Akoko',
      price: 45000,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
      bids: 5,
      timeLeft: '2h 30m'
    },
    {
      id: 2,
      title: 'Spacious Self-Con',
      location: 'Aule, Akure',
      price: 65000,
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400',
      bids: 8,
      timeLeft: '45m'
    },
    {
      id: 3,
      title: 'Shared Apartment',
      location: 'Ijapo Estate',
      price: 35000,
      image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400',
      bids: 3,
      timeLeft: '5h 15m'
    }
  ])

  useEffect(() => {
    setCurrentPage('home')
  }, [setCurrentPage])

  const quickActions = [
    {
      icon: Search,
      label: 'Browse Rooms',
      color: 'from-primary-500 to-primary-600',
      onClick: () => navigate('/browse')
    },
    {
      icon: HomeIcon,
      label: 'Post Room',
      color: 'from-secondary-500 to-secondary-600',
      onClick: () => navigate('/post-property')
    },
    {
      icon: UserCheck,
      label: 'Book Scout',
      color: 'from-accent-500 to-accent-600',
      onClick: () => navigate('/book-scout')
    },
    {
      icon: CreditCard,
      label: 'Lend/Borrow',
      color: 'from-primary-600 to-secondary-600',
      onClick: () => navigate('/lend-me')
    }
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Card */}
      <div className="card gradient-primary text-white">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
            <p className="text-white/90 text-sm">Find your perfect room today</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
            <TrendingUp size={24} className="text-white" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="card bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200">
          <div className="text-3xl font-bold text-primary-600 mb-1">{stats.availableRooms}</div>
          <div className="text-xs text-textLight uppercase tracking-wide">Available Rooms</div>
        </div>
        <div className="card bg-gradient-to-br from-secondary-50 to-secondary-100 border border-secondary-200">
          <div className="text-3xl font-bold text-secondary-600 mb-1">{stats.activeBids}</div>
          <div className="text-xs text-textLight uppercase tracking-wide">Active Bids</div>
        </div>
        <div className="card bg-gradient-to-br from-accent-50 to-accent-100 border border-accent-200">
          <div className="text-3xl font-bold text-accent-600 mb-1">{stats.nearbyRoommates}</div>
          <div className="text-xs text-textLight uppercase tracking-wide">Roommates</div>
        </div>
        <div className="card bg-gradient-to-br from-success/10 to-success/20 border border-success/30">
          <div className="text-3xl font-bold text-success mb-1">{stats.unreadMessages}</div>
          <div className="text-xs text-textLight uppercase tracking-wide">Messages</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-bold text-textDark mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <button
                key={index}
                onClick={action.onClick}
                className={`
                  card bg-gradient-to-br ${action.color}
                  text-white p-6 flex flex-col items-center gap-3
                  hover:shadow-lg active:scale-95 transition-all
                `}
              >
                <Icon size={28} strokeWidth={2} />
                <span className="text-sm font-semibold">{action.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Featured Rooms */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-textDark">Featured Rooms</h3>
          <button
            onClick={() => navigate('/browse')}
            className="text-sm text-primary-500 font-semibold hover:text-primary-600"
          >
            View All
          </button>
        </div>
        
        <div className="space-y-3">
          {featuredRooms.map((room) => (
            <div
              key={room.id}
              onClick={() => navigate(`/room/${room.id}`)}
              className="card hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="flex gap-4">
                {/* Image */}
                <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-200">
                  <img
                    src={room.image}
                    alt={room.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-textDark mb-1 truncate">{room.title}</h4>
                  <div className="flex items-center gap-1 text-textLight text-xs mb-2">
                    <MapPin size={12} />
                    <span className="truncate">{room.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-primary-600 font-bold text-lg">
                      ₦{room.price.toLocaleString()}
                      <span className="text-xs text-textLight font-normal">/month</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                <div className="flex items-center gap-1 text-xs text-textLight">
                  <Clock size={12} />
                  <span>{room.timeLeft} left</span>
                </div>
                <div className="badge badge-info">
                  {room.bids} bids
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Spacing for Nav */}
      <div className="h-4"></div>
    </div>
  )
}

export default HomePage