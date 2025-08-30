"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Shield, CheckCircle, XCircle, AlertCircle, ArrowLeft, TrendingUp } from "lucide-react"

interface LoginFormData {
  identifier: string
  password: string
}

interface SignupFormData {
  name: string
  email: string
  contact: string
  password: string
}

interface FormErrors {
  [key: string]: string
}

interface PasswordStrength {
  score: number
  feedback: string[]
}

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  // Form data
  const [loginData, setLoginData] = useState<LoginFormData>({ identifier: "", password: "" })
  const [signupData, setSignupData] = useState<SignupFormData>({ name: "", email: "", contact: "", password: "" })

  // Form errors
  const [loginErrors, setLoginErrors] = useState<FormErrors>({})
  const [signupErrors, setSignupErrors] = useState<FormErrors>({})

  // Password strength calculation
  const calculatePasswordStrength = (password: string): PasswordStrength => {
    let score = 0
    const feedback: string[] = []

    if (password.length >= 8) score += 1
    else feedback.push("At least 8 characters")

    if (/[a-z]/.test(password)) score += 1
    else feedback.push("One lowercase letter")

    if (/[A-Z]/.test(password)) score += 1
    else feedback.push("One uppercase letter")

    if (/\d/.test(password)) score += 1
    else feedback.push("One number")

    if (/[^a-zA-Z0-9]/.test(password)) score += 1
    else feedback.push("One special character")

    return { score, feedback }
  }

  const passwordStrength = calculatePasswordStrength(signupData.password)

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
    return phoneRegex.test(phone.replace(/\s/g, ""))
  }

  const validateLoginForm = (): boolean => {
    const errors: FormErrors = {}

    if (!loginData.identifier.trim()) {
      errors.identifier = "Name or email is required"
    }

    if (!loginData.password) {
      errors.password = "Password is required"
    }

    setLoginErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validateSignupForm = (): boolean => {
    const errors: FormErrors = {}

    if (!signupData.name.trim()) {
      errors.name = "Full name is required"
    }

    if (!signupData.email.trim()) {
      errors.email = "Email is required"
    } else if (!validateEmail(signupData.email)) {
      errors.email = "Please enter a valid email address"
    }

    if (!signupData.contact.trim()) {
      errors.contact = "Contact number is required"
    } else if (!validatePhone(signupData.contact)) {
      errors.contact = "Please enter a valid contact number"
    }

    if (!signupData.password) {
      errors.password = "Password is required"
    } else if (passwordStrength.score < 3) {
      errors.password = "Password is too weak"
    }

    setSignupErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Form submission handlers
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateLoginForm()) return

    setIsLoading(true)
    setMessage(null)

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: loginData.identifier,
          password: loginData.password,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setMessage({ type: "success", text: result.message || "Login successful!" })
        setLoginData({ identifier: "", password: "" })
      } else {
        setMessage({ type: "error", text: result.message || "Login failed. Please try again." })
      }
    } catch (error) {
      setMessage({ type: "error", text: "Network error. Please check your connection." })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateSignupForm()) return

    setIsLoading(true)
    setMessage(null)

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: signupData.name,
          email: signupData.email,
          contact: signupData.contact,
          password: signupData.password,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setMessage({ type: "success", text: result.message || "Account created successfully!" })
        setSignupData({ name: "", email: "", contact: "", password: "" })
      } else {
        setMessage({ type: "error", text: result.message || "Signup failed. Please try again." })
      }
    } catch (error) {
      setMessage({ type: "error", text: "Network error. Please check your connection." })
    } finally {
      setIsLoading(false)
    }
  }

  const getPasswordStrengthColor = (score: number) => {
    if (score < 2) return "bg-destructive"
    if (score < 4) return "bg-accent"
    return "bg-green-500"
  }

  const getPasswordStrengthText = (score: number) => {
    if (score < 2) return "Weak"
    if (score < 4) return "Medium"
    return "Strong"
  }

  return (
    <>
    <header className="w-full flex justify-between items-center  p-4 border-b bg-background">
      <Link href='/'>  {/* Logo to homepage */}
            <div className="flex items-center space-x-2 ml-29">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-poppins font-semibold text-foreground">FinCoach AI</span>
            </div>
        </Link>     
    </header>

    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Column - Description */}
        <div className="hidden lg:block space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">Secure Access</h1>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Join thousands of users who trust our platform for secure, reliable access to their accounts.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Enterprise Security</h3>
                <p className="text-sm text-muted-foreground">Bank-level encryption and security protocols</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">24/7 Support</h3>
                <p className="text-sm text-muted-foreground">Round-the-clock assistance when you need it</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Easy Integration</h3>
                <p className="text-sm text-muted-foreground">Seamless setup and user-friendly interface</p>
              </div>
            </div>
          </div>
        </div>
        {/* Right Column - Auth Forms */}
        <div className="w-full max-w-md mx-auto">
          <Card className="border-border shadow-lg">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">Welcome</CardTitle>
              <CardDescription>Sign in to your account or create a new one</CardDescription>
            </CardHeader>
            <CardContent>
              {message && (
                <Alert className={`mb-4 ${message.type === "error" ? "border-destructive" : "border-green-500"}`}>
                  {message.type === "error" ? (
                    <XCircle className="h-4 w-4 text-destructive" />
                  ) : (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                  <AlertDescription className={message.type === "error" ? "text-destructive" : "text-green-600"}>
                    {message.text}
                  </AlertDescription>
                </Alert>
              )}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                <TabsContent value="login" className="space-y-4 mt-6">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-identifier">Name or Email</Label>
                      <Input
                        id="login-identifier"
                        type="text"
                        placeholder="Enter your name or email"
                        value={loginData.identifier}
                        onChange={(e) => setLoginData({ ...loginData, identifier: e.target.value })}
                        className={loginErrors.identifier ? "border-destructive" : ""}
                        aria-describedby={loginErrors.identifier ? "login-identifier-error" : undefined}
                        aria-invalid={!!loginErrors.identifier}
                        required
                      />
                      {loginErrors.identifier && (
                        <p id="login-identifier-error" className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {loginErrors.identifier}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <div className="relative">
                        <Input
                          id="login-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={loginData.password}
                          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                          className={loginErrors.password ? "border-destructive pr-10" : "pr-10"}
                          aria-describedby={loginErrors.password ? "login-password-error" : undefined}
                          aria-invalid={!!loginErrors.password}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                      {loginErrors.password && (
                        <p id="login-password-error" className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {loginErrors.password}
                        </p>
                      )}
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                </TabsContent>
                <TabsContent value="signup" className="space-y-4 mt-6">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Full Name</Label>
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="Enter your full name"
                        value={signupData.name}
                        onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                        className={signupErrors.name ? "border-destructive" : ""}
                        aria-describedby={signupErrors.name ? "signup-name-error" : undefined}
                        aria-invalid={!!signupErrors.name}
                        required
                      />
                      {signupErrors.name && (
                        <p id="signup-name-error" className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {signupErrors.name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        value={signupData.email}
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                        className={signupErrors.email ? "border-destructive" : ""}
                        aria-describedby={signupErrors.email ? "signup-email-error" : undefined}
                        aria-invalid={!!signupErrors.email}
                        required
                      />
                      {signupErrors.email && (
                        <p id="signup-email-error" className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {signupErrors.email}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-contact">Contact Number</Label>
                      <Input
                        id="signup-contact"
                        type="tel"
                        placeholder="Enter your contact number"
                        value={signupData.contact}
                        onChange={(e) => setSignupData({ ...signupData, contact: e.target.value })}
                        className={signupErrors.contact ? "border-destructive" : ""}
                        aria-describedby={signupErrors.contact ? "signup-contact-error" : undefined}
                        aria-invalid={!!signupErrors.contact}
                        required
                      />
                      {signupErrors.contact && (
                        <p id="signup-contact-error" className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {signupErrors.contact}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <div className="relative">
                        <Input
                          id="signup-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
                          value={signupData.password}
                          onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                          className={signupErrors.password ? "border-destructive pr-10" : "pr-10"}
                          aria-describedby="signup-password-strength signup-password-error"
                          aria-invalid={!!signupErrors.password}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                      {signupData.password && (
                        <div id="signup-password-strength" className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-muted rounded-full h-2">
                              <div
                                className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor(passwordStrength.score)}`}
                                style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                              />
                            </div>
                            <span className="text-xs font-medium text-muted-foreground">
                              {getPasswordStrengthText(passwordStrength.score)}
                            </span>
                          </div>
                          {passwordStrength.feedback.length > 0 && (
                            <div className="text-xs text-muted-foreground">
                              <p>Password should include:</p>
                              <ul className="list-disc list-inside space-y-1 mt-1">
                                {passwordStrength.feedback.map((item, index) => (
                                  <li key={index}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                      {signupErrors.password && (
                        <p id="signup-password-error" className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {signupErrors.password}
                        </p>
                      )}
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </>
  )
}
