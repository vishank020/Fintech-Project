"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SupportModal } from "@/components/ui/support"
import { PrivacyPolicyModal } from "@/components/ui/privacy-policy"
import { TermsModal } from "@/components/ui/terms"
import { ArrowRight, Target, TrendingUp, Bell, Shield, Zap, BarChart3, Barcode, SparkleIcon, BrainCircuit, BrainCircuitIcon } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link";

export default function LandingPage() {
  const [open, setOpen] = useState(false)
  const [supportOpen, setSupportOpen] = useState(false)
  const [termsOpen, setTermsOpen] = useState(false)
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/10">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href='/'>  {/* Logo to homepage */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-poppins font-semibold text-foreground">FinCoach AI</span>
            </div>
          </Link>  
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <Link href="/dashboard/investments"
                className="text-muted-foreground hover:text-foreground transition-colors">
                Investment
            </Link>
            <Link href="/dashboard/goals"
                className="text-muted-foreground hover:text-foreground transition-colors">
                Goals
            </Link>
            <Link href="/dashboard/transactions"
                className="text-muted-foreground hover:text-foreground transition-colors">
                Transaction
            </Link>
            <Link href="/dashboard/notifications"
                className="text-muted-foreground hover:text-foreground transition-colors">
                Notification
            </Link>
            <Link href="/about"
                className="text-muted-foreground hover:text-foreground transition-colors">
                About
            </Link>

            <Link href="/auth" > 
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
           
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-6xl font-poppins font-bold text-foreground mb-6 text-balance">
              Your AI-Powered{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Financial Coach
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
              Smart goal tracking, intelligent investment guidance, and proactive financial coaching. Let AI help you
              build wealth and achieve your financial dreams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6 font-poppins font-medium">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 font-poppins font-medium bg-transparent">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-foreground mb-4">
              Intelligent Financial Management
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powered by advanced AI to help you make smarter financial decisions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Smart Goal Tracking",
                description: "Set financial goals and get AI-powered insights on how to achieve them faster",
              },
              {
                icon: TrendingUp,
                title: "Investment Guidance",
                description: "Personalized investment recommendations based on your risk profile and goals",
              },
              {
                icon: Bell,
                title: "Proactive Coaching",
                description: "Get timely nudges and alerts to stay on track with your financial journey",
              },
              {
                icon: Shield,
                title: "Secure & Private",
                description: "Bank-level security with end-to-end encryption for all your financial data",
              },
              {
                icon: Zap,
                title: "Real-time Insights",
                description: "Instant analysis of your spending patterns and saving opportunities",
              },
              {
                icon: BarChart3,
                title: "Visual Analytics",
                description: "Beautiful charts and graphs to visualize your financial progress",
              },
              {
                icon: SparkleIcon,
                title: "ChatBot",
                description: "Command Your Tasks to chatbot",
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 border-border/50">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-poppins font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-foreground mb-6">
              Ready to Transform Your Financial Future?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of users who are already building wealth with AI-powered financial coaching
            </p>
            <Button size="lg" className="text-lg px-8 py-6 font-poppins font-medium">
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 px-4 bg-muted/10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-poppins font-semibold text-foreground">FinCoach AI</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <button
                onClick={() => setOpen(true)}   // 👈 opens modal
                className="hover:text-foreground transition-colors">
                Privacy
              </button>
              <button
                onClick={() => setTermsOpen(true)}
                className="hover:text-foreground transition-colors">
                Terms
              </button>
              <button
                onClick={() => setSupportOpen(true)}
                className="hover:text-foreground transition-colors">
                Support
              </button>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
            © 2025 FinCoach AI. All rights reserved.
          </div>
        </div>
      </footer>
      <PrivacyPolicyModal open={open} onClose={() => setOpen(false)} appName="FinCoach AI" />
      <SupportModal open={supportOpen} onClose={() => setSupportOpen(false)} />
      <TermsModal open={termsOpen} onClose={() => setTermsOpen(false)}appName="FinCoach AI"/>
    </div>
  )
}
