import { useEffect, useState } from 'react'
import { CreditCard, Plus } from 'lucide-react'

const LendMe = ({ setCurrentPage }) => {
  const [items, setItems] = useState([
    {
      id: 1,
      title: 'Scientific Calculator',
      owner: 'John Doe',
      price: 500,
      duration: 'per day',
      available: true
    },
    {
      id: 2,
      title: 'Engineering Drawing Set',
      owner: 'Sarah Chen',
      price: 300,
      duration: 'per day',
      available: false
    }
  ])

  useEffect(() => {
    setCurrentPage('lend-me')
  }, [setCurrentPage])

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="card gradient-accent text-white">
        <h2 className="text-xl font-bold mb-2">Lend-Me Marketplace</h2>
        <p className="text-white/90 text-sm">Borrow or lend items to fellow students</p>
      </div>

      {/* Post Item Button */}
      <button className="btn-primary w-full flex items-center justify-center gap-2">
        <Plus size={20} />
        <span>Post Item to Lend</span>
      </button>

      {/* Items List */}
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="card hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-textDark">{item.title}</h3>
              {item.available ? (
                <div className="badge badge-success">Available</div>
              ) : (
                <div className="badge badge-error">Rented</div>
              )}
            </div>
            <p className="text-sm text-textLight mb-3">Owner: {item.owner}</p>
            <div className="flex items-center justify-between">
              <div className="text-primary-600 font-bold text-lg">
                ₦{item.price}
                <span className="text-xs text-textLight font-normal">/{item.duration}</span>
              </div>
              <button
                disabled={!item.available}
                className="btn-primary text-sm py-2 px-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Borrow
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LendMe