"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import Link from "next/link";
import {
  Target,
  TrendingUp,
  Bell,
  User,
  CreditCard,
  CheckCircle,
  AlertTriangle,
  Info,
  Calendar,
  Settings,
  Trash2,
} from "lucide-react"
import { motion } from "framer-motion"

const sidebarItems = [
  { icon: Target, label: "Goals", href: "/dashboard/goals" },
  { icon: CreditCard, label: "Transactions", href: "/dashboard/transactions" },
  { icon: TrendingUp, label: "Investments", href: "/dashboard/investments" },
  { icon: Bell, label: "Notifications", href: "/dashboard/notifications", active: true },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
]

const notifications = [
  {
    id: 1,
    type: "success",
    title: "Goal Achievement",
    message: "Congratulations! You've reached 50% of your Emergency Fund goal. Keep up the great work!",
    time: "2 hours ago",
    read: false,
    icon: CheckCircle,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    id: 2,
    type: "warning",
    title: "Spending Alert",
    message: "You've spent 15% more on dining out this month compared to your budget. Consider reducing expenses.",
    time: "4 hours ago",
    read: false,
    icon: AlertTriangle,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    id: 3,
    type: "info",
    title: "Investment Opportunity",
    message: "Based on your risk profile, consider investing in SIP for better long-term returns.",
    time: "1 day ago",
    read: true,
    icon: Info,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    id: 4,
    type: "reminder",
    title: "EMI Reminder",
    message: "Your car loan EMI of ₹15,000 is due on 25th January. Ensure sufficient balance.",
    time: "1 day ago",
    read: true,
    icon: Calendar,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    id: 5,
    type: "success",
    title: "Savings Milestone",
    message: "Great job! You saved ₹2,500 more than planned this month. You're on track for your goals.",
    time: "2 days ago",
    read: true,
    icon: CheckCircle,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    id: 6,
    type: "info",
    title: "Market Update",
    message: "Your investment portfolio gained 2.3% this week. Consider rebalancing for optimal returns.",
    time: "3 days ago",
    read: true,
    icon: TrendingUp,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
]

const notificationSettings = [
  { id: "goal_updates", label: "Goal Progress Updates", enabled: true },
  { id: "spending_alerts", label: "Spending Alerts", enabled: true },
  { id: "investment_tips", label: "Investment Recommendations", enabled: true },
  { id: "emi_reminders", label: "EMI & Bill Reminders", enabled: true },
  { id: "market_updates", label: "Market Updates", enabled: false },
  { id: "weekly_summary", label: "Weekly Financial Summary", enabled: true },
]

export default function NotificationsPage() {
  const [notificationList, setNotificationList] = useState(notifications)
  const [settings, setSettings] = useState(notificationSettings)

  const markAsRead = (id: number) => {
    setNotificationList(
      notificationList.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const deleteNotification = (id: number) => {
    setNotificationList(notificationList.filter((notification) => notification.id !== id))
  }

  const markAllAsRead = () => {
    setNotificationList(notificationList.map((notification) => ({ ...notification, read: true })))
  }

  const toggleSetting = (id: string) => {
    setSettings(settings.map((setting) => (setting.id === id ? { ...setting, enabled: !setting.enabled } : setting)))
  }

  const unreadCount = notificationList.filter((n) => !n.read).length

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
                {item.label === "Notifications" && unreadCount > 0 && (
                  <Badge variant="destructive" className="text-xs px-1.5 py-0.5 min-w-[1.25rem] h-5">
                    {unreadCount}
                  </Badge>
                )}
              </motion.a>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-poppins font-bold text-foreground mb-2">Notifications</h1>
                <p className="text-muted-foreground">Stay updated with your financial activities</p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
                  Mark All Read
                </Button>
                <Button variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>

            {/* Notification Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Notifications</p>
                      <p className="text-2xl font-bold text-foreground">{notificationList.length}</p>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Bell className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Unread</p>
                      <p className="text-2xl font-bold text-foreground">{unreadCount}</p>
                    </div>
                    <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center">
                      <Bell className="w-6 h-6 text-red-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">This Week</p>
                      <p className="text-2xl font-bold text-foreground">
                        {notificationList.filter((n) => n.time.includes("day") || n.time.includes("hour")).length}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-green-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Notifications List */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-poppins">Recent Notifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {notificationList.map((notification, index) => (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className={`p-4 rounded-lg border transition-all hover:shadow-md ${
                            notification.read ? "bg-muted/20" : "bg-card border-primary/20"
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div
                              className={`w-10 h-10 rounded-lg flex items-center justify-center ${notification.bgColor}`}
                            >
                              <notification.icon className={`w-5 h-5 ${notification.color}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <h3 className="font-poppins font-semibold text-sm">{notification.title}</h3>
                                <div className="flex items-center space-x-2">
                                  {!notification.read && <div className="w-2 h-2 bg-primary rounded-full" />}
                                  <Button variant="ghost" size="sm" onClick={() => deleteNotification(notification.id)}>
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-muted-foreground">{notification.time}</span>
                                {!notification.read && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => markAsRead(notification.id)}
                                    className="text-xs"
                                  >
                                    Mark as read
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Notification Settings */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="font-poppins">Notification Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {settings.map((setting) => (
                        <div key={setting.id} className="flex items-center justify-between">
                          <Label htmlFor={setting.id} className="text-sm font-medium cursor-pointer">
                            {setting.label}
                          </Label>
                          <Switch
                            id={setting.id}
                            checked={setting.enabled}
                            onCheckedChange={() => toggleSetting(setting.id)}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
