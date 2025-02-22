'use client'

import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import logo from './Evershine Amavi-01 logo.png'

export default function ThankYouPage() {
  const navigate = useNavigate()

  return (
    <>
      {/* Google Tag Manager */}
      <script>
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-KVRW66X8');
        `}
      </script>
      {/* End Google Tag Manager */}

      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white font-sans flex flex-col">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-KVRW66X8"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <header className="bg-white shadow-md py-4">
          <div className="container mx-auto px-4">
            <img src={logo} alt="Evershine Amavi Logo" className="h-16" />
          </div>
        </header>

        <main className="flex-grow flex items-center justify-center px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-orange-600 mb-4">Thank You!</h1>
            <p className="text-xl text-gray-700 mb-8">
              We appreciate your interest. Our team will get back to you shortly.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-orange-500 text-white py-3 px-6 rounded-md font-semibold hover:bg-orange-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 flex items-center justify-center mx-auto"
              onClick={() => navigate('/')}
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back to Home
            </motion.button>
          </motion.div>
        </main>

        <footer className="bg-white py-4 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Evershine Amavi. All rights reserved.</p>
        </footer>
      </div>
    </>
  )
}
