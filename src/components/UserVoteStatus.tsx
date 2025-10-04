"use client"

import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, XCircle } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

export function UserVoteStatus() {
  const [userData, setUserData] = useState<{ username: string; hasVoted: boolean; userImage: string | null } | null>(
    null,
  )
  const [userId, setUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Extract user ID from localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId")
    if (storedUserId) {
      setUserId(storedUserId)
    } else {
      setError("User ID not found. Please log in again.")
      setLoading(false)
    }
  }, [])

  // Fetch user data from API
  useEffect(() => {
    if (!userId) return

    const fetchUserData = async () => {
      setLoading(true)
      try {
        const token = localStorage.getItem("token")

        if (!token) {
          setError("No token found in localStorage.")
          setLoading(false)
          return
        }

        const response = await fetch(`http://localhost:8080/api/voters/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json()

        // Convert hasVoted to boolean
        const hasVoted = data.hasVoted === true || data.hasVoted === "true" || data.hasVoted === 1

        // Handle user image
        let userImage = data.userImage || "/default-profile.png"
        if (userImage.startsWith("/uploads")) {
          userImage = `http://localhost:8080${userImage}`
        }

        setUserData({
          username: data.username,
          hasVoted: hasVoted,
          userImage: userImage,
        })
      } catch (error) {
        setError("Failed to fetch user data.")
        console.error("Error fetching user data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [userId])

  if (loading) {
    return <p className="text-white">Loading user data...</p>
  }

  if (error) {
    return <p className="text-red-500">{error}</p>
  }

  // Profile image handling
  const profileImage = userData?.userImage || "/default-profile.png"

  return (
    <Card className="bg-black/80 p-6 rounded-xl border border-[#333]">
      <CardContent className="p-0">
        {/* User image */}
        <div className="flex flex-col items-center mb-4">
          <div className="relative w-24 h-24 mb-3">
            <div className="absolute inset-0 rounded-full overflow-hidden border border-[#333]">
              <Image
                src={profileImage || "/placeholder.svg"}
                alt={`Profile picture of ${userData?.username}`}
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>
          </div>

          {/* User info */}
          <h2 className="text-xl font-bold text-white">{userData?.username}</h2>
          <p className="text-sm text-gray-400 mt-1">Voter ID: #{userId}</p>
        </div>

        {/* Vote status */}
        <div className="mt-4 p-3 bg-[#1a1a1a] rounded-lg">
          {userData?.hasVoted ? (
            <div className="flex items-center gap-2 text-green-500">
              <CheckCircle2 className="size-5" />
              <p>Vote Cast</p>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-red-500">
              <XCircle className="size-5" />
              <p>Not Voted</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
