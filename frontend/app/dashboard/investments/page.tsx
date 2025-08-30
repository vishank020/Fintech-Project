"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import Link from "next/link";
import {
  Target,
  TrendingUp,
  Bell,
  User,
  CreditCard,
  PieChart,
  BarChart3,
  Shield,
  Calculator,
  Lightbulb,
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
  { icon: Target, label: "Goals", href: "/dashboard/goals" },
  { icon: CreditCard, label: "Transactions", href: "/dashboard/transactions" },
  { icon: TrendingUp, label: "Investments", href: "/dashboard/investments", active: true },
  { icon: Bell, label: "Notifications", href: "/dashboard/notifications" },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
]

const riskProfiles = [
  {
    id: "conservative",
    name: "Conservative",
    description: "Low risk, steady returns",
    expectedReturn: "6-8%",
    riskLevel: 2,
    allocation: { equity: 20, debt: 70, gold: 10 },
  },
  {
    id: "balanced",
    name: "Balanced",
    description: "Moderate risk, balanced growth",
    expectedReturn: "8-12%",
    riskLevel: 5,
    allocation: { equity: 50, debt: 40, gold: 10 },
  },
  {
    id: "aggressive",
    name: "Aggressive",
    description: "High risk, high potential returns",
    expectedReturn: "12-18%",
    riskLevel: 8,
    allocation: { equity: 80, debt: 15, gold: 5 },
  },
]

const investmentOptions = [
  {
    name: "Large Cap Equity Fund",
    type: "Mutual Fund",
    risk: "Medium",
    returns: "12.5%",
    minInvestment: 500,
    category: "equity",
    description: "Invest in top 100 companies by market cap",
  },
  {
    name: "Corporate Bond Fund",
    type: "Debt Fund",
    risk: "Low",
    returns: "7.2%",
    minInvestment: 1000,
    category: "debt",
    description: "High-grade corporate bonds",
  },
  {
    name: "Gold ETF",
    type: "ETF",
    risk: "Medium",
    returns: "8.5%",
    minInvestment: 100,
    category: "gold",
    description: "Track gold prices digitally",
  },
  {
    name: "Small Cap Fund",
    type: "Mutual Fund",
    risk: "High",
    returns: "15.8%",
    minInvestment: 500,
    category: "equity",
    description: "High growth potential small companies",
  },
  {
    name: "Government Securities",
    type: "Debt Fund",
    risk: "Very Low",
    returns: "6.8%",
    minInvestment: 1000,
    category: "debt",
    description: "Government-backed securities",
  },
  {
    name: "ELSS Tax Saver",
    type: "Tax Saver",
    risk: "Medium",
    returns: "13.2%",
    minInvestment: 500,
    category: "equity",
    description: "Tax benefits under 80C",
  },
]

export default function InvestmentsPage() {
  const [selectedRiskProfile, setSelectedRiskProfile] = useState("balanced")
  const [investmentAmount, setInvestmentAmount] = useState([50000])
  const [investmentPeriod, setInvestmentPeriod] = useState([10])

  const currentProfile = riskProfiles.find((profile) => profile.id === selectedRiskProfile)

  // Generate growth simulation data
  const generateGrowthData = () => {
    const years = investmentPeriod[0]
    const principal = investmentAmount[0]
    const annualReturn = selectedRiskProfile === "conservative" ? 0.07 : selectedRiskProfile === "balanced" ? 0.1 : 0.14

    const data = []
    for (let year = 0; year <= years; year++) {
      const value = principal * Math.pow(1 + annualReturn, year)
      data.push({
        year: year,
        value: Math.round(value),
        invested: principal,
      })
    }
    return data
  }

  const growthData = generateGrowthData()
  const finalValue = growthData[growthData.length - 1]?.value || 0
  const totalGains = finalValue - investmentAmount[0]

  const allocationData = currentProfile
    ? [
        { name: "Equity", value: currentProfile.allocation.equity, color: "hsl(var(--chart-1))" },
        { name: "Debt", value: currentProfile.allocation.debt, color: "hsl(var(--chart-2))" },
        { name: "Gold", value: currentProfile.allocation.gold, color: "hsl(var(--chart-3))" },
      ]
    : []

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Very Low":
        return "bg-green-500"
      case "Low":
        return "bg-green-400"
      case "Medium":
        return "bg-yellow-500"
      case "High":
        return "bg-orange-500"
      case "Very High":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const filteredInvestments = currentProfile
    ? investmentOptions.filter((option) => {
        if (selectedRiskProfile === "conservative") return option.risk === "Very Low" || option.risk === "Low"
        if (selectedRiskProfile === "balanced") return option.risk !== "Very High"
        return true
      })
    : investmentOptions

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
            <div className="mb-8">
              <h1 className="text-3xl font-poppins font-bold text-foreground mb-2">Investment Planning</h1>
              <p className="text-muted-foreground">
                Build a personalized investment portfolio based on your risk profile
              </p>
            </div>

            {/* Risk Profile Selection */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="font-poppins flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Risk Profile Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedRiskProfile} onValueChange={setSelectedRiskProfile}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {riskProfiles.map((profile) => (
                      <div key={profile.id} className="relative">
                        <RadioGroupItem value={profile.id} id={profile.id} className="sr-only" />
                        <Label
                          htmlFor={profile.id}
                          className={`block p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            selectedRiskProfile === profile.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-poppins font-semibold">{profile.name}</h3>
                            <Badge variant="outline" className="text-xs">
                              {profile.expectedReturn}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{profile.description}</p>
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span>Risk Level</span>
                              <span>{profile.riskLevel}/10</span>
                            </div>
                            <Progress value={profile.riskLevel * 10} className="h-2" />
                          </div>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Investment Calculator */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-poppins flex items-center">
                    <Calculator className="w-5 h-5 mr-2" />
                    Investment Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Investment Amount: ₹{investmentAmount[0].toLocaleString()}</Label>
                    <Slider
                      value={investmentAmount}
                      onValueChange={setInvestmentAmount}
                      max={1000000}
                      min={10000}
                      step={10000}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Investment Period: {investmentPeriod[0]} years</Label>
                    <Slider
                      value={investmentPeriod}
                      onValueChange={setInvestmentPeriod}
                      max={30}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Invested Amount</p>
                        <p className="font-bold text-lg">₹{investmentAmount[0].toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Expected Value</p>
                        <p className="font-bold text-lg text-primary">₹{finalValue.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Total Gains</p>
                        <p className="font-bold text-lg text-green-500">₹{totalGains.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Expected Return</p>
                        <p className="font-bold text-lg">{currentProfile?.expectedReturn}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Portfolio Allocation */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-poppins flex items-center">
                    <PieChart className="w-5 h-5 mr-2" />
                    Recommended Allocation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center mb-4">
                    <ResponsiveContainer width="100%" height={200}>
                      <RechartsPieChart>
                        <RechartsPieChart data={allocationData} cx="50%" cy="50%" outerRadius={80}>
                          {allocationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </RechartsPieChart>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-3">
                    {allocationData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-sm font-medium">{item.name}</span>
                        </div>
                        <span className="text-sm font-bold">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Growth Projection */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="font-poppins flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Growth Projection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={growthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: any, name: string) => [
                        `₹${Number(value).toLocaleString()}`,
                        name === "value" ? "Portfolio Value" : "Invested Amount",
                      ]}
                    />
                    <Line
                      type="monotone"
                      dataKey="invested"
                      stroke="hsl(var(--muted-foreground))"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Investment Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="font-poppins flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2" />
                  Recommended Investments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredInvestments.map((investment, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card className="h-full hover:shadow-lg transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-poppins font-semibold text-sm mb-1">{investment.name}</h3>
                              <p className="text-xs text-muted-foreground">{investment.type}</p>
                            </div>
                            <Badge
                              variant="secondary"
                              className={`text-xs ${getRiskColor(investment.risk)} text-white`}
                            >
                              {investment.risk}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mb-3">{investment.description}</p>
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span className="text-muted-foreground">Expected Returns</span>
                              <span className="font-bold text-green-500">{investment.returns}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-muted-foreground">Min Investment</span>
                              <span className="font-medium">₹{investment.minInvestment}</span>
                            </div>
                          </div>
                          <Button size="sm" className="w-full mt-3 text-xs">
                            Invest Now
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
