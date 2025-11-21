import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

const Verify = ({ setIsAuthenticated }) => {
  const navigate = useNavigate()
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (index, value) => {
    if (value.length > 1) return
    
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`code-${index + 1}`)?.focus()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const verificationCode = code.join('')
    
    if (verificationCode.length !== 6) {
      toast.error('Please enter complete verification code')
      return
    }

    setIsLoading(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      toast.success('Account verified successfully!')
      setIsAuthenticated(true)
      navigate('/')
    } catch (error) {
      toast.error('Invalid verification code')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <div className="w-20 h-20 gradient-success rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Shield size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-textDark mb-2">Verify Account</h1>
          <p className="text-textLight">Enter the 6-digit code sent to your phone</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-2 justify-center">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                className="w-12 h-14 text-center text-2xl font-bold border-2 border-border rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Verifying...</span>
              </>
            ) : (
              <>
                <CheckCircle size={20} />
                <span>Verify Account</span>
              </>
            )}
          </button>

          <button
            type="button"
            className="w-full text-primary-500 hover:text-primary-600 font-medium text-sm"
          >
            Resend Code
          </button>
        </form>
      </div>
    </div>
  )
}

export default Verify