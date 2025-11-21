import { useEffect, useState } from 'react'
import { Search, Filter, MapPin, Clock, TrendingUp } from 'lucide-react'

const Browse = ({ setCurrentPage }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [rooms, setRooms] = useState([
    {
      id: 1,
      title: 'Cozy Single Room',
      location: 'Akungba-Akoko',
      price: 45000,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
      bids: 5,
      timeLeft: '2h 30m',
      featured: true
    },
    {
      id: 2,
      title: 'Spacious Self-Con',
      location: 'Aule, Akure',
      price: 65000,
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400',
      bids: 8,
      timeLeft: '45m',
      featured: true
    },
    {
      id: 3,
      title: 'Modern Studio',
      location: 'Ijapo Estate',
      price: 55000,
      image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400',
      bids: 3,
      timeLeft: '5h 15m',
      featured: false
    },
    {
      id: 4,
      title: 'Shared Apartment',
      location: 'Oba Ile',
      price: 35000,
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400',
      bids: 12,
      timeLeft: '1h 20m',
      featured: false
    }
  ])

  useEffect(() => {
    setCurrentPage('browse')
  }, [setCurrentPage])

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Search Bar */}
      <div className="card">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-textLight" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search location, price..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-2 border-transparent rounded-xl focus:border-primary-500 focus:bg-white transition-all"
            />
          </div>
          <button className="p-2.5 bg-primary-500 text-white rounded-xl hover:bg-primary-600 active:scale-95 transition-all">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-textLight">{rooms.length} rooms available</span>
        <button className="flex items-center gap-1 text-primary-500 font-semibold">
          <TrendingUp size={16} />
          <span>Sort by</span>
        </button>
      </div>

      {/* Rooms List */}
      <div className="space-y-4">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="card hover:shadow-lg transition-all cursor-pointer group"
          >
            <div className="flex gap-4">
              {/* Image */}
              <div className="w-28 h-28 rounded-xl overflow-hidden flex-shrink-0 bg-gray-200 relative">
                {room.featured && (
                  <div className="absolute top-2 left-2 bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded-lg z-10">
                    Featured
                  </div>
                )}
                <img
                  src={room.image}
                  alt={room.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-textDark mb-1 truncate">{room.title}</h3>
                <div className="flex items-center gap-1 text-textLight text-sm mb-2">
                  <MapPin size={14} />
                  <span className="truncate">{room.location}</span>
                </div>
                <div className="text-primary-600 font-bold text-xl">
                  ₦{room.price.toLocaleString()}
                  <span className="text-xs text-textLight font-normal">/mo</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-1 text-xs text-textLight">
                <Clock size={14} />
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
  )
}

export default Browse