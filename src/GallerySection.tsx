'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react'

// Import your images here
import exterior1 from './builder.jpg'
import exterior2 from './Elevation Warm (1).jpg'
import amenities1 from './2.jpg'
import amenities2 from './4.jpg'
import amenities3 from './5.jpg'
import amenities4 from './7.jpg'
import floorPlan1 from './WhatsApp Image 2024-10-19 at 20.42.21 (1).jpeg'
import floorPlan2 from './WhatsApp Image 2024-10-19 at 20.42.21.jpeg'
import floorPlan3 from './WhatsApp Image 2024-10-19 at 20.42.22 (1).jpeg'
import floorPlan4 from './WhatsApp Image 2024-10-19 at 20.42.22.jpeg'

const sections = [
  { name: 'Exterior', images: [exterior1, exterior2] },
  { name: 'Amenities', images: [amenities1, amenities2, amenities3, amenities4] },
  { name: 'Floor Plan', images: [floorPlan1, floorPlan2, floorPlan3, floorPlan4] },
]

export default function GallerySection() {
  const [activeSection, setActiveSection] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
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

  const toggleZoom = () => {
    setIsZoomed(!isZoomed)
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
            {activeSection === 0 ? (
              <motion.div
                key="exterior"
                className="flex flex-col md:flex-row"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={slideVariants}
              >
                {sections[0].images.map((image, index) => (
                  <div key={index} className="relative overflow-hidden rounded-lg w-full md:w-1/2 p-2">
                    <img
                      src={image}
                      alt={`Exterior ${index + 1}`}
                      className="w-full h-[200px] md:h-[400px] object-cover transition-all duration-300 hover:scale-105"
                    />
                  </div>
                ))}
              </motion.div>
            ) : (
              <div className="relative overflow-hidden rounded-lg">
                <motion.img
                  key={`${activeSection}-${currentIndex}`}
                  src={sections[activeSection].images[currentIndex]}
                  alt={`${sections[activeSection].name} image ${currentIndex + 1}`}
                  className={`w-full transition-all duration-300 ${
                    isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in h-[200px] md:h-[400px] object-cover hover:scale-105'
                  }`}
                  style={isZoomed ? { height: 'auto', maxHeight: '80vh', objectFit: 'contain' } : {}}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={slideVariants}
                  onClick={toggleZoom}
                />
              </div>
            )}
          </AnimatePresence>
          {activeSection !== 0 && (
            <>
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
              <button
                className="absolute bottom-4 right-4 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-all duration-300"
                onClick={toggleZoom}
              >
                {isZoomed ? (
                  <ZoomOut className="w-6 h-6 text-gray-800" />
                ) : (
                  <ZoomIn className="w-6 h-6 text-gray-800" />
                )}
              </button>
            </>
          )}
        </div>
        {activeSection !== 0 && (
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
        )}
      </div>
    </section>
  )
}