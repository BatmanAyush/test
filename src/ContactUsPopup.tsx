'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface ContactPopupProps {
  isOpen: boolean
  onClose: () => void
  title: string
  source:string
}

const ContactPopup: React.FC<ContactPopupProps> = ({ isOpen, onClose, title, source }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [utmParams, setUtmParams] = useState<any>({})
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const navigate = useNavigate();

  // Extract UTM parameters from the URL on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const utmData = {
      utmCampaign: urlParams.get('UTM_Campaign') || '',
      utmSource: urlParams.get('UTM_Source') || '',
      utmTerm: urlParams.get('UTM_Term') || '',
      utmPlacement: urlParams.get('UTM_Placement') || '',
      utmDevice: urlParams.get('UTM_Device') || '',
      utmMedium: urlParams.get('UTM_Medium') || '',
      utmSubsource: urlParams.get('UTM_Subsource') || '',
      utmGclid: urlParams.get('UTM_GCLID') || '',
      utmAdGroup: urlParams.get('UTM_Ad_Group') || '',
      utmAd: urlParams.get('UTM_Ad') || '',
      utmChannel: urlParams.get('UTM_Channel') || '',
    }
    setUtmParams(utmData)
  }, [])

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    if (!name.trim()) newErrors.name = 'Name is required'
    if (!email.trim()) newErrors.email = 'Email is required'
    if (!phone.trim()) newErrors.phone = 'Phone is required'
    if (phone.trim().length !== 10) newErrors.phone = 'Phone number must be 10 digits'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Invalid email format'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    const data = {
      name,
      email,
      phone,
      createdDateTime: new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000).toISOString(),
      source: source, // assuming "website" as the source
      ...utmParams,
    }

    try {
      const response = await fetch('https://springboot-sheets.onrender.com/api/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
    navigate('/thankyou')
        setName('')
        setEmail('')
        setPhone('')
        onClose()
      } else {
        alert('Failed to add data.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred while adding data.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-10 max-w-lg w-full mx-4 relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-6 right-6 text-orange-600 hover:text-orange-800 transition-colors duration-300"
              onClick={onClose}
            >
              <X className="w-8 h-8" />
            </button>
            <h2 className="text-4xl font-bold mb-8 text-orange-800 font-serif">{title}</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-lg font-medium text-orange-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`block w-full rounded-lg border-orange-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50 text-lg py-3 px-4 ${
                    errors.name ? 'border-red-500' : ''
                  }`}
                  required
                />
                {errors.name && <p className="mt-1 text-red-500">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-lg font-medium text-orange-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`block w-full rounded-lg border-orange-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50 text-lg py-3 px-4 ${
                    errors.email ? 'border-red-500' : ''
                  }`}
                  required
                />
                {errors.email && <p className="mt-1 text-red-500">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="block text-lg font-medium text-orange-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`block w-full rounded-lg border-orange-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50 text-lg py-3 px-4 ${
                    errors.phone ? 'border-red-500' : ''
                  }`}
                  required
                  maxLength={10}
                />
                {errors.phone && <p className="mt-1 text-red-500">{errors.phone}</p>}
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg font-bold text-xl hover:bg-orange-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform flex items-center justify-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    'Submit'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ContactPopup
