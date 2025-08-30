"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Target,
  TrendingUp,
  Bell,
  User,
  CreditCard,
  Plus,
  IndianRupee,
  Calendar,
  Lightbulb,
  Edit,
  Trash2,
} from "lucide-react"
import { motion } from "framer-motion"

const sidebarItems = [
  { icon: Target, label: "Goals", href: "/dashboard/goals", active: true },
  { icon: CreditCard, label: "Transactions", href: "/dashboard/transactions" },
  { icon: TrendingUp, label: "Investments", href: "/dashboard/investments" },
  { icon: Bell, label: "Notifications", href: "/dashboard/notifications" },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
]

const existingGoals = [
  {
    id: 1,
    name: "Emergency Fund",
    description: "Build a safety net for unexpected expenses",
    current: 48000,
    target: 100000,
    progress: 48,
    timeline: "12 months",
    priority: "High",
    dailySaving: 142,
    category: "Safety",
  },
  {
    id: 2,
    name: "Dream Vacation",
    description: "Trip to Europe with family",
    current: 15000,
    target: 50000,
    progress: 30,
    timeline: "8 months",
    priority: "Medium",
    dailySaving: 146,
    category: "Lifestyle",
  },
  {
    id: 3,
    name: "New Car",
    description: "Down payment for a new car",
    current: 75000,
    target: 200000,
    progress: 37.5,
    timeline: "18 months",
    priority: "Medium",
    dailySaving: 231,
    category: "Transportation",
  },
]

export default function GoalsPage() {
  const [goals, setGoals] = useState(existingGoals)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newGoal, setNewGoal] = useState({
    name: "",
    description: "",
    target: "",
    timeline: "",
    priority: "",
    category: "",
  })

  const calculateDailySaving = (target: number, months: number) => {
    const days = months * 30
    return Math.ceil(target / days)
  }

  const handleCreateGoal = () => {
    if (newGoal.name && newGoal.target && newGoal.timeline) {
      const targetAmount = Number.parseInt(newGoal.target)
      const timelineMonths = Number.parseInt(newGoal.timeline)
      const dailySaving = calculateDailySaving(targetAmount, timelineMonths)

      const goal = {
        id: goals.length + 1,
        name: newGoal.name,
        description: newGoal.description,
        current: 0,
        target: targetAmount,
        progress: 0,
        timeline: `${timelineMonths} months`,
        priority: newGoal.priority,
        dailySaving,
        category: newGoal.category,
      }

      setGoals([...goals, goal])
      setNewGoal({
        name: "",
        description: "",
        target: "",
        timeline: "",
        priority: "",
        category: "",
      })
      setIsDialogOpen(false)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-500"
      case "Medium":
        return "bg-yellow-500"
      case "Low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-card border-r border-border min-h-screen p-6">
          <Link href='/' className="flex items-center gap-2 mb-8">  {/* Logo to homepage */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-poppins font-semibold text-foreground">FinCoach AI</span>
            </div>
          </Link>

          <nav className="space-y-2">
            {sidebarItems.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  item.active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </motion.a>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-poppins font-bold text-foreground mb-2">Financial Goals</h1>
                <p className="text-muted-foreground">Track and manage your financial objectives</p>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="font-poppins">
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Goal
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle className="font-poppins">Create New Financial Goal</DialogTitle>
                    <DialogDescription>
                      Set up a new financial goal and get AI-powered savings recommendations.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Goal Name</Label>
                      <Input
                        id="name"
                        placeholder="e.g., Emergency Fund, New Car"
                        value={newGoal.name}
                        onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description (Optional)</Label>
                      <Textarea
                        id="description"
                        placeholder="Brief description of your goal"
                        value={newGoal.description}
                        onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="target">Target Amount (₹)</Label>
                        <Input
                          id="target"
                          type="number"
                          placeholder="100000"
                          value={newGoal.target}
                          onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timeline">Timeline (Months)</Label>
                        <Input
                          id="timeline"
                          type="number"
                          placeholder="12"
                          value={newGoal.timeline}
                          onChange={(e) => setNewGoal({ ...newGoal, timeline: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="priority">Priority</Label>
                        <Select
                          value={newGoal.priority}
                          onValueChange={(value) => setNewGoal({ ...newGoal, priority: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="High">High</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="Low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={newGoal.category}
                          onValueChange={(value) => setNewGoal({ ...newGoal, category: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Safety">Safety</SelectItem>
                            <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                            <SelectItem value="Transportation">Transportation</SelectItem>
                            <SelectItem value="Education">Education</SelectItem>
                            <SelectItem value="Investment">Investment</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    {newGoal.target && newGoal.timeline && (
                      <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                        <div className="flex items-center space-x-2 mb-2">
                          <Lightbulb className="w-5 h-5 text-primary" />
                          <span className="font-medium text-primary">AI Recommendation</span>
                        </div>
                        <p className="text-sm text-foreground">
                          To reach your goal of ₹{Number.parseInt(newGoal.target || "0").toLocaleString()} in{" "}
                          {newGoal.timeline} months, you need to save approximately{" "}
                          <span className="font-bold text-primary">
                            ₹
                            {calculateDailySaving(
                              Number.parseInt(newGoal.target || "0"),
                              Number.parseInt(newGoal.timeline || "1"),
                            )}{" "}
                            per day
                          </span>
                          .
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateGoal}>Create Goal</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Goals Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Goals</p>
                      <p className="text-2xl font-bold text-foreground">{goals.length}</p>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Target</p>
                      <p className="text-2xl font-bold text-foreground">
                        ₹{goals.reduce((sum, goal) => sum + goal.target, 0).toLocaleString()}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                      <IndianRupee className="w-6 h-6 text-accent" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Saved</p>
                      <p className="text-2xl font-bold text-foreground">
                        ₹{goals.reduce((sum, goal) => sum + goal.current, 0).toLocaleString()}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-green-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Goals List */}
            <div className="space-y-6">
              {goals.map((goal, index) => (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-poppins font-semibold text-foreground">{goal.name}</h3>
                            <Badge
                              variant="secondary"
                              className={`text-xs ${getPriorityColor(goal.priority)} text-white`}
                            >
                              {goal.priority}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {goal.category}
                            </Badge>
                          </div>
                          {goal.description && <p className="text-muted-foreground text-sm mb-3">{goal.description}</p>}
                          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{goal.timeline}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <IndianRupee className="w-4 h-4" />
                              <span>₹{goal.dailySaving}/day needed</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm text-muted-foreground">
                            ₹{goal.current.toLocaleString()} / ₹{goal.target.toLocaleString()}
                          </span>
                        </div>
                        <Progress value={goal.progress} className="h-3" />
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">{goal.progress}% complete</span>
                          <span className="text-muted-foreground">
                            ₹{(goal.target - goal.current).toLocaleString()} remaining
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center space-x-2 mb-1">
                          <Lightbulb className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium text-primary">AI Insight</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          You're on track! Continue saving ₹{goal.dailySaving} daily to reach this goal on time.
                          {goal.progress > 50 && " Great progress so far!"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
