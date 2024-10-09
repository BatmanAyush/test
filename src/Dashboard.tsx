import { useState } from 'react'
import { useNavigate } from "react-router-dom"
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
} from "lucide-react"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts"

const performanceData = [
  { name: "Completed Tasks", value: 65 },
  { name: "In Progress", value: 25 },
  { name: "Overdue", value: 10 },
]

const COLORS = ["#2dd4bf", "#14b8a6", "#0d9488"]

const sections = [
  {
    title: "Project Management",
    description: "Manage your projects and tasks",
    links: [
      { name: "Project Overview", href: "/projects", icon: Layout },
      { name: "Kanban Board", href: "/kanban", icon: Kanban },
      { name: "Gantt Chart", href: "/gantt", icon: BarChart2 },
    ],
  },
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
      { name: "Profile Management", href: "/profile", icon: Settings },
      { name: "Admin Panel", href: "/admin", icon: Users },
    ],
  },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState("dashboard")

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
          <h1 className="text-3xl font-bold mb-6 text-white">Dashboard</h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-teal-400">Quick Actions</CardTitle>
                <CardDescription className="text-gray-300">Access key features</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white" onClick={() => navigate("/tasks/new")}>
                  <Kanban className="mr-2 h-4 w-4" /> Create New Task
                </Button>
                <Button
                  variant="outline"
                  className="border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-gray-900"
                  onClick={() => navigate("/video-conference/new")}
                >
                  <Video className="mr-2 h-4 w-4" /> Start Video Call
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-teal-400">Upcoming Meetings</CardTitle>
                <CardDescription className="text-gray-300">Your schedule for today</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-white">
                  <li className="flex items-center">
                    <CalendarDays className="mr-2 h-4 w-4 text-teal-400" />
                    <span>Team Standup - 10:00 AM</span>
                  </li>
                  <li className="flex items-center">
                    <CalendarDays className="mr-2 h-4 w-4 text-teal-400" />
                    <span>Project Review - 2:00 PM</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-teal-400">Recent Documents</CardTitle>
                <CardDescription className="text-gray-300">Recently edited files</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <FileText className="mr-2 h-4 w-4 text-teal-400" />
                    <button
                      className="text-white hover:text-teal-400 transition-colors"
                      onClick={() => navigate("/document/1")}
                    >
                      Q4 Report.docx
                    </button>
                  </li>
                  <li className="flex items-center">
                    <FileText className="mr-2 h-4 w-4 text-teal-400" />
                    <button
                      className="text-white hover:text-teal-400 transition-colors"
                      onClick={() => navigate("/document/2")}
                    >
                      Project Proposal.pdf
                    </button>
                  </li>
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
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
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
                        <button
                          onClick={() => navigate(link.href)}
                          className="flex items-center text-white hover:text-teal-400 transition-colors"
                        >
                          <link.icon className="mr-2 h-4 w-4" />
                          <span>{link.name}</span>
                        </button>
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
              <p className="text-sm text-gray-300">© 2024 Company. All rights reserved.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-teal-400">Quick Links</h3>
              <nav className="flex flex-col space-y-2">
                <button onClick={() => navigate("/privacy")} className="text-sm text-gray-300 hover:text-teal-400 transition-colors">
                  Privacy Policy
                </button>
                <button onClick={() => navigate("/terms")} className="text-sm text-gray-300 hover:text-teal-400 transition-colors">
                  Terms of Service
                </button>
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