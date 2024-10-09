import { useState, useEffect } from 'react'
import { Moon, Sun, Pen, Instagram, Twitter, Github, BookOpen, Users, Zap } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import logo from './logo.jpg'
import { useNavigate } from 'react-router-dom'

function ReasonCard({ icon: Icon, title, description }) {
  return (
    <Card className="transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <Icon className="h-12 w-12 text-red-600 mb-4" />
        <h3 className="text-xl font-bold mb-2 transition-all duration-300 hover:text-red-600">{title}</h3>
        <p className="transition-all duration-300 hover:text-red-500">{description}</p>
      </CardContent>
    </Card>
  )
}

export default function LandingPage() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-all duration-300 ease-in-out">
        {/* Header */}
        <header className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src={logo} 
              alt="BatCode Logo" 
              className="h-20 w-20 rounded-full object-cover transition-transform duration-300 hover:scale-110" 
            />
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="transition-all duration-300 hover:bg-red-600 hover:text-white">Login</Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle theme"
              className="transition-all duration-300 hover:rotate-180"
            >
              {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </Button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 transition-all duration-300 hover:text-red-600">
            Gear Ready to upskill: Your Best preparation platform
          </h1>
          <p className="text-xl md:text-2xl mb-8 transition-all duration-300 hover:text-red-500">
            Explore your learning by accessing DSA resources for free!!
          </p>
          <Button  onClick={()=>{
                navigate('/login')
              }} className="bg-red-600 hover:bg-red-700 text-white transition-all duration-300 hover:scale-110 hover:shadow-lg">
            Get Started
          </Button>
        </section>

        {/* Resources Section */}
        <section className="container mx-auto px-4 py-20">
          <Card className="max-w-sm mx-auto transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
            <CardContent className="flex flex-col items-center p-6">
              <Pen className="h-16 w-16 text-red-600 mb-4 transition-all duration-300 hover:scale-125" />
              <h2 className="text-2xl font-bold mb-2 transition-all duration-300 hover:text-red-600">BatCode's DSA Resources</h2>
              <Button onClick={()=>{
                navigate('/login')
              }} className="bg-red-600 hover:bg-red-700 text-white transition-all duration-300 hover:scale-110 hover:shadow-lg">
                Free
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Why Choose Us Section */}
        <section className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold text-center mb-12 transition-all duration-300 hover:text-red-600">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ReasonCard 
              icon={BookOpen}
              title="Comprehensive Resources"
              description="Access a wide range of DSA topics with in depth resources Links Attach To it."
            />
            <ReasonCard 
              icon={Users}
              title="Begineer Friendly"
              description="Anyone can use this platform!it is completely free and begineer friendly with mention prequesites and its resources respectively"
            />
            <ReasonCard 
              icon={Zap}
              title="Quality"
              description="The level of Questions provided are based on LeetCode which is the top coding Questions platorm.We provide the filtered way of their questions in structured manner so that its easy for users to upskill!!!"
            />
          </div>
        </section>

        {/* Social Media Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl font-bold mb-8 transition-all duration-300 hover:text-red-600">My Social Media</h2>
          <div className="flex justify-center space-x-6">
            <a href="#" aria-label="Instagram" className="transition-all duration-300 hover:scale-125">
              <Instagram className="h-8 w-8 text-red-600" />
            </a>
            <a href="#" aria-label="Twitter" className="transition-all duration-300 hover:scale-125">
              <Twitter className="h-8 w-8 text-red-600" />
            </a>
            <a href="#" aria-label="GitHub" className="transition-all duration-300 hover:scale-125">
              <Github className="h-8 w-8 text-red-600" />
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-100 dark:bg-gray-800 py-6 transition-all duration-300">
          <div className="container mx-auto px-4 text-center">
            <p className="transition-all duration-300 hover:text-red-600">&copy; {new Date().getFullYear()} BatCode. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}