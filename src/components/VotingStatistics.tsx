import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { MoreVertical } from 'lucide-react'

interface VotingStatisticsProps {
  votedVoters: number
  totalVoters: number
  percentageVoted: string
}

export function VotingStatistics({ votedVoters, totalVoters, percentageVoted }: VotingStatisticsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card className="bg-black/80 hover:bg-black/90 transition-all p-6 rounded-xl border border-[#333] shadow-[0_8px_30px_rgba(0,0,0,0.7)] backdrop-blur-sm">
        <CardContent className="p-0 space-y-3">
          <div className="flex justify-between items-start">
            <div className="size-10 bg-[#1a1a1a] rounded-full flex items-center justify-center">
              <svg className="size-5 text-[#9fef00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <button className="text-[#9fef00] hover:opacity-75 transition-opacity">
              <MoreVertical className="size-5" />
            </button>
          </div>
          <div>
            <p className="text-4xl font-bold text-white mb-1">{totalVoters}</p>
            <p className="text-sm text-[#9fef00]">Total Registered Voters</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-black/80 hover:bg-black/90 transition-all p-6 rounded-xl border border-[#333] shadow-[0_8px_30px_rgba(0,0,0,0.7)] backdrop-blur-sm">
        <CardContent className="p-0 space-y-3">
          <div className="flex justify-between items-start">
            <div className="size-10 bg-[#1a1a1a] rounded-full flex items-center justify-center">
              <svg className="size-5 text-[#9fef00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
            </div>
            <button className="text-[#9fef00] hover:opacity-75 transition-opacity">
              <MoreVertical className="size-5" />
            </button>
          </div>
          <div>
            <p className="text-4xl font-bold text-white mb-1">{votedVoters}</p>
            <p className="text-sm text-[#9fef00]">Active Voters</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-black/80 hover:bg-black/90 transition-all p-6 rounded-xl border border-[#333] shadow-[0_8px_30px_rgba(0,0,0,0.7)] backdrop-blur-sm md:col-span-2">
        <CardContent className="p-0 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Voting Progress</h3>
              <p className="text-sm text-[#9fef00]">Last updated 2 minutes ago</p>
            </div>
            <button className="text-[#9fef00] hover:opacity-75 transition-opacity">
              <MoreVertical className="size-5" />
            </button>
          </div>
          <div className="space-y-4">
            <Progress
              value={Number.parseFloat(percentageVoted)}
              className="h-3 bg-[#b31f1f]"
              style={{
                backgroundImage: "linear-gradient(90deg, #9fef00 0%, #7ab800 100%)",
              }}
            />
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#9fef00] font-medium">{percentageVoted}% Complete</span>
              <span className="text-white font-medium">
                {votedVoters} / {totalVoters} Voters
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}