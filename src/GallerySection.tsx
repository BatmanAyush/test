'use client'

import  { useState, useEffect } from 'react'
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
  const [direction, setDirection] = useState(1)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState('')
  const [isFullScreenOpen, setIsFullScreenOpen] = useState(false)

  useEffect(() => {
    if (activeSection !== 0) {
      const timer = setInterval(() => {
        handleNext()
      }, 5000) // Change image every 5 seconds for Amenities and Floor Plan
      return () => clearInterval(timer)
    }
  }, [activeSection, currentIndex])

  const handleNext = () => {
    if (activeSection !== 0) {
      setDirection(1)
      setCurrentIndex((prevIndex) =>
        prevIndex + 2 >= sections[activeSection].images.length ? 0 : prevIndex + 2
      )
    }
  }

  const handlePrevious = () => {
    if (activeSection !== 0) {
      setDirection(-1)
      setCurrentIndex((prevIndex) =>
        prevIndex - 2 < 0 ? sections[activeSection].images.length - 2 : prevIndex - 2
      )
    }
  }

  const openPopup = (image) => {
    if (activeSection === 2) {
      setSelectedImage(image)
      setIsPopupOpen(true)
    }
  }

  const openFullScreen = (image) => {
    if (activeSection === 0 || activeSection === 1) {
      setSelectedImage(image)
      setIsFullScreenOpen(true)
    }
  }

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? '100%' : '-100%',
        opacity: 0
      }
    },
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => {
      return {
        x: direction < 0 ? '100%' : '-100%',
        opacity: 0
      }
    }
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const renderImages = () => {
    if (activeSection === 0) {
      // Exterior section: display 2 images side by side
      return (
        <div className="flex justify-between">
          {sections[activeSection].images.map((image, index) => (
            <div key={index} className="w-[49%] relative">
              <img
                src={image}
                alt={`Exterior ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg cursor-pointer"
                onClick={() => openFullScreen(image)}
              />
              <div className="absolute bottom-2 right-2 text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded">
                Artist impression
              </div>
            </div>
          ))}
        </div>
      )
    } else {
      // Amenities and Floor Plan sections: display 2 images with slider
      return (
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x)

              if (swipe < -swipeConfidenceThreshold) {
                handleNext()
              } else if (swipe > swipeConfidenceThreshold) {
                handlePrevious()
              }
            }}
            className="flex justify-between relative w-full"
          >
            {[0, 1].map((offset) => {
              const imageIndex = (currentIndex + offset) % sections[activeSection].images.length
              return (
                <div key={imageIndex} className="w-[49%] relative">
                  <img
                    src={sections[activeSection].images[imageIndex]}
                    alt={`${sections[activeSection].name} ${imageIndex + 1}`}
                    className={`w-full h-64 object-cover rounded-lg ${
                      activeSection === 2 ? 'filter blur-sm cursor-pointer' : 'cursor-pointer'
                    }`}
                    onClick={() => {
                      if (activeSection === 2) {
                        openPopup(sections[activeSection].images[imageIndex])
                      } else {
                        openFullScreen(sections[activeSection].images[imageIndex])
                      }
                    }}
                  />
                  {activeSection === 1 && (
                    <div className="absolute bottom-2 right-2 text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded">
                      Artist impression
                    </div>
                  )}
                </div>
              )
            })}
          </motion.div>
        </AnimatePresence>
      )
    }
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

        <div className="mx-auto w-full max-w-4xl relative overflow-hidden">
          {renderImages()}
          {activeSection !== 0 && (
            <>
              <button
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all duration-300 z-10"
                onClick={handlePrevious}
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>
              <button
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all duration-300 z-10"
                onClick={handleNext}
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>
            </>
          )}
        </div>

        {activeSection !== 0 && (
          <div className="flex justify-center mt-4">
            {Array.from({ length: Math.ceil(sections[activeSection].images.length / 2) }).map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full mx-1 ${
                  Math.floor(currentIndex / 2) === index ? 'bg-orange-500' : 'bg-gray-300'
                }`}
                onClick={() => {
                  setDirection(index * 2 > currentIndex ? 1 : -1)
                  setCurrentIndex(index * 2)
                }}
              />
            ))}
          </div>
        )}
      </div>

      {isPopupOpen && activeSection === 2 && (
        <ImagePopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          image={selectedImage}
          sectionName="Floor Plans"
        />
      )}

      {isFullScreenOpen && (activeSection === 0 || activeSection === 1) && (
        <FullScreenImage
          image={selectedImage}
          onClose={() => setIsFullScreenOpen(false)}
        />
      )}
    </section>
  )
}

function ImagePopup({ isOpen, onClose, image, sectionName }) {
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

function FullScreenImage({ image, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div className="relative max-w-4xl w-full bg-white rounded-lg overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-800 hover:text-gray-600 transition-colors bg-white rounded-full p-1"
        >
          <X className="w-8 h-8" />
        </button>
        <img
          src={image}
          alt="Full screen view"
          className="w-full h-auto"
        />
      </div>
    </div>
  )
}