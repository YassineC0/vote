"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { login } from "@/app/services/api"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      console.log("Attempting login...")
      const data = await login(username, password)
      console.log("Login response:", data)

      if (data?.token) {
        console.log("Token received, storing in localStorage")
        localStorage.setItem("token", data.token)
        console.log("Token stored, redirecting to dashboard")
        router.push("/dashboard")
      } else {
        console.error("No token received from server")
        setError("Login failed. Please try again.")
      }
    } catch (error: any) {
      console.error("Login error:", error)
      setError(error?.response?.data?.message || "Invalid username or password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground">Enter your credentials to access your account</p>
        </div>
        <form onSubmit={onSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="username" className="block text-sm font-medium text-foreground">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                required
                className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-foreground">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button
            type="submit"
            className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
        <div className="text-center text-sm">
          <Link href="/auth/signup" className="font-medium text-primary hover:text-primary/80">
            Don&apos;t have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}

