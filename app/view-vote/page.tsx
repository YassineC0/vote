'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link'
import { Button } from '@/components/ui/button'

// This would typically come from your backend
const votedCandidate = {
  id: 2,
  name: "Bob Smith",
  party: "Conservative Alliance",
  description: "Advocates for fiscal responsibility and traditional values.",
  image: "/placeholder.svg?height=100&width=100",
  votes: 3827
}

export default function ViewVotePage() {
  const [totalVotes, setTotalVotes] = useState(0)

  useEffect(() => {
    // Simulate fetching total votes from an API
    setTotalVotes(10000)
  }, [])

  return (
    <div className="min-h-screen bg-black p-8 text-white">
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Your Vote</h1>
          <Link href="/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
        <Card className="bg-black border border-white/10">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={votedCandidate.image} alt={votedCandidate.name} />
                <AvatarFallback>{votedCandidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{votedCandidate.name}</CardTitle>
                <CardDescription className="text-gray-400">{votedCandidate.party}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-white">{votedCandidate.description}</p>
            <div className="border-t border-white/10 pt-4">
              <p className="font-semibold">Current Votes: {votedCandidate.votes}</p>
              <p className="text-sm text-gray-400">
                {((votedCandidate.votes / totalVotes) * 100).toFixed(2)}% of total votes
              </p>
            </div>
          </CardContent>
        </Card>
        <p className="text-center text-sm text-gray-400">
          Total votes cast: {totalVotes}
        </p>
      </div>
    </div>
  )
}

