'use client'

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [password, setPassword] = useState("")
  const [passwordStrength, setPasswordStrength] = useState(0)

  const checkPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (password.match(/[A-Z]/)) strength++
    if (password.match(/[0-9]/)) strength++
    if (password.match(/[^A-Za-z0-9]/)) strength++
    setPasswordStrength(strength)
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    // Add your signup logic here
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = "/auth/setup"
    }, 1000)
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-black text-white overflow-hidden">
      {/* Video background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
        autoPlay
        muted
        loop
      >
        {/* TODO: Replace with your video path */}
        <source src="/vote.mp4" type="video/mp4" />
      </video>

      <div className="z-10 w-full max-w-md space-y-8 px-8 backdrop-blur-sm bg-black/30 p-8 rounded-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Create an account</h1>
          <p className="text-gray-400">Enter your information to get started</p>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Choose a username"
              required
              className="border-gray-800 bg-black/50 text-white placeholder:text-gray-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              className="border-gray-800 bg-black/50 text-white placeholder:text-gray-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              required
              className="border-gray-800 bg-black/50 text-white placeholder:text-gray-400"
              onChange={(e) => {
                setPassword(e.target.value)
                checkPasswordStrength(e.target.value)
              }}
            />
            <div className="flex gap-1">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full ${
                    i < passwordStrength ? "bg-white" : "bg-gray-800"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-gray-400">
              Password must be at least 8 characters long and include uppercase, numbers, and special characters
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              required
              className="border-gray-800 bg-black/50 text-white placeholder:text-gray-400"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-white text-black hover:bg-gray-100 transition-colors"
            disabled={isLoading || passwordStrength < 4}
          >
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
        </form>
        <div className="text-center">
          <Link 
            href="/auth/login" 
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}

