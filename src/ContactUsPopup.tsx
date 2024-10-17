import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface ContactPopupProps {
  isOpen: boolean
  onClose: () => void
  title: string
}

const ContactPopup: React.FC<ContactPopupProps> = ({ isOpen, onClose, title }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-[#1A1A1A] rounded-lg p-8 max-w-md w-full relative border border-[#FFD700]/30"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <button
              className="absolute top-4 right-4 text-[#FFD700] hover:text-[#FFD700]/80"
              onClick={onClose}
            >
              <X size={24} />
            </button>
            <h2 className="text-3xl font-bold text-center mb-6 text-[#FFD700]">{title}</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#FFD700]">Name</label>
                <input type="text" id="name" name="name" className="mt-1 block w-full rounded-md bg-[#2A2A2A] border-gray-600 text-white shadow-sm focus:border-[#FFD700] focus:ring focus:ring-[#FFD700] focus:ring-opacity-50" required />
              </div>
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-[#FFD700]">Mobile</label>
                <input type="tel" id="mobile" name="mobile" className="mt-1 block w-full rounded-md bg-[#2A2A2A] border-gray-600 text-white shadow-sm focus:border-[#FFD700] focus:ring focus:ring-[#FFD700] focus:ring-opacity-50" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#FFD700]">Email</label>
                <input type="email" id="email" name="email" className="mt-1 block w-full rounded-md bg-[#2A2A2A] border-gray-600 text-white shadow-sm focus:border-[#FFD700] focus:ring focus:ring-[#FFD700] focus:ring-opacity-50" required />
              </div>
              <div>
                <button type="submit" className="w-full bg-[#FFD700] text-[#1A1A1A] py-2 px-4 rounded-md font-semibold hover:bg-[#FFD700]/90 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:ring-opacity-50">
                  Submit
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