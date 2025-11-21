import { useEffect, useState } from 'react'
import { Users, MapPin, Briefcase } from 'lucide-react'

const Roommates = ({ setCurrentPage }) => {
  const [roommates, setRoommates] = useState([
    {
      id: 1,
      name: 'David Okon',
      institution: 'AAUA',
      location: 'Akungba',
      bio: 'Final year Computer Science student',
      verified: true
    },
    {
      id: 2,
      name: 'Grace Adeleke',
      institution: 'FUTA',
      location: 'Akure',
      bio: 'Engineering student, non-smoker',
      verified: true
    },
    {
      id: 3,
      name: 'Emmanuel Balogun',
      institution: 'OAU',
      location: 'Ile-Ife',
      bio: 'Quiet, loves reading',
      verified: false
    }
  ])

  useEffect(() => {
    setCurrentPage('roommates')
  }, [setCurrentPage])

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Card */}
      <div className="card gradient-secondary text-white">
        <h2 className="text-xl font-bold mb-2">Find Your Roommate</h2>
        <p className="text-white/90 text-sm">Connect with verified students</p>
      </div>

      {/* Roommates List */}
      <div className="space-y-4">
        {roommates.map((mate) => (
          <div key={mate.id} className="card hover:shadow-lg transition-all">
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                {mate.name.split(' ').map(n => n[0]).join('')}
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-textDark">{mate.name}</h3>
                  {mate.verified && (
                    <div className="badge badge-success text-xs">Verified</div>
                  )}
                </div>
                <div className="flex items-center gap-1 text-sm text-textLight mb-2">
                  <Briefcase size={14} />
                  <span>{mate.institution}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-textLight mb-2">
                  <MapPin size={14} />
                  <span>{mate.location}</span>
                </div>
                <p className="text-sm text-textLight">{mate.bio}</p>
              </div>
            </div>

            {/* Action Button */}
            <button className="btn-primary w-full mt-4">
              Connect
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Roommates