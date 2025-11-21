import { useEffect } from 'react'
import { User, Bell, Shield, HelpCircle, LogOut, ChevronRight } from 'lucide-react'

const Settings = ({ setCurrentPage }) => {
  useEffect(() => {
    setCurrentPage('settings')
  }, [setCurrentPage])

  const settingsSections = [
    {
      title: 'Account',
      items: [
        { icon: User, label: 'Edit Profile', path: '/profile' },
        { icon: Shield, label: 'Privacy & Security', path: '/privacy' },
        { icon: Bell, label: 'Notifications', path: '/notifications' }
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help Center', path: '/help' },
      ]
    }
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Profile Card */}
      <div className="card gradient-primary text-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-xl">
            JD
          </div>
          <div>
            <h2 className="text-xl font-bold">John Doe</h2>
            <p className="text-white/90 text-sm">john@example.com</p>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      {settingsSections.map((section, idx) => (
        <div key={idx}>
          <h3 className="text-sm font-semibold text-textLight uppercase tracking-wide mb-3">
            {section.title}
          </h3>
          <div className="card space-y-1">
            {section.items.map((item, itemIdx) => {
              const Icon = item.icon
              return (
                <button
                  key={itemIdx}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} className="text-primary-500" />
                    <span className="font-medium text-textDark">{item.label}</span>
                  </div>
                  <ChevronRight size={20} className="text-textLight" />
                </button>
              )
            })}
          </div>
        </div>
      ))}

      {/* Logout Button */}
      <button className="w-full card hover:bg-red-50 transition-colors flex items-center justify-center gap-3 text-error font-semibold">
        <LogOut size={20} />
        <span>Logout</span>
      </button>

      {/* App Version */}
      <p className="text-center text-xs text-textLight">
        Roomie v1.0.0
      </p>
    </div>
  )
}

export default Settings