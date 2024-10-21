'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react'

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
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState('')
  const [isZoomed, setIsZoomed] = useState(false)

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === sections[activeSection].images.length ? 0 : prevIndex + 1
    )
  }

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? sections[activeSection].images.length - 1 : prevIndex - 1
    )
  }

  const openPopup = (image: string) => {
    if (activeSection === 2) {
      setSelectedImage(image)
      setIsPopupOpen(true)
    }
  }

  const toggleZoom = () => {
    if (activeSection === 1) {
      setIsZoomed(!isZoomed)
    }
  }

  const slideVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
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
                setIsZoomed(false)
              }}
            >
              {section.name}
            </button>
          ))}
        </div>

        <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeSection}-${currentIndex}`}
              className="relative overflow-hidden rounded-lg"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={slideVariants}
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={sections[activeSection].images[currentIndex]}
                  alt={`${sections[activeSection].name} image ${currentIndex + 1}`}
                  className={`w-full h-full transition-all duration-300 ${
                    activeSection === 2 ? 'filter blur-sm cursor-default object-cover' :
                    activeSection === 1 ? (isZoomed ? 'cursor-zoom-out object-contain' : 'cursor-zoom-in object-cover hover:scale-105') :
                    'object-cover hover:scale-105'
                  }`}
                  onClick={() => {
                    if (activeSection === 1) {
                      toggleZoom()
                    } else if (activeSection === 2) {
                      openPopup(sections[activeSection].images[currentIndex])
                    }
                  }}
                />
              </div>
              {activeSection === 2 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span 
                    className="text-white text-lg font-semibold bg-black bg-opacity-50 px-4 py-2 rounded cursor-pointer"
                    onClick={() => openPopup(sections[activeSection].images[currentIndex])}
                  >
                    Click to view details
                  </span>
                </div>
              )}
              <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                Artist's impression
              </div>
            </motion.div>
          </AnimatePresence>
          <button
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-all duration-300"
            onClick={handlePrevious}
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <button
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-all duration-300"
            onClick={handleNext}
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>
          {activeSection === 1 && (
            <button
              className="absolute bottom-4 left-4 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-all duration-300"
              onClick={toggleZoom}
            >
              {isZoomed ? (
                <ZoomOut className="w-6 h-6 text-gray-800" />
              ) : (
                <ZoomIn className="w-6 h-6 text-gray-800" />
              )}
            </button>
          )}
        </div>
        <div className="flex justify-center mt-4">
          {sections[activeSection].images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full mx-1 focus:outline-none ${
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
          image={selectedImage}
          sectionName="Floor Plans"
        />
      )}
    </section>
  )
}

function ImagePopup({ isOpen, onClose, image, sectionName }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">{sectionName}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <img src={image} alt={sectionName} className="w-full h-auto rounded-lg" />
            </div>
            <div className="md:w-1/2">
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
                <button type="submit" className="w-full bg-orange-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-orange-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">
                  Request More Information
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}