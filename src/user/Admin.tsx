"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  CalendarDays,
  FileText,
  Users,
  Video,
  Kanban,
  BarChart2,
  Settings,
  Award,
  Layout,
  Linkedin,
  ClipboardList,
  UserPlus,
  UserMinus,
  Edit,
  Trash2,
  List
} from "lucide-react"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts"
import { Link } from 'react-router-dom'

const performanceData = [
  { name: "Completed Tasks", value: 65 },
  { name: "In Progress", value: 25 },
  { name: "Overdue", value: 10 },
]

const COLORS = ["#2dd4bf", "#14b8a6", "#0d9488"]

const sections = [
  {
    title: "Collaboration",
    description: "Work together with your team",
    links: [
      { name: "Video Conferencing", href: "/video-conference", icon: Video },
      { name: "Document List", href: "/documents", icon: FileText },
      { name: "Document Editor", href: "/document/new", icon: FileText },
    ],
  },
  {
    title: "Team Building",
    description: "Engage with your team",
    links: [{ name: "Team Activities", href: "/team-building", icon: Award }],
  },
  {
    title: "User Management",
    description: "Manage your account and settings",
    links: [
      { name: "Profile Display", href: "/profile", icon: Settings }
    ],
  },
]

export default function Admin() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [allTasks, setAllTasks] = useState([])

  const fetchAllTasks = () => {
    // This is a mock function. In a real application, you would make an API call here.
    const mockTasks = [
      { id: 1, title: "Complete project report", assignee: "John Doe" },
      { id: 2, title: "Attend team meeting", assignee: "Jane Smith" },
      { id: 3, title: "Review code changes", assignee: "Mike Johnson" },
      { id: 4, title: "Update documentation", assignee: "Sarah Williams" },
      { id: 5, title: "Prepare presentation", assignee: "Chris Brown" },
    ]
    setAllTasks(mockTasks)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-800">
        <div className="flex items-center justify-center">
          <span className="sr-only">Company</span>
          <span className="font-bold text-2xl text-teal-400">Company</span>
        </div>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          {["Dashboard", "Projects", "Team", "Settings"].map((item) => (
            <button
              key={item}
              className={`text-sm font-medium hover:text-teal-400 transition-colors ${
                activeSection === item.toLowerCase() ? "text-teal-400" : "text-white"
              }`}
              onClick={() => setActiveSection(item.toLowerCase())}
            >
              {item}
            </button>
          ))}
        </nav>
      </header>
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6 text-white">Admin Dashboard</h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-teal-400">Quick Actions</CardTitle>
                <CardDescription className="text-gray-300">Access key features</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                  <ClipboardList className="mr-2 h-4 w-4" /> Create Task
                </Button>
                <Button
                  variant="outline"
                  className="border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-gray-900"
                >
                  <Users className="mr-2 h-4 w-4" /> Show Employee
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-teal-400">Employee Management</CardTitle>
                <CardDescription className="text-gray-300">Add or remove employees</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                  <UserPlus className="mr-2 h-4 w-4" /> Add Employee
                </Button>
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  <UserMinus className="mr-2 h-4 w-4" /> Delete Employee
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-teal-400">Task Management</CardTitle>
                <CardDescription className="text-gray-300">View and manage all tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={fetchAllTasks} className="w-full bg-teal-600 hover:bg-teal-700 text-white mb-4">
                  <List className="mr-2 h-4 w-4" /> Get All Tasks
                </Button>
                <ul className="space-y-2">
                  {allTasks.map((task) => (
                    <li key={task.id} className="flex items-center justify-between">
                      <span className="text-white">{task.title} - {task.assignee}</span>
                      <div>
                        <Button variant="ghost" size="icon" className="text-teal-400 hover:text-teal-300">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-300">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="md:col-span-2 lg:col-span-3 bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-teal-400">Workspace Performance</CardTitle>
                <CardDescription className="text-gray-300">Your task completion status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={performanceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {performanceData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ background: '#1f2937', border: 'none', color: 'white' }} />
                      <Legend formatter={(value) => <span style={{ color: 'white' }}>{value}</span>} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            {sections.map((section, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-teal-400">{section.title}</CardTitle>
                  <CardDescription className="text-gray-300">{section.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          href={link.href}
                          className="flex items-center text-white hover:text-teal-400 transition-colors"
                        >
                          <link.icon className="mr-2 h-4 w-4" />
                          <span>{link.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <footer className="w-full py-6 px-4 bg-gray-800 border-t border-gray-700">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-teal-400">Company</h3>
              <p className="text-sm text-gray-300">©️ 2024 Company. All rights reserved.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-teal-400">Quick Links</h3>
              <nav className="flex flex-col space-y-2">
                <Link href="/privacy" className="text-sm text-gray-300 hover:text-teal-400 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-sm text-gray-300 hover:text-teal-400 transition-colors">
                  Terms of Service
                </Link>
              </nav>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-teal-400">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors">
                  <Linkedin className="h-6 w-6" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}