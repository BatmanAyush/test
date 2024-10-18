'use client'

import React, { ReactNode, useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useAnimation, useScroll } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Trees, School, Users, Dumbbell, Waves, Utensils, LandPlot, Gamepad, Heart, ChevronDown, ChevronLeft, ChevronRight, Menu } from 'lucide-react'
import photo from './builder.jpg'
import logo from './Evershine Builder logo 1200x1200-01(2).png'
import logo2 from './Evershine Builder logo 1200x1200-01.jpg' // Added import for logo2
import desktopBanner from './11zon_resized.jpg'
import mobileBanner from './Amavi_Mobile 500x800 1.jpg'
import ContactPopup from './ContactUsPopup'
import GallerySection from './GallerySection'
import qrCode1 from './Eevershine-Amavi-Phase-1.webp'
import qrCode2 from './Eevershine-Amavi-Phase-2.webp'
import qrCode3 from './Eevershine-Amavi-Phase-3.webp'
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
  const [popupTitle, setPopupTitle] = useState('')
  const [isPopupOpen, setIsPopupOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const contactUsRef = useRef<HTMLElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const { scrollY } = useScroll()
  const aboutUsRef = useRef(null)
  const overviewRef = useRef<HTMLElement>(null)
  const servicesRef = useRef(null)
  const amenitiesRef = useRef(null)
  const connectivityRef = useRef(null)
  const [currentOverviewSlide, setCurrentOverviewSlide] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    return scrollY.onChange((latest) => {
      const previous = scrollY.getPrevious() ?? 0
      if (latest > previous && latest > 100) {
        setIsHeaderVisible(false)
      } else {
        setIsHeaderVisible(true)
      }
    })
  }, [scrollY])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 820)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const openPopup = (title: string) => {
    setPopupTitle(title)
    setIsPopupOpen(true)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
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

  const configurationData = [
    { type: "1BHK", size: "395 sq ft" },
    { type: "1BHK Premium", size: "435 sq ft" },
    { type: "2BHK", size: "535 sq ft" },
    { type: "2BHK Premium", size: "612 sq ft" },
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
          <img src={logo2} alt="Evershine Amavi Logo" className="h-20" />
          <nav className="hidden md:block">
            <ul className="flex space-x-6 items-center">
              <li>
                <img src={logo} alt="Evershine Amavi Logo" className="h-16" />
              </li>
              <li>
                <button onClick={() => scrollToSection(overviewRef)} className="text-white hover:text-[#FFD700] transition-colors">
                  Overview
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection(servicesRef)} className="text-white hover:text-[#FFD700] transition-colors">
                  Configuration
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
              <li>
                <button onClick={() => scrollToSection(aboutUsRef)} className="text-white hover:text-[#FFD700] transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection(contactUsRef)} className="text-white hover:text-[#FFD700] transition-colors">
                  Contact Us
                </button>
              </li>
            </ul>
          </nav>
          <button className="md:hidden text-white" onClick={toggleMenu}>
            <Menu />
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-black bg-opacity-90 py-4">
            <ul className="flex flex-col items-center space-y-4">
              <li>
                <img src={logo} alt="Evershine Amavi Logo" className="h-16 mb-4" />
              </li>
              <li>
                <button onClick={() => { scrollToSection(aboutUsRef); toggleMenu(); }} className="text-white hover:text-[#FFD700] transition-colors">
                  Overview
                </button>
              </li>
              <li>
                <button onClick={() => { scrollToSection(amenitiesRef); toggleMenu(); }} className="text-white hover:text-[#FFD700] transition-colors">
                  Amenities
                </button>
              </li>
              <li>
                <button onClick={() => { scrollToSection(connectivityRef); toggleMenu(); }} className="text-white hover:text-[#FFD700] transition-colors">
                  Connectivity
                </button>

              </li>
              <li>
                <button onClick={() => { scrollToSection(aboutUsRef); toggleMenu(); }} className="text-white hover:text-[#FFD700] transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => { scrollToSection(contactUsRef); toggleMenu(); }} className="text-white hover:text-[#FFD700] transition-colors">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>
        )}
      </motion.header>

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.img
          src={isMobile ? mobileBanner : desktopBanner}
          alt="Evershine Amavi Project"
          className="absolute inset-0 w-full h-full object-fit z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
        {isMobile && (
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 z-10">
            <h2 className="text-2xl font-bold mb-2">READY-TO-MOVE-IN, LARGE 1 & 2 BHKS</h2>
            <p className="text-lg font-semibold">STARTING AT ₹ 41.50 LACS* ONWARDS</p>
          </div>
        )}
      </section>

      <section ref={overviewRef} className="py-20 px-4 md:px-0 bg-white">
        <div className="container mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-center mb-4 text-[#1A1A1A]">OVERVIEW</h2>
            <div className="w-24 h-1 bg-[#FFD700] mx-auto mb-8"></div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-center text-lg mb-12 text-[#4A4A4A] max-w-4xl mx-auto">
              Nestled within the expansive landscape of Global City, Amavi 303 is a private haven that
              combines serenity with luxury. Inspired by the Latin phrase "Veni, Vidi, Amavi" —
              meaning "I came, I saw, I loved" - Amavi 303 offers an escape from the chaos of city life,
              while still being surrounded by modern comforts and conveniences.
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

      <section ref={servicesRef} className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={photo}
            alt="Background"
            className="w-full h-full object-cover filter brightness-50"
          />
        </div>
        <div className="container mx-auto px-4 md:px-0 relative z-10">
          <h2 className="text-4xl font-bold text-center mb-12 text-white underline">Configuration</h2>
          <div className="flex flex-wrap justify-center gap-8">
          {configurationData.map((config, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 w-64"
            >
              <h3 className="text-2xl font-bold mb-2 text-[#FFD700]">{config.type}</h3>
              <p className="text-lg text-white mb-4">{config.size}</p>
              <button
                onClick={() => openPopup('Check Price')}
                className="w-full bg-[#FFD700] text-[#1A1A1A] py-2 px-4 rounded-md font-semibold hover:bg-[#FFD700]/90 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:ring-opacity-50"
              >
                Check Price
              </button>
            </div>
          ))}

          </div>
        </div>
      </section>

      <GallerySection />

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

      <section ref={aboutUsRef} className="py-20 px-4 md:px-0 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8 text-[#1A1A1A]">ABOUT US</h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg mb-6 text-[#4A4A4A]">
              Founded in 1960, Evershine Group has established a legacy of values through the creation of
              infrastructure. For over six decades, we have aimed to exceed our promises by delivering more than
              what we commit. We have focused on offering middle-income families an aspirational lifestyle, with
              homes designed to blend nature with modern living. Our developments are rich in greenery and feature
              an array of lifestyle and recreational amenities, making us one of Mumbai's most trusted and leading real
              estate developers.
            </p>
          </div>
        </div>
      </section>

      <section ref={contactUsRef} className="py-20 px-4 md:px-0 bg-gradient-to-b from-[#1A1A1A] to-[#2A2A2A] text-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-[#FFD700]">Contact Us</h2>
          <p className="text-center text-lg mb-12 max-w-2xl mx-auto">
            Get in touch with us to learn more about our projects or to schedule a visit to our sample flat.
          </p>
          <div className="max-w-md mx-auto bg-[#2A2A2A] p-8 rounded-lg shadow-lg border border-[#FFD700]/30">
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#FFD700]">Name</label>
                <input type="text" id="name" name="name" className="mt-1 block w-full rounded-md bg-[#3A3A3A] border-gray-600 text-white shadow-sm focus:border-[#FFD700] focus:ring focus:ring-[#FFD700] focus:ring-opacity-50" required />
              </div>
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-[#FFD700]">Mobile</label>
                <input type="tel" id="mobile" name="mobile" className="mt-1 block w-full rounded-md bg-[#3A3A3A] border-gray-600 text-white shadow-sm focus:border-[#FFD700] focus:ring focus:ring-[#FFD700] focus:ring-opacity-50" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#FFD700]">Email</label>
                <input type="email" id="email" name="email" className="mt-1 block w-full rounded-md bg-[#3A3A3A] border-gray-600 text-white shadow-sm focus:border-[#FFD700] focus:ring focus:ring-[#FFD700] focus:ring-opacity-50" required />
              </div>
              <div>
                <button type="submit" className="w-full bg-[#FFD700] text-[#1A1A1A] py-2 px-4 rounded-md font-semibold hover:bg-[#FFD700]/90 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:ring-opacity-50">
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className="mt-12 text-center">
            <p className="text-lg font-semibold mb-2">Site Address</p>
            <p className="text-[#FFD700] mt-1 mb-3">Evershine Global City, Avenue I1, Virar (West), Maharashtra 401303</p>
            <p>+91 8828309719 / +91 9096669171</p>
          </div>
        </div>
      </section>

   
      <footer className="bg-[#1A1A1A] text-white py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex space-x-4">
              <div className="flex flex-col items-center">
                <img src={qrCode1} alt="Evershine Amavi Phase 1 QR Code" className="w-20 h-20" />
                <p className="mt-1 text-xs">Phase 1</p>
              </div>
              <div className="flex flex-col items-center">
                <img src={qrCode2} alt="Evershine Amavi Phase 2 QR Code" className="w-20 h-20" />
                <p className="mt-1 text-xs">Phase 2</p>
              </div>
              <div className="flex flex-col items-center">
                <img src={qrCode3} alt="Evershine Amavi Phase 3 QR Code" className="w-20 h-20" />
                <p className="mt-1 text-xs">Phase 3</p>
              </div>
            </div>
            <div className="text-center md:text-left max-w-md">
              <p className="text-sm">
                MahaRERA No.: P51800056477 and is available on the website https://maharera.mahaonline.gov.in under registered projects | *T&C Apply.
              </p>
              <button
                className="mt-2 text-sm underline cursor-pointer hover:text-[#FFD700] transition-colors"
                onClick={() => openPopup('Disclaimer')}
              >
                Disclaimer
              </button>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm">&copy; {new Date().getFullYear()} Evershine Amavi. All rights reserved.</p>
          </div>
        </div>
      </footer>


      {/* Contact buttons */}
      <motion.button
        className="fixed bottom-4 left-4 bg-[#1A1A1A] text-[#FFD700] px-4 py-2 rounded-md shadow-lg hover:bg-[#2A2A2A] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:ring-opacity-50 z-50 font-semibold"
        onClick={() => openPopup('Download Brochure')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Download Brochure
      </motion.button>
      <motion.button
        className="fixed bottom-4 right-4 bg-[#1A1A1A] text-[#FFD700] px-4 py-2 rounded-md shadow-lg hover:bg-[#2A2A2A] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:ring-opacity-50 z-50 font-semibold"
        onClick={() => openPopup('Enquire Now')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Enquire Now
      </motion.button>

      {/* Contact Popup */}
      <ContactPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} title={popupTitle} />
    </div>
  )
}

export default LandingPage