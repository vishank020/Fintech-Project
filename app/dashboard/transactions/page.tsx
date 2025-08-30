"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Target,
  TrendingUp,
  Bell,
  User,
  CreditCard,
  Plus,
  IndianRupee,
  Filter,
  Download,
  Upload,
  Search,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { motion } from "framer-motion"

const sidebarItems = [
  { icon: Target, label: "Goals", href: "/dashboard/goals" },
  { icon: CreditCard, label: "Transactions", href: "/dashboard/transactions", active: true },
  { icon: TrendingUp, label: "Investments", href: "/dashboard/investments" },
  { icon: Bell, label: "Notifications", href: "/dashboard/notifications" },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
]

const transactionData = [
  {
    id: 1,
    date: "2024-01-15",
    merchant: "Swiggy",
    amount: -450,
    type: "expense",
    category: "Food & Dining",
    description: "Lunch order",
  },
  {
    id: 2,
    date: "2024-01-15",
    merchant: "Salary Credit",
    amount: 75000,
    type: "income",
    category: "Salary",
    description: "Monthly salary",
  },
  {
    id: 3,
    date: "2024-01-14",
    merchant: "Uber",
    amount: -280,
    type: "expense",
    category: "Transportation",
    description: "Cab fare",
  },
  {
    id: 4,
    date: "2024-01-14",
    merchant: "Amazon",
    amount: -1250,
    type: "expense",
    category: "Shopping",
    description: "Electronics purchase",
  },
  {
    id: 5,
    date: "2024-01-13",
    merchant: "Electricity Board",
    amount: -2100,
    type: "expense",
    category: "Bills & Utilities",
    description: "Monthly electricity bill",
  },
  {
    id: 6,
    date: "2024-01-12",
    merchant: "Zomato",
    amount: -680,
    type: "expense",
    category: "Food & Dining",
    description: "Dinner order",
  },
  {
    id: 7,
    date: "2024-01-12",
    merchant: "SIP Investment",
    amount: -5000,
    type: "investment",
    category: "Investment",
    description: "Monthly SIP",
  },
  {
    id: 8,
    date: "2024-01-11",
    merchant: "Petrol Pump",
    amount: -3200,
    type: "expense",
    category: "Transportation",
    description: "Fuel",
  },
]

const categories = [
  "All Categories",
  "Food & Dining",
  "Transportation",
  "Shopping",
  "Bills & Utilities",
  "Investment",
  "Salary",
  "Other",
]

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState(transactionData)
  const [filteredTransactions, setFilteredTransactions] = useState(transactionData)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [dateFilter, setDateFilter] = useState("")
  const [newTransaction, setNewTransaction] = useState({
    merchant: "",
    amount: "",
    type: "expense",
    category: "",
    description: "",
  })

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    filterTransactions(term, selectedCategory, dateFilter)
  }

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category)
    filterTransactions(searchTerm, category, dateFilter)
  }

  const handleDateFilter = (date: string) => {
    setDateFilter(date)
    filterTransactions(searchTerm, selectedCategory, date)
  }

  const filterTransactions = (search: string, category: string, date: string) => {
    let filtered = transactions

    if (search) {
      filtered = filtered.filter(
        (transaction) =>
          transaction.merchant.toLowerCase().includes(search.toLowerCase()) ||
          transaction.description.toLowerCase().includes(search.toLowerCase()),
      )
    }

    if (category && category !== "All Categories") {
      filtered = filtered.filter((transaction) => transaction.category === category)
    }

    if (date) {
      filtered = filtered.filter((transaction) => transaction.date.startsWith(date))
    }

    setFilteredTransactions(filtered)
  }

  const handleAddTransaction = () => {
    if (newTransaction.merchant && newTransaction.amount && newTransaction.category) {
      const transaction = {
        id: transactions.length + 1,
        date: new Date().toISOString().split("T")[0],
        merchant: newTransaction.merchant,
        amount:
          newTransaction.type === "income"
            ? Number.parseInt(newTransaction.amount)
            : -Number.parseInt(newTransaction.amount),
        type: newTransaction.type,
        category: newTransaction.category,
        description: newTransaction.description,
      }

      const updatedTransactions = [transaction, ...transactions]
      setTransactions(updatedTransactions)
      setFilteredTransactions(updatedTransactions)
      setNewTransaction({
        merchant: "",
        amount: "",
        type: "expense",
        category: "",
        description: "",
      })
      setIsDialogOpen(false)
    }
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "income":
        return <ArrowDownRight className="w-4 h-4 text-green-500" />
      case "investment":
        return <TrendingUp className="w-4 h-4 text-blue-500" />
      default:
        return <ArrowUpRight className="w-4 h-4 text-red-500" />
    }
  }

  const getAmountColor = (amount: number) => {
    return amount > 0 ? "text-green-500" : "text-red-500"
  }

  const totalIncome = transactions.filter((t) => t.amount > 0).reduce((sum, t) => sum + t.amount, 0)
  const totalExpenses = transactions.filter((t) => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0)
  const netBalance = totalIncome - totalExpenses

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
                <h1 className="text-3xl font-poppins font-bold text-foreground mb-2">Transactions</h1>
                <p className="text-muted-foreground">Track and manage your financial transactions</p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" className="font-poppins bg-transparent">
                  <Upload className="w-4 h-4 mr-2" />
                  Import
                </Button>
                <Button variant="outline" className="font-poppins bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="font-poppins">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Transaction
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle className="font-poppins">Add New Transaction</DialogTitle>
                      <DialogDescription>Record a new financial transaction manually.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="merchant">Merchant/Source</Label>
                        <Input
                          id="merchant"
                          placeholder="e.g., Swiggy, Amazon, Salary"
                          value={newTransaction.merchant}
                          onChange={(e) => setNewTransaction({ ...newTransaction, merchant: e.target.value })}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="amount">Amount (₹)</Label>
                          <Input
                            id="amount"
                            type="number"
                            placeholder="1000"
                            value={newTransaction.amount}
                            onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="type">Type</Label>
                          <Select
                            value={newTransaction.type}
                            onValueChange={(value) => setNewTransaction({ ...newTransaction, type: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="expense">Expense</SelectItem>
                              <SelectItem value="income">Income</SelectItem>
                              <SelectItem value="investment">Investment</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={newTransaction.category}
                          onValueChange={(value) => setNewTransaction({ ...newTransaction, category: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.slice(1).map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Description (Optional)</Label>
                        <Input
                          id="description"
                          placeholder="Brief description"
                          value={newTransaction.description}
                          onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddTransaction}>Add Transaction</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Income</p>
                      <p className="text-2xl font-bold text-green-500">₹{totalIncome.toLocaleString()}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <ArrowDownRight className="w-6 h-6 text-green-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Expenses</p>
                      <p className="text-2xl font-bold text-red-500">₹{totalExpenses.toLocaleString()}</p>
                    </div>
                    <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center">
                      <ArrowUpRight className="w-6 h-6 text-red-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Net Balance</p>
                      <p className={`text-2xl font-bold ${getAmountColor(netBalance)}`}>
                        ₹{netBalance.toLocaleString()}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <IndianRupee className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="font-poppins flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="search">Search</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="search"
                        placeholder="Search transactions..."
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category-filter">Category</Label>
                    <Select value={selectedCategory} onValueChange={handleCategoryFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date-filter">Date</Label>
                    <Input
                      id="date-filter"
                      type="month"
                      value={dateFilter}
                      onChange={(e) => handleDateFilter(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Transactions Table */}
            <Card>
              <CardHeader>
                <CardTitle className="font-poppins">Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Merchant</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">
                          {new Date(transaction.date).toLocaleDateString("en-IN")}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getTransactionIcon(transaction.type)}
                            <span>{transaction.merchant}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {transaction.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{transaction.description}</TableCell>
                        <TableCell className={`text-right font-medium ${getAmountColor(transaction.amount)}`}>
                          {transaction.amount > 0 ? "+" : ""}₹{Math.abs(transaction.amount).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {filteredTransactions.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No transactions found matching your filters.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
