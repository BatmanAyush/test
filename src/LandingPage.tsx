'use client'
import React,{ReactNode} from 'react'
 import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useAnimation, useScroll } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from "@/components/ui/button"
import { Building2, Home, Hammer, Trees, School, Users, Dumbbell, Waves, Utensils, LandPlot, Gamepad, Heart, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import photo from './builder.jpg'
// import jpg2 from './2.jpg'
// import jp5 from './5.jpg'
// import jpg1 from './image00001.jpeg'
// import jpg3 from './image00002.jpeg'
import GallerySection from './GallerySection'

interface AnimatedSectionProps {
  children: ReactNode
  delay?: number
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, delay = 0 }) => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.5, delay }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 }
      }}
    >
      {children}
    </motion.div>
  )
}

interface Item {
  name: string
  distance: string
  time: string
}

interface ConnectivityItemProps {
  title: string
  items: Item[]
}

const ConnectivityItem: React.FC<ConnectivityItemProps> = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mb-4 border-b border-[#FFD700]/30 pb-2">
      <button
        className="flex justify-between items-center w-full text-left font-semibold text-lg text-[#1A1A1A] hover:text-[#FFD700] transition-all duration-300 ease-in-out"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>
      <motion.ul
        className="mt-2 ml-4 overflow-hidden"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {items.map((item, index) => (
          <motion.li
            key={index}
            className="mb-2 p-2 rounded-md hover:bg-[#FFF8E1] transition-all duration-300 ease-in-out"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <span className="font-medium text-[#1A1A1A]">{item.name}</span>
            <span className="text-sm text-gray-600 ml-2">
              {item.distance} | {item.time}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  )
}


const LandingPage = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const { scrollY } = useScroll()
  const aboutUsRef = useRef(null)
  const servicesRef = useRef(null)
  const amenitiesRef = useRef(null)
  const connectivityRef = useRef(null)
  const [currentOverviewSlide, setCurrentOverviewSlide] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    return scrollY.onChange((latest) => {
      const previous = scrollY.getPrevious() ?? 0 // Use nullish coalescing to handle undefined
      if (latest > previous && latest > 100) {
        setIsHeaderVisible(false)
      } else {
        setIsHeaderVisible(true)
      }
    })
  }, [scrollY])
  

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 5000) // Switch every 5 seconds

    return () => clearInterval(timer)
  }, [])

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }
  

  const amenities = [
    { name: "Yazo Park", icon: Trees },
    { name: "Cambridge International School", icon: School },
    { name: "Clubhouse", icon: Users },
    { name: "Gymnasium", icon: Dumbbell },
    { name: "Swimming Pool", icon: Waves },
    { name: "Banquet Hall", icon: Utensils },
    { name: "Siddhivinayak Temple", icon: LandPlot },
    { name: "Yoga Center", icon: Heart },
    { name: "Board Games and Lot more!", icon: Gamepad }
  ]

  const connectivityData = [
    {
      title: "Major Roads",
      items: [
        { name: "NH8", distance: "3.8km", time: "12mins" },
        { name: "Ghodbunder Road", distance: "36km", time: "56mins" },
        { name: "Malad Mindspace", distance: "50.3km", time: "1hr 37mins" },
        { name: "Airport", distance: "57km", time: "1hr 56min" },
      ]
    },
    {
      title: "Shopping",
      items: [
        { name: "Redbricks business Plaza", distance: "1.3km", time: "5mins" },
        { name: "Magnet Mall", distance: "1.7km", time: "5mins" },
        { name: "Vijay Sales", distance: "2.6km", time: "8mins" },
        { name: "Reliance Digital Life", distance: "3km", time: "12mins" },
        { name: "D-mart", distance: "2.6km", time: "9mins" },
      ]
    },
    {
      title: "Stations",
      items: [
        { name: "Virar Railway Station", distance: "3.3km", time: "11mins" },
        { name: "Vasai Railway Station", distance: "14.8km", time: "48mins" },
      ]
    },
    {
      title: "Schools",
      items: [
        { name: "Rustomjee Cambridge Int School", distance: "1km", time: "5mins" },
        { name: "Expert International High School", distance: "1.9km", time: "6mins" },
        { name: "St Xavier's High School", distance: "2.4km", time: "7mins" },
        { name: "National English High School", distance: "3km", time: "10mins" },
      ]
    },
    {
      title: "Entertainment",
      items: [
        { name: "Yazoo Park", distance: "1.2km", time: "6mins" },
        { name: "Woodlands Cinema", distance: "3.4km", time: "11mins" },
        { name: "Rockstar Nava Cinema", distance: "8.1km", time: "20mins" },
        { name: "Patil Resort", distance: "10km", time: "26mins" },
        { name: "Arnala Resort", distance: "10.1km", time: "27mins" },
      ]
    },
    {
      title: "Banks",
      items: [
        { name: "HDFC Bank ATM", distance: "300m", time: "2mins" },
        { name: "Andhra Bank", distance: "1.4km", time: "4mins" },
        { name: "Axis Bank ATM", distance: "1.4km", time: "7mins" },
        { name: "ICICI Bank ATM", distance: "1.8km", time: "8mins" },
        { name: "Bank of India", distance: "2km", time: "10mins" },
      ]
    },
    {
      title: "Hospitals",
      items: [
        { name: "Global Hospital", distance: "1.2km", time: "3mins" },
        { name: "Param Maternity & Nursing Hospital", distance: "1.9km", time: "6mins" },
        { name: "Mahavir Hospital", distance: "2km", time: "6mins" },
        { name: "Sanjivani Hospital", distance: "2.2km", time: "7mins" },
      ]
    },
    {
      title: "Fast Food Restaurants",
      items: [
        { name: "Dominos pizza", distance: "2.2km", time: "7mins" },
        { name: "McDonald's", distance: "1.5km", time: "5mins" },
      ]
    },
  ]

  const overviewSlides = [
    { title: "33 Acre Land Parcel", description: "Expansive land area for comprehensive development" },
    { title: "12.5 Acres Sports Stadia", description: "State-of-the-art sports facilities for residents" },
    { title: "Luxury Apartments", description: "Opulent living spaces with modern amenities" },
  ]

  const nextSlide = () => {
    setDirection(1)
    setCurrentOverviewSlide((prev) => (prev === overviewSlides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentOverviewSlide((prev) => (prev === 0 ? overviewSlides.length - 1 : prev - 1))
  }

  const slideVariants = {
    hidden: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8E1] to-white font-sans">
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-70 text-white py-4"
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: isHeaderVisible ? 1 : 0, y: isHeaderVisible ? 0 : -100 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#FFD700]">Evershine Amavi</h1>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <button onClick={() => scrollToSection(aboutUsRef)} className="text-white hover:text-[#FFD700] transition-colors">
                  Overview
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection(servicesRef)} className="text-white hover:text-[#FFD700] transition-colors">
                  Our Services
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection(amenitiesRef)} className="text-white hover:text-[#FFD700] transition-colors">
                  Amenities
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection(connectivityRef)} className="text-white hover:text-[#FFD700] transition-colors">
                  Connectivity
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </motion.header>

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img
          src={photo}
          alt="Evershine Amavi Project"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="relative z-10 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg"
          >
            Building Tomorrow's World
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl mb-2 drop-shadow-md font-light"
          >
            Crafting Excellence in Every Structure
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl mb-8 drop-shadow-md max-w-2xl mx-auto"
          >
            From concept to completion, we bring your vision to life with precision and passion.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button size="lg" className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-[#1A1A1A] font-semibold">
              Explore Our Projects
            </Button>
          </motion.div>
        </div>
      </section>

      <section ref={aboutUsRef} className="py-20 px-4 md:px-0 bg-white">
        <div className="container mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-center mb-4 text-[#1A1A1A]">OVERVIEW</h2>
            <div className="w-24 h-1 bg-[#FFD700] mx-auto mb-8"></div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-center text-lg mb-12 text-[#4A4A4A] max-w-4xl mx-auto">
              EVERSHINE VIRAR IS A PART OF LANDMARK CITY OF MODERN DAY VIRAR, GLOBAL CITY. IT'S A TOWNSHIP THAT HAS ALL  YOUR NEEDS AND DEMANDS COVERED. SO, WHETHER YOU WISH FOR THE BEST OF AMENITIES FOR THE INTERIORS, THE MOST EXCLUSIVE PERSONAL BENEFITS OR THE MOST AMAZING ACTIVITIES ACCESSIBLE TO  YOUR FAMILY, THIS IS THE PERFECT CHOICE.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.4}>
            <div className="relative mt-12 bg-[#F0F0F0] rounded-lg shadow-lg p-8 h-[300px]">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentOverviewSlide}
                  custom={direction}
                  variants={slideVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute inset-0 flex flex-col justify-center items-center p-8"
                >
                  <h3 className="text-2xl font-bold mb-4 text-[#1A1A1A]">{overviewSlides[currentOverviewSlide].title}</h3>
                  <p className="text-[#4A4A4A] text-lg text-center">{overviewSlides[currentOverviewSlide].description}</p>
                </motion.div>
              </AnimatePresence>
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
                <button 
                  className="bg-[#FFD700] text-[#1A1A1A] px-4 py-2 rounded-full shadow-md hover:bg-[#FFD700]/80 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:ring-opacity-50"
                  onClick={prevSlide}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  className="bg-[#FFD700] text-[#1A1A1A] px-4 py-2 rounded-full shadow-md hover:bg-[#FFD700]/80 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:ring-opacity-50"
                  onClick={nextSlide}
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section ref={servicesRef} className="py-20 bg-[#1A1A1A] text-white">
        <div className="container mx-auto px-4 md:px-0">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-center mb-12 text-[#FFD700]">Our Services</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection delay={0.2}>
              <div className="bg-[#2A2A2A] p-6 rounded-lg shadow-lg transition-transform hover:scale-105">
                <Building2 className="w-12 h-12 mb-4 text-[#FFD700]" />
                <h3 className="text-xl font-semibold mb-2">Commercial Construction</h3>
                <p>State-of-the-art office buildings, retail spaces, and industrial complexes.</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.4}>
              <div className="bg-[#2A2A2A] p-6 rounded-lg shadow-lg transition-transform hover:scale-105">
                <Home className="w-12 h-12 mb-4 text-[#FFD700]" />
                <h3 className="text-xl font-semibold mb-2">Residential Projects</h3>
                <p>Custom homes, apartments, and planned communities tailored to modern living.</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.6}>
              <div className="bg-[#2A2A2A] p-6 rounded-lg shadow-lg transition-transform hover:scale-105">
                <Hammer className="w-12 h-12 mb-4 text-[#FFD700]" />
                <h3 className="text-xl font-semibold mb-2">Renovation & Restoration</h3>
                <p>Breathing new life into existing structures while preserving their character.</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

<GallerySection/>

      <section ref={amenitiesRef} className="py-20 px-4 md:px-0 bg-[#FFF8E1]">
        <div className="container mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-center mb-12 text-[#1A1A1A]">Amenities</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {amenities.map((amenity, index) => (
              <AnimatedSection key={amenity.name} delay={0.2 * (index + 1)}>
                <div className="bg-white p-6 rounded-lg shadow-lg transition-transform hover:scale-105">
                  {React.createElement(amenity.icon, { 
                    className: "w-12 h-12 mb-4 text-[#FFD700]"
                  })}
                  <h3 className="text-xl font-semibold mb-2 text-[#1A1A1A]">{amenity.name}</h3>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section ref={connectivityRef} className="py-20 px-4 md:px-0 bg-gradient-to-b from-white to-[#FFF8E1]">
        <div className="container mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-center mb-12 text-[#1A1A1A]">Connectivity</h2>
          </AnimatedSection>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-lg">
              <AnimatedSection delay={0.2}>
                {connectivityData.map((item, index) => (
                  <ConnectivityItem key={index} title={item.title} items={item.items} />
                ))}
              </AnimatedSection>
            </div>
            <div className="md:w-1/2">
              <AnimatedSection delay={0.4}>
                <div className="bg-white p-2 rounded-lg shadow-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3812603.289104417!2d70.06668495000002!3d21.062858779307554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7a9017646de67%3A0x8a68bd52908884e9!2sEvershine%20Amavi%20303!5e0!3m2!1sen!2sin!4v1728989322507!5m2!1sen!2sin"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Evershine Amavi Location"
                    className="rounded-lg"
                  ></iframe>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#1A1A1A] text-white py-8">
        <div className="container mx-auto px-4 md:px-0">
          <div className="text-center">
            <p>&copy; {new Date().getFullYear()} Evershine Amavi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage