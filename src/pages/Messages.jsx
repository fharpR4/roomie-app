import { useEffect, useState } from 'react'
import { Search, MessageCircle } from 'lucide-react'

const Messages = ({ setCurrentPage }) => {
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      lastMessage: 'Is the room still available?',
      time: '2m ago',
      unread: 2,
      avatar: null
    },
    {
      id: 2,
      name: 'Michael Chen',
      lastMessage: 'Thanks for the info!',
      time: '1h ago',
      unread: 0,
      avatar: null
    },
    {
      id: 3,
      name: 'Roomie Scout #442',
      lastMessage: 'Inspection completed. See report.',
      time: '3h ago',
      unread: 1,
      avatar: null
    }
  ])

  useEffect(() => {
    setCurrentPage('messages')
  }, [setCurrentPage])

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="card">
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-textLight" />
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-2 border-transparent rounded-xl focus:border-primary-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="space-y-3">
        {conversations.map((conv) => (
          <div
            key={conv.id}
            className="card hover:shadow-lg transition-all cursor-pointer"
          >
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white font-bold flex-shrink-0">
                {conv.name.charAt(0)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-textDark truncate">{conv.name}</h3>
                  <span className="text-xs text-textLight">{conv.time}</span>
                </div>
                <p className="text-sm text-textLight truncate">{conv.lastMessage}</p>
              </div>

              {/* Unread Badge */}
              {conv.unread > 0 && (
                <div className="w-6 h-6 rounded-full bg-primary-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {conv.unread}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {conversations.length === 0 && (
        <div className="text-center py-12">
          <MessageCircle size={64} className="text-textLight mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold text-textDark mb-2">No messages yet</h3>
          <p className="text-textLight text-sm">Start a conversation to see messages here</p>
        </div>
      )}
    </div>
  )
}

export default Messages