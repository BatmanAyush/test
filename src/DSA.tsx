'use client'

import { useState, useEffect } from 'react'
import { Moon, Sun, Youtube, ExternalLink } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Switch } from "@/components/ui/switch"
import logo from './logo.jpg'

export default function DSA() {
  const [darkMode, setDarkMode] = useState(true)
  const [totalProgress, setTotalProgress] = useState(0)
  const [steps, setSteps] = useState([])
  const [totalQuestions, setTotalQuestions] = useState(0)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:8081/hashdata')
        
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const data = await response.json()
        console.log(data)
        const fetchedSteps = [
          { 
            title: "Learn the basics", 
            prerequisite: "Basic understanding of programming concepts",
            questions: data.map((item) => ({
              name: item.problemname,
              completed: false,
              resourceUrl: item.resourcename,
              leetCodeUrl: item.problemlink
            }))
          }
        ]
        setSteps(fetchedSteps)
        setTotalQuestions(data.length)
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error)
      }
    }

    fetchData()

    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const updateProgress = (stepIndex: number, questionIndex: number, completed: boolean) => {
    const newSteps = [...steps]
    newSteps[stepIndex].questions[questionIndex].completed = completed
    setSteps(newSteps)

    const newTotalProgress = newSteps.reduce((acc, step) => 
      acc + step.questions.filter(q => q.completed).length, 0
    )
    setTotalProgress(newTotalProgress)
  }

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

        {/* Course Title and Description */}
        <section className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 transition-all duration-300 hover:text-red-600">
            BatCode's DSA Course
          </h1>
          <p className="text-xl md:text-2xl mb-8 transition-all duration-300 hover:text-red-500">
            Learn DSA from A to Z for free in a well-organized and structured manner.
          </p>
        </section>

        {/* Course Progress */}
        <section className="container mx-auto px-4 py-8">
          <Card className="transition-all duration-300 hover:shadow-2xl">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 transition-all duration-300 hover:text-red-600">Your Progress: {totalProgress}/{totalQuestions}</h2>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div 
                  className="bg-red-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${(totalProgress / totalQuestions) * 100}%` }}
                ></div>
              </div>
              <p className="mt-2 text-right transition-all duration-300 hover:text-red-500">
                {totalQuestions > 0 ? Math.round((totalProgress / totalQuestions) * 100) : 0}% complete
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Course Steps */}
        <section className="container mx-auto px-4 py-8">
          <Accordion type="single" collapsible className="w-full">
            {steps.map((step, stepIndex) => (
              <AccordionItem key={stepIndex} value={`item-${stepIndex}`} className="mb-4">
                <AccordionTrigger className="text-left py-4 px-6 bg-gray-100 dark:bg-gray-800 rounded-lg transition-all duration-300 hover:bg-red-100 dark:hover:bg-red-900">
                  <div className="flex justify-between items-center w-full">
                    <span className="text-xl font-semibold">{`Step ${stepIndex + 1}: ${step.title}`}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {step.questions.filter(q => q.completed).length}/{step.questions.length}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-4 bg-white dark:bg-gray-700 rounded-b-lg transition-all duration-300">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="prerequisite">
                      <AccordionTrigger className="text-left py-2 px-4 bg-gray-50 dark:bg-gray-600 rounded-lg transition-all duration-300 hover:bg-red-50 dark:hover:bg-red-800">
                        Prerequisite
                      </AccordionTrigger>
                      <AccordionContent className="p-4 bg-gray-50 dark:bg-gray-600 rounded-b-lg">
                        <p className="text-gray-700 dark:text-gray-300">{step.prerequisite}</p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="questions-resources">
                      <AccordionTrigger className="text-left py-2 px-4 bg-gray-50 dark:bg-gray-600 rounded-lg transition-all duration-300 hover:bg-red-50 dark:hover:bg-red-800">
                        Questions and Resources
                      </AccordionTrigger>
                      <AccordionContent className="p-4 bg-gray-50 dark:bg-gray-600 rounded-b-lg">
                        <div className="overflow-x-auto">
                          <table className="min-w-full">
                            <thead>
                              <tr className="border-b dark:border-gray-700">
                                <th className="py-2 px-4 text-left">Status</th>
                                <th className="py-2 px-4 text-left">Problem Name</th>
                                <th className="py-2 px-4 text-left">Resource</th>
                                <th className="py-2 px-4 text-left">Link</th>
                              </tr>
                            </thead>
                            <tbody>
                              {step.questions.map((question, questionIndex) => (
                                <tr key={questionIndex} className="border-b dark:border-gray-700">
                                  <td className="py-2 px-4">
                                    <Switch
                                      checked={question.completed}
                                      onCheckedChange={(checked) => updateProgress(stepIndex, questionIndex, checked)}
                                    />
                                  </td>
                                  <td className="py-2 px-4">{question.name}</td>
                                  <td className="py-2 px-4">
                                    <a href={question.resourceUrl} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 font-semibold transition-colors duration-300">
                                      <Youtube className="inline mr-2 w-5 h-5" />
                                      Watch
                                    </a>
                                  </td>
                                  <td className="py-2 px-4">
                                    <a href={question.leetCodeUrl} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-600 dark:text-green-400 dark:hover:text-green-300 font-semibold transition-colors duration-300">
                                      <ExternalLink className="inline mr-2 w-5 h-5" />
                                      Solve
                                    </a>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Footer */}
        <footer className="bg-gray-100 dark:bg-gray-800 py-6 transition-all duration-300">
          <div className="container mx-auto px-4 text-center">
            <p className="transition-all duration-300 hover:text-red-600">&copy; {new Date().getFullYear()} TakeUForward. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}