"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Target,
  TrendingUp,
  Bell,
  User,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  IndianRupee,
} from "lucide-react"
import { motion } from "framer-motion"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Cell,
} from "recharts"

const sidebarItems = [
  { icon: Target, label: "Goals", href: "/dashboard", active: true },
  { icon: CreditCard, label: "Transactions", href: "/dashboard/transactions" },
  { icon: TrendingUp, label: "Investments", href: "/dashboard/investments" },
  { icon: Bell, label: "Notifications", href: "/dashboard/notifications" },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
]

const savingsData = [
  { month: "Jan", amount: 15000 },
  { month: "Feb", amount: 22000 },
  { month: "Mar", amount: 28000 },
  { month: "Apr", amount: 35000 },
  { month: "May", amount: 42000 },
  { month: "Jun", amount: 48000 },
]

const spendingData = [
  { name: "Food & Dining", value: 35, color: "hsl(var(--chart-1))" },
  { name: "Transportation", value: 20, color: "hsl(var(--chart-2))" },
  { name: "Shopping", value: 25, color: "hsl(var(--chart-3))" },
  { name: "Bills & Utilities", value: 20, color: "hsl(var(--chart-4))" },
]

const goals = [
  { name: "Emergency Fund", current: 48000, target: 100000, progress: 48 },
  { name: "Vacation", current: 15000, target: 50000, progress: 30 },
  { name: "New Car", current: 75000, target: 200000, progress: 37.5 },
]

const notifications = [
  { type: "success", message: "Great job! You saved ₹2,500 more than planned this month", time: "2h ago" },
  { type: "warning", message: "You're spending 15% more on dining out this month", time: "4h ago" },
  { type: "info", message: "Consider investing in SIP for better returns", time: "1d ago" },
]

const investments = [
  { name: "SIP - Large Cap", type: "Mutual Fund", returns: "+12.5%", amount: "₹5,000/month" },
  { name: "PPF", type: "Tax Saving", returns: "+7.1%", amount: "₹1,50,000/year" },
  { name: "FD", type: "Fixed Deposit", returns: "+6.5%", amount: "₹2,00,000" },
]

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-card border-r border-border min-h-screen p-6">
          <link href='/' className="flex items-center gap-2 mb-8">  {/* Logo to homepage */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-poppins font-semibold text-foreground">FinCoach AI</span>
            </div>
          </link>

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
            <div className="mb-8">
              <h1 className="text-3xl font-poppins font-bold text-foreground mb-2">Welcome back, Alex!</h1>
              <p className="text-muted-foreground">Here's your financial overview for today</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Savings</p>
                      <p className="text-2xl font-bold text-foreground">₹1,38,000</p>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <IndianRupee className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex items-center mt-2 text-sm">
                    <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-green-500">+8.2%</span>
                    <span className="text-muted-foreground ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Monthly Spending</p>
                      <p className="text-2xl font-bold text-foreground">₹45,200</p>
                    </div>
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-accent" />
                    </div>
                  </div>
                  <div className="flex items-center mt-2 text-sm">
                    <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
                    <span className="text-red-500">+3.1%</span>
                    <span className="text-muted-foreground ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Investment Returns</p>
                      <p className="text-2xl font-bold text-foreground">+12.5%</p>
                    </div>
                    <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-green-500" />
                    </div>
                  </div>
                  <div className="flex items-center mt-2 text-sm">
                    <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-green-500">+2.3%</span>
                    <span className="text-muted-foreground ml-1">this quarter</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Goals Progress</p>
                      <p className="text-2xl font-bold text-foreground">3/5</p>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex items-center mt-2 text-sm">
                    <span className="text-muted-foreground">Goals on track</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Savings Progress Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-poppins">Savings Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={savingsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="amount"
                        stroke="hsl(var(--primary))"
                        strokeWidth={3}
                        dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Spending Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-poppins">Spending Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <RechartsPieChart data={spendingData} cx="50%" cy="50%" outerRadius={80}>
                        {spendingData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </RechartsPieChart>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {spendingData.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-sm text-muted-foreground">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Goals Progress */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="font-poppins">Financial Goals</CardTitle>
                  <Button size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Goal
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {goals.map((goal, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">{goal.name}</span>
                        <span className="text-sm text-muted-foreground">
                          ₹{goal.current.toLocaleString()} / ₹{goal.target.toLocaleString()}
                        </span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                      <div className="text-xs text-muted-foreground">{goal.progress}% complete</div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-poppins">AI Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {notifications.map((notification, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          notification.type === "success"
                            ? "bg-green-500"
                            : notification.type === "warning"
                              ? "bg-yellow-500"
                              : "bg-blue-500"
                        }`}
                      />
                      <div className="flex-1">
                        <p className="text-sm text-foreground">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Investment Suggestions */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-poppins">Investment Suggestions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {investments.map((investment, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-sm">{investment.name}</h4>
                          <p className="text-xs text-muted-foreground">{investment.type}</p>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {investment.returns}
                        </Badge>
                      </div>
                      <p className="text-sm text-foreground">{investment.amount}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
