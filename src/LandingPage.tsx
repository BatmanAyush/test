'use client'

import React, { ReactNode, useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useAnimation, useScroll } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Trees, School, Users, Dumbbell, Waves, Utensils, LandPlot, Gamepad, Heart, ChevronDown, ChevronLeft, ChevronRight, Menu, Baby ,X} from 'lucide-react'
import photo from './builder.jpg'
import logo from './Evershine Builder logo 1200x1200-01(2).png'
import logo2 from './Evershine Amavi-01 logo.png'
import desktopBanner from './11zon_resized.jpg'
import mobileBanner from './Amavi_Mobile 500x800 1.jpg'
import qrCode1 from './Eevershine-Amavi-Phase-1.webp'
import qrCode2 from './Eevershine-Amavi-Phase-2.webp'
import qrCode3 from './Eevershine-Amavi-Phase-3.webp'
import ContactPopup from './ContactUsPopup'
import GallerySection from './GallerySection'
import DisclaimerPopup from './DisclaimerPopup'
import connectivityMap from './WhatsApp Image 2024-10-21 at 17.59.17.jpeg'

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
  isLastItem: boolean
}

const ConnectivityItem: React.FC<ConnectivityItemProps> = ({ title, items, isLastItem }) => {
  const [isOpen, setIsOpen] = useState(isLastItem)

  return (
    <div className="border-b border-orange-200 last:border-b-0">
      <button
        className="flex justify-between items-center w-full text-left font-semibold text-lg text-gray-800 hover:text-orange-500 transition-all duration-300 ease-in-out py-2"
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
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.ul
            className="mt-2 ml-4"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {items.map((item, index) => (
              <motion.li
                key={index}
                className="mb-2 last:mb-0 p-2 rounded-md hover:bg-orange-50 transition-all duration-300 ease-in-out"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <span className="font-medium text-gray-800">{item.name}</span>
                <span className="text-sm text-gray-600 ml-2">
                  {item.distance} | {item.time}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

const AnimatedCounter = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(0)
  const countRef = useRef(0)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      const startTime = Date.now()
      const timer = setInterval(() => {
        const timePassed = Date.now() - startTime
        const progress = Math.min(timePassed / (duration * 1000), 1)
        countRef.current = Math.floor(end * progress)
        setCount(countRef.current)

        if (progress === 1) {
          clearInterval(timer)
        }
      }, 50)

      return () => clearInterval(timer)
    }
  }, [inView, end, duration])

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return (
    <div ref={ref} className="relative">
      <motion.div
        className="text-3xl font-bold text-orange-600"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {formatNumber(count)}
        <span className="text-4xl">+</span>
      </motion.div>
      <motion.div
        className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#FFA500"
            strokeWidth="8"
            strokeDasharray="283"
            strokeDashoffset="283"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="283"
              to="0"
              dur="2s"
              fill="freeze"
              calcMode="spline"
              keySplines="0.42 0 0.58 1"
            />
          </circle>
        </svg>
      </motion.div>
    </div>
  )
}

const LandingPage = () => {
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false)

  const [popupTitle, setPopupTitle] = useState('')
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const contactUsRef = useRef<HTMLElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const { scrollY } = useScroll()
  const headerRef = useRef<HTMLElement>(null)
  const aboutUsRef = useRef(null)
  const overviewRef = useRef<HTMLElement>(null)
  const servicesRef = useRef(null)
  const amenitiesRef = useRef(null)
  const connectivityRef = useRef(null)
  const [isFullScreenOpen, setIsFullScreenOpen] = useState(false)
  const [fullScreenImage, setFullScreenImage] = useState('')

  const openFullScreenImage = (image: string) => {
    setFullScreenImage(image)
    setIsFullScreenOpen(true)
  }



  const Counter = ({ end, duration = 2 }) => {
    const [count, setCount] = useState(0)
    const countRef = useRef(0)
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1,
    })
  
    useEffect(() => {
      if (inView) {
        const startTime = Date.now()
        const timer = setInterval(() => {
          const timePassed = Date.now() - startTime
          const progress = Math.min(timePassed / (duration * 1000), 1)
          countRef.current = Math.floor(end * progress)
          setCount(countRef.current)
  
          if (progress === 1) {
            clearInterval(timer)
          }
        }, 50)
  
        return () => clearInterval(timer)
      }
    }, [inView, end, duration])
  
    return <span ref={ref}>{count.toLocaleString()}+</span>
  }
  
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
    const timer = setTimeout(() => {
      setIsPopupOpen(true)
      setPopupTitle('Welcome to Evershine Amavi')
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current) {
      const headerHeight = headerRef.current?.offsetHeight || 0
      const elementPosition = ref.current.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
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
    { name: "Children's Play Area", icon: Baby },
    { name: "Board Games and Lot more!", icon: Gamepad }
  ]

  const configurationData = [
    { typology: "1 BHK", area: "395 Sq. ft", price: "Click Here" },
    { typology: "1 BHK Premium", area: "435 Sq. ft", price: "Click Here" },
    { typology: "2 BHK", area: "545 Sq. ft", price: "Click Here" },
    { typology: "2 BHK Premium", area: "612 Sq. ft", price: "Click Here" },
  ]
  function FullScreenImage({ image, onClose }) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
        <div className="relative w-full h-full max-w-6xl max-h-[90vh] bg-white rounded-lg overflow-hidden">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-800 hover:text-gray-600 transition-colors bg-white rounded-full p-1 z-10"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="w-full h-full overflow-auto">
            <img
              src={image}
              alt="Full screen view"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    )
  }

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
        { name: "Sanjivani Hospital", distance: "2.2km", time: "7mins" 
        },
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white font-sans">
      <motion.header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 bg-white text-gray-800 py-0 shadow-md"
        initial={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <img src={logo2} alt="Evershine Amavi Logo" className="h-16 hidden md:block" />
          <nav className="hidden md:block">
            <ul className="flex space-x-11 items-center">
              <li>
                <button onClick={() => scrollToSection(overviewRef)} className="text-gray-800 hover:text-orange-500 transition-colors">
                  Overview
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection(servicesRef)} className="text-gray-800 hover:text-orange-500 transition-colors">
                  Configuration
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection(amenitiesRef)} className="text-gray-800 hover:text-orange-500 transition-colors">
                  Amenities
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection(connectivityRef)} className="text-gray-800 hover:text-orange-500 transition-colors">
                  Connectivity
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection(aboutUsRef)} className="text-gray-800 hover:text-orange-500 transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection(contactUsRef)} className="text-gray-800 hover:text-orange-500 transition-colors">
                  Contact Us
                </button>
              </li>
              <li>
                <img src={logo} alt="Evershine Amavi Logo" className="h-28" />
              </li>
            </ul>
          </nav>
          <div className="md:hidden flex items-center justify-between w-full">
            <img src={logo2} alt="Evershine Amavi Logo" className="h-10" />
            <div className="flex items-center">
              <img src={logo} alt="Evershine Amavi Logo" className="h-16 mr-32" />
              <button className="text-gray-800" onClick={toggleMenu}>
                <Menu />
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white bg-opacity-90 py-4">
            <ul className="flex flex-col items-center space-y-4">
              <li>
                <button onClick={() => { scrollToSection(overviewRef); toggleMenu(); }} className="text-gray-800 hover:text-orange-500 transition-colors">
                  Overview
                </button>
              </li>
              <li>
                <button onClick={() => { scrollToSection(servicesRef); toggleMenu(); }} className="text-gray-800 hover:text-orange-500 transition-colors">
                  Configuration
                </button>
              </li>
              <li>
                <button onClick={() => { scrollToSection(amenitiesRef); toggleMenu(); }} className="text-gray-800 hover:text-orange-500 transition-colors">
                  Amenities
                </button>
              </li>
              <li>
                <button onClick={() => { scrollToSection(connectivityRef); toggleMenu(); }} className="text-gray-800 hover:text-orange-500 transition-colors">
                  Connectivity
                </button>
              </li>
              <li>
                <button onClick={() => { scrollToSection(aboutUsRef); toggleMenu(); }} className="text-gray-800 hover:text-orange-500 transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => { scrollToSection(contactUsRef); toggleMenu(); }} className="text-gray-800 hover:text-orange-500 transition-colors">
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
       
      </section>

      <section ref={overviewRef} id="overview" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">OVERVIEW</h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Nestled within the expansive landscape of Global City, Amavi 303 is a private haven that
                combines serenity with luxury. Inspired by the Latin phrase "Veni, Vidi, Amavi" —
                meaning "I came, I saw, I loved" - Amavi 303 offers an escape from the chaos of city life,
                while still being surrounded by modern comforts and conveniences.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
     
      
      <section ref={servicesRef} className="py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={photo}
            alt="Background"
            className="w-full h-full object-cover filter brightness-50"
          />
        </div>
        <div className="container mx-auto px-4 md:px-0 relative z-10">
          <h2 className="text-3xl font-bold text-center mb-6 md:mb-4 text-white">CONFIGURATIONS</h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
          <div className="max-w-5xl mx-auto bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg overflow-hidden relative">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-orange-500 text-white">
                  <th className="py-4 px-6 text-center border-r border-white">Typology</th>
                  <th className="py-4 px-6 text-center border-r border-white">RERA Carpet Area (Sq.Ft.)</th>
                  <th className="py-4 px-6 text-center">Price</th>
                </tr>
              </thead>
              <tbody>
                {configurationData.map((config, index) => (
                  <tr key={index} className="border-b border-orange-200 last:border-b-0">
                    <td className="py-4 px-6 border-r border-orange-200 text-center">{config.typology}</td>
                    <td className="py-4 px-6 border-r border-orange-200 text-center">{config.area}</td>
                    <td className="py-4 px-6 text-center">
                      <motion.button
                        onClick={() => openPopup('Check Price')}
                        className="text-orange-500 hover:text-orange-600 font-semibold transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {config.price}
                      </motion.button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="absolute bottom-4 right-4 text-white text-sm font-semibold bg-orange-500 px-2 py-1 rounded-md">
          *As per RERA Carpet Area
        </div>
      </section>

      <GallerySection />

      <section ref={amenitiesRef} className="py-16 px-4 md:px-0 bg-orange-50">
        <div className="container mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-center mb-4 text-gray-800 ">AMENITIES</h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
          </AnimatedSection>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {amenities.map((amenity, index) => (
              <AnimatedSection key={amenity.name} delay={0.1 * (index + 1)}>
                <div className="bg-white p-4 rounded-lg shadow-md transition-transform hover:scale-105 flex flex-col items-center justify-center h-full">
                  {React.createElement(amenity.icon, {
                    className: "w-10 h-10 mb-3 text-orange-500"
                  })}
                  <h3 className="text-sm sm:text-base font-semibold text-center text-gray-800">{amenity.name}</h3>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      <section ref={connectivityRef} className="py-16 px-4 md:px-0 bg-gradient-to-b from-white to-orange-50">
        <div className="container mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-center mb-5 text-gray-800">CONNECTIVITY</h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
          </AnimatedSection>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-lg">
              <AnimatedSection delay={0.2}>
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {connectivityData.map((item, index) => (
                    <ConnectivityItem 
                      key={index} 
                      title={item.title} 
                      items={item.items} 
                      isLastItem={index === connectivityData.length - 1}
                    />
                  ))}
                </div>
              </AnimatedSection>
            </div>
            <div className="md:w-1/2">
              <AnimatedSection delay={0.4}>
                <div className="bg-white p-2 rounded-lg shadow-lg h-full">
                  <img
                    src={connectivityMap}
                    alt="Evershine Amavi Location Map"
                    className="w-full h-500px object-cover rounded-lg cursor-pointer"
                    onClick={() => openFullScreenImage(connectivityMap)}
                  />
                </div>
                <p className="text-sm text-gray-500 italic mt-2 text-right">*Image as per Google Maps</p>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      <section ref={aboutUsRef} className="py-24 px-4 md:px-0 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">ABOUT US</h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-12"></div>
          <div className="max-w-6xl mx-auto text-center px-4 md:px-8 mb-16">
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Founded in 1960, Evershine Group has established a legacy of values through the creation of
              infrastructure. For over six decades, we have aimed to exceed our promises by delivering more than
              what we commit. We have focused on offering middle-income families an aspirational lifestyle, with
              homes designed to blend nature with modern living.
              Our developments are rich in greenery and feature an array of lifestyle and recreational amenities,
              making us one of Mumbai's most trusted and leading real estate developers. We take pride in our
              commitment to quality, innovation, and customer satisfaction, which has been the cornerstone of our
              success over the years.
            </p>
          </div> 
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <AnimatedSection delay={0.2}>
              <motion.div
                className="bg-orange-50 rounded-lg shadow-sm p-8 flex flex-col items-center justify-center h-full"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, duration: 0.3 }}
              >
                <p className="text-3xl font-bold text-orange-600 mb-4">1960</p>
                <p className="text-base text-gray-600 text-center">Our Journey Began</p>
              </motion.div>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <motion.div
                className="bg-orange-50 rounded-lg shadow-sm p-8 flex flex-col items-center justify-center h-full"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, duration: 0.3 }}
              >
                <AnimatedCounter end={20000} duration={2} />
                <p className="text-base text-gray-600 text-center mt-4">Happy Families</p>
              </motion.div>
            </AnimatedSection>
            <AnimatedSection delay={0.4}>
              <motion.div
                className="bg-orange-50 rounded-lg shadow-sm p-8 flex flex-col items-center justify-center h-full"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, duration: 0.3 }}
              >
                <p className="text-3xl font-bold text-orange-600 mb-4">6 Decades</p>
                <p className="text-base text-gray-600 text-center">Of Excellence</p>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section ref={contactUsRef} className="py-20 px-4 md:px-0 bg-gradient-to-b from-orange-100 to-orange-200 text-gray-800">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-orange-600">CONTACT US</h2>
          <p className="text-center text-lg mb-12 max-w-2xl mx-auto">
            Get in touch with us to learn more about our projects or to schedule a visit to our sample flat.
          </p>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <div className="bg-white p-8 rounded-lg shadow-lg border border-orange-300">
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-lg font-medium text-gray-700">Name</label>
                    <input type="text" id="name" name="name" className="mt-1 block w-full rounded-md bg-orange-50 border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50" required />
                  </div>
                  <div>
                    <label htmlFor="mobile" className="block text-lg font-medium text-gray-700">Mobile</label>
                    <input type="tel" id="mobile" name="mobile" className="mt-1 block w-full rounded-md bg-orange-50 border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
                    <input type="email" id="email" name="email" className="mt-1 block w-full rounded-md bg-orange-50 border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50" required />
                  </div>
                  <div>
                    <button type="submit" className="w-full bg-orange-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-orange-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
              <div className="mt-8 text-center">
                <p className="text-lg font-semibold mb-2">Site Address</p>
                <p className="text-orange-600 mt-1 mb-3">Evershine Global City, Avenue I1, Virar (West), Maharashtra 401303</p>
                <p>+91 8828309719 / +91 9096669171</p>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white p-2 rounded-lg shadow-lg h-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3812603.289104417!2d70.06668495000002!3d21.062858779307554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7a9017646de67%3A0x8a68bd52908884e9!2sEvershine%20Amavi%20303!5e0!3m2!1sen!2sin!4v1728989322507!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '400px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Evershine Amavi Location"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white text-gray-800 py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-start justify-between space-y-4 md:space-y-0">
            <div className="flex space-x-4 md:w-1/4 justify-end">
              <div className="flex flex-col items-center">
                <img src={qrCode1} alt="Evershine Amavi Phase 1 QR Code" className="w-30 h-30" />
                <p className="mt-1 text-xs">Phase 1</p>
              </div>
              <div className="flex flex-col items-center">
                <img src={qrCode2} alt="Evershine Amavi Phase 2 QR Code" className="w-30 h-30" />
                <p className="mt-1 text-xs">Phase 2</p>
              </div>
              <div className="flex flex-col items-center">
                <img src={qrCode3} alt="Evershine Amavi Phase 3 QR Code" className="w-30 h-30" />
                <p className="mt-1 text-xs">Phase 3</p>
              </div>
            </div>
            <div className="text-balance md:text-center md:w-2/4 md:max-w-full px-4 ">
              <p className="text-sm whitespace-normal text-start w-full ">
                This project has been registered under MahaRERA Registration No.: Phase 1 - P99000024780, Phase 2 - P99000024860 & Phase 3 - P99000024753 and is available on the website https://maharera.mahaonline.gov.in under registered projects.
              </p>
              <button
                className="mt-2 text-sm underline cursor-pointer hover:text-orange-500 transition-colors"
                onClick={() => setIsDisclaimerOpen(true)}
              >
                Disclaimer
              </button>
              <div className="mt-6 text-left md:text-center">
                <p className="text-sm">&copy; {new Date().getFullYear()} Evershine Amavi. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <motion.button
        className="fixed bottom-4 left-4 bg-orange-500 text-white px-4 py-2 rounded-md shadow-lg hover:bg-orange-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 z-50 font-semibold"
        onClick={() => openPopup('Download Brochure')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Download Brochure
      </motion.button>
      <motion.button
        className="fixed bottom-4 right-4 bg-orange-500 text-white px-4 py-2 rounded-md shadow-lg hover:bg-orange-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 z-50 font-semibold"
        onClick={() => openPopup('Enquire Now')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Enquire Now
      </motion.button>

      <ContactPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} title={popupTitle} />
      <DisclaimerPopup isOpen={isDisclaimerOpen} onClose={() => setIsDisclaimerOpen(false)} />
      {isFullScreenOpen && (
        <FullScreenImage
          image={fullScreenImage}
          onClose={() => setIsFullScreenOpen(false)}
        />
      )}
    </div>
  )
}


export default LandingPage