'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import jpg2 from './2.jpg'
import jp5 from './5.jpg'
import jpg1 from './image00001.jpeg'
import jpg3 from './image00002.jpeg'

const images = [jpg1, jpg2, jpg3, jp5]

export default function GallerySection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      switchImage(1)
    }, 5000)

    return () => clearInterval(timer)
  }, [currentIndex])

  const slideVariants = {
    hiddenRight: {
      x: "100%",
      opacity: 0,
    },
    hiddenLeft: {
      x: "-100%",
      opacity: 0,
    },
    visible: {
      x: "0",
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
      },
    },
    exit: {
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
      },
    },
  }

  const switchImage = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prevIndex) => {
      if (newDirection === 1) {
        return prevIndex === images.length - 1 ? 0 : prevIndex + 1
      }
      return prevIndex === 0 ? images.length - 1 : prevIndex - 1
    })
  }

  return (
    <section className="py-20 px-4 md:px-0 bg-gradient-to-b from-gray-100 to-white">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-3 text-gray-800">Gallery</h2>
        <div className="w-24 h-1 bg-[#FFD700] mx-auto mb-8 mt-0"></div>
        <div className="flex justify-center items-center space-x-8">
          <button
            onClick={() => switchImage(-1)}
            className="bg-gray-200 text-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <div className="relative w-full max-w-3xl aspect-video bg-white rounded-lg shadow-2xl overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                alt={`Gallery image ${currentIndex + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
                custom={direction}
                variants={slideVariants}
                initial={direction > 0 ? "hiddenRight" : "hiddenLeft"}
                animate="visible"
                exit="exit"
              />
            </AnimatePresence>
          </div>
          <button
            onClick={() => switchImage(1)}
            className="bg-gray-200 text-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
        <div className="mt-8 text-center">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Luxury Living at Its Finest</h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the epitome of modern living with our meticulously designed spaces. 
            From stunning interiors to breathtaking views, every detail is crafted to perfection.
          </p>
        </div>
      </div>
    </section>
  )
}