'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

// Import your images here
import exterior1 from './builder.jpg'
import exterior2 from './Elevation Warm (1).jpg'
import amenities1 from './2.jpg'
import amenities2 from './4.jpg'
import amenities3 from './6.jpg'
import amenities4 from './7.jpg'
import floorPlan1 from './WhatsApp Image 2024-10-21 at 19.56.07 (1).jpeg'
import floorPlan2 from './WhatsApp Image 2024-10-21 at 19.56.07 (2).jpeg'
import floorPlan3 from './WhatsApp Image 2024-10-21 at 19.56.07.jpeg'
import floorPlan4 from './WhatsApp Image 2024-10-21 at 19.56.08.jpeg'

const sections = [
  { name: 'Exterior', images: [exterior1, exterior2] },
  { name: 'Amenities', images: [amenities1, amenities2, amenities3, amenities4] },
  { name: 'Floor Plan', images: [floorPlan1, floorPlan2, floorPlan3, floorPlan4] },
]

export default function GallerySection() {
  const [activeSection, setActiveSection] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState('')

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext()
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(timer)
  }, [activeSection, currentIndex])

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === sections[activeSection].images.length ? 0 : prevIndex + 1
    )
  }

  const handlePrevious = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? sections[activeSection].images.length - 1 : prevIndex - 1
    )
  }

  const openPopup = (image) => {
    if (activeSection === 2) {
      setSelectedImage(image)
      setIsPopupOpen(true)
    }
  }

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  }

  return (
    <section className="py-20 px-4 md:px-0 bg-white">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">GALLERY</h2>
        <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
        
        <div className="flex flex-wrap justify-center mb-8">
          {sections.map((section, index) => (
            <button
              key={section.name}
              className={`px-4 py-2 m-2 rounded-md ${
                activeSection === index
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
              onClick={() => {
                setActiveSection(index)
                setCurrentIndex(0)
              }}
            >
              {section.name}
            </button>
          ))}
        </div>

        <div className="relative mx-auto w-full max-w-lg aspect-[16/9] overflow-hidden rounded-lg shadow-lg">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={`${activeSection}-${currentIndex}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 },
                scale: { duration: 0.5 },
              }}
              className="absolute w-full h-full"
            >
              <motion.img
                src={sections[activeSection].images[currentIndex]}
                alt={`${sections[activeSection].name} image ${currentIndex + 1}`}
                className={`w-full h-full object-cover ${
                  activeSection === 2 ? 'filter blur-sm cursor-pointer' : ''
                }`}
                onClick={() => {
                  if (activeSection === 2) openPopup(sections[activeSection].images[currentIndex])
                }}
                whileHover={activeSection === 2 ? { scale: 1.05 } : {}}
                transition={{ duration: 0.3 }}
              />
              {activeSection !== 2 && (
                <div className="absolute bottom-2 right-2 text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded">
                  Artist impression
                </div>
              )}
            </motion.div>
          </AnimatePresence>
          <button
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all duration-300"
            onClick={handlePrevious}
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <button
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all duration-300"
            onClick={handleNext}
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>
        </div>

        <div className="flex justify-center mt-4">
          {sections[activeSection].images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full mx-1 ${
                index === currentIndex ? 'bg-orange-500' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>

      {isPopupOpen && activeSection === 2 && (
        <ImagePopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          sectionName="Floor Plans"
        />
      )}
    </section>
  )
}

function ImagePopup({ isOpen, onClose, sectionName }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
        <div className="bg-orange-500 text-white py-4 px-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{sectionName}</h2>
            <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div className="p-6">
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" id="name" name="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50" required />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="email" name="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50" required />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
              <input type="tel" id="phone" name="phone" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50" required />
            </div>
            <button type="submit" className="w-full bg-orange-500 text-white py-3 px-4 rounded-md font-semibold hover:bg-orange-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">
              Register for More Information
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}