import { useState, useEffect } from 'react'
import { Menu, X, ChevronRight, BarChart2, TrendingUp, AlertTriangle, DollarSign, Leaf } from 'lucide-react'

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E4E0E1] to-[#D6C0B3]">
      <header className="bg-[#493628] text-white">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Fresh Finds</h1>
          <nav className="hidden md:flex space-x-6">
            <a href="#features" className="hover:text-[#AB886D] transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-[#AB886D] transition-colors">How It Works</a>
            <a href="#benefits" className="hover:text-[#AB886D] transition-colors">Benefits</a>
            <a href="#contact" className="hover:text-[#AB886D] transition-colors">Contact</a>
          </nav>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {isMenuOpen && (
          <nav className="md:hidden bg-[#493628] px-4 py-2">
            <a href="#features" className="block py-2 hover:text-[#AB886D] transition-colors">Features</a>
            <a href="#how-it-works" className="block py-2 hover:text-[#AB886D] transition-colors">How It Works</a>
            <a href="#benefits" className="block py-2 hover:text-[#AB886D] transition-colors">Benefits</a>
            <a href="#contact" className="block py-2 hover:text-[#AB886D] transition-colors">Contact</a>
          </nav>
        )}
      </header>

      <main>
        <section className="container mx-auto px-4 py-20 text-center">
          <h2 className={`text-4xl md:text-6xl font-bold mb-6 text-[#493628] transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            Smart Inventory Management for Sustainable Retail
          </h2>
          <p className={`text-xl mb-8 text-[#493628] transition-opacity duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            Reduce waste, optimize stock, and boost sustainability with Fresh Finds
          </p>
          <a href="#contact" className={`inline-block bg-[#AB886D] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#493628] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            Get Started
            <ChevronRight className="inline ml-2" />
          </a>
        </section>

        <section id="features" className="bg-white py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-[#493628]">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: BarChart2, title: "Real-time Tracking", description: "Monitor your inventory levels as they change" },
                { icon: TrendingUp, title: "Smart Forecasting", description: "Predict future inventory needs based on data" },
                { icon: AlertTriangle, title: "Waste Alerts", description: "Get notified about potential overstocking or expiring products" },
                { icon: Leaf, title: "Sustainability Metrics", description: "Track and improve your environmental impact" }
              ].map((feature, index) => (
                <div key={index} className="bg-[#E4E0E1] p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                  <feature.icon className="w-12 h-12 text-[#AB886D] mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-[#493628]">{feature.title}</h3>
                  <p className="text-[#493628]">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20 bg-gradient-to-b from-[#D6C0B3] to-[#E4E0E1]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-[#493628]">How It Works</h2>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
              {[
                { step: 1, title: "Connect Your Systems", description: "Integrate Fresh Finds with your existing POS and inventory systems" },
                { step: 2, title: "Analyze & Optimize", description: "Our AI analyzes your data to provide actionable insights" },
                { step: 3, title: "Reduce Waste", description: "Implement recommendations to minimize waste and maximize efficiency" }
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 w-full md:w-1/3">
                  <div className="text-3xl font-bold text-[#AB886D] mb-4">Step {item.step}</div>
                  <h3 className="text-xl font-semibold mb-2 text-[#493628]">{item.title}</h3>
                  <p className="text-[#493628]">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="benefits" className="py-20 bg-[#493628] text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: DollarSign, title: "Reduce Costs", description: "Minimize waste and optimize inventory to save money" },
                { icon: Leaf, title: "Boost Sustainability", description: "Decrease your environmental footprint" },
                { icon: TrendingUp, title: "Increase Efficiency", description: "Streamline operations with data-driven insights" }
              ].map((benefit, index) => (
                <div key={index} className="bg-[#AB886D] p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <benefit.icon className="w-12 h-12 text-white mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 bg-gradient-to-b from-[#E4E0E1] to-[#D6C0B3]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#493628]">Ready to Optimize Your Inventory?</h2>
            <p className="text-xl mb-8 text-[#493628]">Get in touch with us to learn how Fresh Finds can transform your retail operations</p>
            <a href="#" className="inline-block bg-[#AB886D] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#493628] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Contact Us
              <ChevronRight className="inline ml-2" />
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-[#493628] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold">Fresh Finds</h2>
              <p className="text-sm">Smart Inventory Management</p>
            </div>
            <nav className="flex flex-wrap justify-center md:justify-end space-x-4">
              <a href="#features" className="hover:text-[#AB886D] transition-colors">Features</a>
              <a href="#how-it-works" className="hover:text-[#AB886D] transition-colors">How It Works</a>
              <a href="#benefits" className="hover:text-[#AB886D] transition-colors">Benefits</a>
              <a href="#contact" className="hover:text-[#AB886D] transition-colors">Contact</a>
            </nav>
          </div>
          <div className="mt-8 text-center text-sm">
            &copy; {new Date().getFullYear()} Fresh Finds. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}