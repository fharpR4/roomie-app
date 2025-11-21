import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react'
import toast from 'react-hot-toast'

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Mock successful login
      const mockUser = {
        id: '1',
        name: 'John Doe',
        email: formData.email,
        initials: 'JD',
        verified: true
      }

      localStorage.setItem('roomie_token', 'mock_token_' + Date.now())
      localStorage.setItem('roomie_user', JSON.stringify(mockUser))

      toast.success('Welcome back!')
      setIsAuthenticated(true)
      navigate('/')
    } catch (error) {
      toast.error('Login failed. Please try again.')
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="w-20 h-20 gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <LogIn size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-textDark mb-2">Welcome Back</h1>
          <p className="text-textLight">Login to continue to Roomie</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 animate-slide-up">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-textDark mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-textLight" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="input-field pl-12"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-textDark mb-2">
              Password
            </label>
            <div className="relative">
              <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-textLight" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="input-field pl-12 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-textLight hover:text-textDark transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-primary-500 hover:text-primary-600 font-medium"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Logging in...</span>
              </>
            ) : (
              <>
                <LogIn size={20} />
                <span>Login</span>
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-border"></div>
          <span className="text-sm text-textLight">OR</span>
          <div className="flex-1 h-px bg-border"></div>
        </div>

        {/* Register Link */}
        <div className="text-center">
          <p className="text-textLight text-sm">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-primary-500 hover:text-primary-600 font-semibold"
            >
              Create Account
            </Link>
          </p>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 card-flat bg-primary-50 border-primary-200">
          <p className="text-xs text-textLight text-center mb-2 font-medium">
            Demo Credentials (for testing)
          </p>
          <div className="text-xs text-textDark text-center space-y-1">
            <p>Email: <span className="font-mono bg-white px-2 py-0.5 rounded">demo@roomie.ng</span></p>
            <p>Password: <span className="font-mono bg-white px-2 py-0.5 rounded">demo123</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login