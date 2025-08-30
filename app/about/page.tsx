"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link";
import {
  Target,
  TrendingUp,
  Bell,
  Bot,
  Gamepad2,
  MessageSquare,
  Mic,
  Trophy,
  ArrowRight,
  Lightbulb,
  Shield,
  MessageCircle,
} from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: Target,
    title: "Goal Planning",
    description: "Set and track financial goals with AI-powered insights and daily saving recommendations.",
    status: "Available",
  },
  {
    icon: Bot,
    title: "Agentic AI",
    description: "Intelligent financial coaching that learns from your behavior and provides personalized advice.",
    status: "Available",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Proactive alerts for spending patterns, goal progress, and investment opportunities.",
    status: "Available",
  },
  {
    icon: Gamepad2,
    title: "Gamification",
    description: "Earn rewards and achievements for reaching financial milestones and maintaining good habits.",
    status: "Coming Soon",
  },
]

const roadmapFeatures = [
  {
    icon: MessageSquare,
    title: "WhatsApp AI Assistant",
    description: "Get financial advice and track expenses directly through WhatsApp conversations.",
    timeline: "Q2 2024",
    priority: "High",
  },
  {
    icon: Mic,
    title: "Voice Assistant",
    description: "Voice-powered financial management with natural language processing.",
    timeline: "Q3 2024",
    priority: "Medium",
  },
  {
    icon: Trophy,
    title: "Gamified Finance",
    description: "Complete financial challenges, earn badges, and compete with friends.",
    timeline: "Q4 2024",
    priority: "High",
  },
  {
    icon: Shield,
    title: "Advanced Security",
    description: "Biometric authentication and enhanced fraud detection capabilities.",
    timeline: "Q1 2025",
    priority: "High",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/10">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-poppins font-semibold text-foreground">FinCoach AI</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </a>
            <a href="/about" className="text-foreground font-medium">
              About
            </a>
            <Link href="/auth" > 
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-poppins font-bold text-foreground mb-6">
            About{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">FinCoach AI</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            FinCoach AI is your intelligent financial companion, designed to help you achieve your financial goals
            through personalized coaching, smart insights, and proactive guidance.
          </p>
          <Button size="lg" className="font-poppins">
            Get Started Today
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>

        {/* Current Features */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-poppins font-bold text-foreground mb-4">Current Features</h2>
            <p className="text-lg text-muted-foreground">
              Powerful tools to transform your financial management experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <feature.icon className="w-6 h-6 text-primary" />
                      </div>
                      <Badge variant={feature.status === "Available" ? "default" : "secondary"} className="text-xs">
                        {feature.status}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-poppins font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-poppins font-bold text-foreground mb-4">How FinCoach AI Works</h2>
            <p className="text-lg text-muted-foreground">
              Our AI-powered approach to financial coaching in three simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Analyze",
                description:
                  "Our AI analyzes your spending patterns, income, and financial behavior to understand your unique situation.",
                icon: Lightbulb,
              },
              {
                step: "02",
                title: "Recommend",
                description:
                  "Get personalized recommendations for budgeting, saving, and investing based on your goals and risk profile.",
                icon: Target,
              },
              {
                step: "03",
                title: "Coach",
                description:
                  "Receive ongoing coaching with timely nudges, alerts, and insights to keep you on track toward your goals.",
                icon: Bot,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="text-sm font-bold text-primary mb-2">STEP {item.step}</div>
                <h3 className="text-xl font-poppins font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Roadmap */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-poppins font-bold text-foreground mb-4">Product Roadmap</h2>
            <p className="text-lg text-muted-foreground">Exciting features coming to FinCoach AI</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roadmapFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                        <feature.icon className="w-6 h-6 text-accent" />
                      </div>
                      <div className="text-right">
                        <Badge variant={feature.priority === "High" ? "default" : "secondary"} className="text-xs mb-1">
                          {feature.priority}
                        </Badge>
                        <div className="text-xs text-muted-foreground">{feature.timeline}</div>
                      </div>
                    </div>
                    <h3 className="text-lg font-poppins font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center bg-primary/5 rounded-2xl p-12"
        >
          <h2 className="text-3xl font-poppins font-bold text-foreground mb-4">Ready to Start Your Journey?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already building wealth with AI-powered financial coaching
          </p>
          <Button size="lg" className="font-poppins">
            Get Started Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 px-4 bg-muted/10 mt-16">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-poppins font-semibold text-foreground">FinCoach AI</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Support
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
            © 2024 FinCoach AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
