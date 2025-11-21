import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { User, Mail, Lock, Phone, CreditCard, Upload, Eye, EyeOff, UserPlus } from 'lucide-react'
import toast from 'react-hot-toast'

const Register = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    nin: '',
    studentId: null,
    institution: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB')
        return
      }
      setFormData({
        ...formData,
        studentId: file
      })
      toast.success('Student ID uploaded successfully')
    }
  }

  const validateStep1 = () => {
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast.error('Please fill all fields')
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('Please enter a valid email')
      return false
    }
    if (!/^0\d{10}$/.test(formData.phone)) {
      toast.error('Please enter a valid Nigerian phone number')
      return false
    }
    return true
  }

  const validateStep2 = () => {
    if (!formData.password || !formData.confirmPassword) {
      toast.error('Please fill all password fields')
      return false
    }
    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters')
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return false
    }
    return true
  }

  const validateStep3 = () => {
    if (!formData.nin || !formData.studentId || !formData.institution) {
      toast.error('Please complete all verification fields')
      return false
    }
    if (!/^\d{11}$/.test(formData.nin)) {
      toast.error('NIN must be 11 digits')
      return false
    }
    return true
  }

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2)
    } else if (step === 2 && validateStep2()) {
      setStep(3)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateStep3()) return

    setIsLoading(true)

    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      toast.success('Registration successful! Please verify your account.')
      navigate('/verify')
    } catch (error) {
      toast.error('Registration failed. Please try again.')
      console.error('Registration error:', error)
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
            <UserPlus size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-textDark mb-2">Create Account</h1>
          <p className="text-textLight">Join Roomie today</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex items-center">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
                transition-all duration-300
                ${step >= num 
                  ? 'gradient-primary text-white shadow-lg scale-110' 
                  : 'bg-gray-200 text-textLight'
                }
              `}>
                {num}
              </div>
              {num < 3 && (
                <div className={`
                  w-12 h-1 mx-1 rounded-full transition-all duration-300
                  ${step > num ? 'bg-primary-500' : 'bg-gray-200'}
                `}></div>
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Personal Info */}
        {step === 1 && (
          <form className="space-y-4 animate-slide-up" onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
            <div>
              <label className="block text-sm font-medium text-textDark mb-2">
                Full Name
              </label>
              <div className="relative">
                <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-textLight" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="input-field pl-12"
                />
              </div>
            </div>

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

            <div>
              <label className="block text-sm font-medium text-textDark mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-textLight" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="08012345678"
                  required
                  className="input-field pl-12"
                />
              </div>
            </div>

            <button type="submit" className="btn-primary w-full">
              Next: Security
            </button>
          </form>
        )}

        {/* Step 2: Password */}
        {step === 2 && (
          <form className="space-y-4 animate-slide-up" onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
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
                  placeholder="Min. 8 characters"
                  required
                  className="input-field pl-12 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-textLight hover:text-textDark"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-textDark mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-textLight" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  required
                  className="input-field pl-12 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-textLight hover:text-textDark"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn-outline flex-1"
              >
                Back
              </button>
              <button type="submit" className="btn-primary flex-1">
                Next: Verification
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Verification */}
        {step === 3 && (
          <form className="space-y-4 animate-slide-up" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-textDark mb-2">
                National Identity Number (NIN)
              </label>
              <div className="relative">
                <CreditCard size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-textLight" />
                <input
                  type="text"
                  name="nin"
                  value={formData.nin}
                  onChange={handleChange}
                  placeholder="12345678901"
                  maxLength="11"
                  required
                  className="input-field pl-12"
                />
              </div>
              <p className="text-xs text-textLight mt-1">For accountability and safety</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-textDark mb-2">
                Institution Name
              </label>
              <div className="relative">
                <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-textLight" />
                <input
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  placeholder="e.g., AAUA, FUTA, OAU"
                  required
                  className="input-field pl-12"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-textDark mb-2">
                Student ID Card
              </label>
              <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary-500 transition-colors">
                <Upload size={32} className="text-textLight mx-auto mb-2" />
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="studentId"
                  required
                />
                <label htmlFor="studentId" className="cursor-pointer">
                  <span className="text-primary-500 font-semibold">Upload file</span>
                  <span className="text-textLight text-sm"> or drag and drop</span>
                </label>
                <p className="text-xs text-textLight mt-2">
                  {formData.studentId ? formData.studentId.name : 'PNG, JPG or PDF (max. 5MB)'}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="btn-outline flex-1"
                disabled={isLoading}
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary flex-1 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <UserPlus size={20} />
                    <span>Create Account</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Login Link */}
        <div className="text-center mt-6">
          <p className="text-textLight text-sm">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-primary-500 hover:text-primary-600 font-semibold"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register