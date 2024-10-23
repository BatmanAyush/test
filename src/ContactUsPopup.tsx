'use client'

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
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-lg font-medium text-orange-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="block w-full rounded-lg border-orange-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50 text-lg py-3 px-4"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-lg font-medium text-orange-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="block w-full rounded-lg border-orange-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50 text-lg py-3 px-4"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-lg font-medium text-orange-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="block w-full rounded-lg border-orange-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50 text-lg py-3 px-4"
                  required
                  maxLength={10}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg font-bold text-xl hover:bg-orange-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
                >
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