"use client";


import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight, TrendingUp } from 'lucide-react';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { VotingStatistics } from "@/src/components/VotingStatistics";
import { UserVoteStatus } from "@/src/components/UserVoteStatus";
import { CandidateVotesChart } from "@/src/components/CandidateVotesChart";
import { BlockchainVisualization } from "@/src/components/BlockchainVisualization";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { VoteDistributionChart } from "@/src/components/VoteDistributionChart";
import { getCandidates, getStatisticsData, getBlockchainData, castVote } from "../services/api";
import { HeroLayout } from "@/src/components/hero-layout";
import { HeroSection } from "@/src/components/hero-section";

interface Candidate {
  id: number;
  name: string;
  party: string;
  imageUrl: string;
  voteCount: number;
}

interface DashboardData {
  votedVoters: number;
  totalVoters: number;
  hasVoted: boolean;
  username: string;
  userImage: string;
  candidates: Candidate[];
}

interface BlockchainData {
  blocks: Array<{ id: number; hash: string; previousHash: string; timestamp: number }>;
}

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [blockchainData, setBlockchainData] = useState<BlockchainData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);
  
  const router = useRouter();

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (typeof window === "undefined") return;

        const userId = localStorage.getItem("userId");
        if (!userId) {
          console.error("No userId found in localStorage");
          router.push("/");
          return;
        }

        const [statistics, blockchain, candidates] = await Promise.all([
          getStatisticsData(Number(userId)),
          getBlockchainData(),
          getCandidates(),
        ]);

        setDashboardData({ ...statistics, candidates });
        setBlockchainData({ blocks: blockchain });
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load dashboard data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Real-time clock component
const RealTimeClock = () => {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="text-white text-xl font-mono text-center">
      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
    </div>
  );
};

  // Handle Vote
  const handleVote = async (candidateId: number) => {
    if (typeof window === "undefined") return;
  
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User ID not found. Please log in again.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8080/api/voters/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          voterId: userId,
          candidateId: candidateId,
        }),
      });
  
      const contentType = response.headers.get("Content-Type");
  
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        data = { message: text };
      }
  
      if (!response.ok) {
        console.error("Backend returned error response:", data);
        throw new Error(data.error || "Failed to cast vote");
      }
  
      alert("✅ Vote successfully cast! 🎉");
  
      setDashboardData((prevData) => {
        if (!prevData) return null;
        return {
          ...prevData,
          hasVoted: true,
          candidates: prevData.candidates.map((c) =>
            c.id === candidateId ? { ...c, voteCount: c.voteCount + 1 } : c
          ),
        };
      });
  
      setTimeout(async () => {
        try {
          const updatedBlockchain = await getBlockchainData();
          setBlockchainData({ blocks: updatedBlockchain });
        } catch (err) {
          console.error("Error fetching blockchain data:", err);
        }
      }, 2000);
    } catch (error: any) {
      console.error("Vote error:", error);
      alert(error?.message || "Failed to cast vote. Please try again.");
    }
  };
  
  
  
  
  

  if (isLoading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  const percentageVoted = dashboardData?.totalVoters
    ? ((dashboardData.votedVoters / dashboardData.totalVoters) * 100).toFixed(2)
    : "0.00";

  // Prepare Data for Charts
  const candidateVoteData =
    dashboardData?.candidates.map((c) => ({
      name: c.name,
      current: c.voteCount,
      previous: c.voteCount, // Adjusted to use actual previous data
    })) ?? [];

  const voteDistributionData =
    dashboardData?.candidates.map((c, i) => ({
      name: c.name,
      value: c.voteCount,
      color: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"][i % 5],
    })) ?? [];

    return (
      <div className="min-h-screen bg-black text-white"> {/* Changed from bg-[#1a1a1a] to bg-black */}
        {/* Hero Section - Sophisticated Layout */}
        <div className="relative w-screen h-screen bg-black p-4 overflow-hidden">
          {/* Scroll Down Button */}
          <button
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#9fef00] text-black px-6 py-3 rounded-full text-lg font-medium hover:bg-[#8bdf00] transition-colors"
          >
            View Dashboard
          </button>
    
          {/* Left tall card - Obama */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute left-4 top-4 w-[28%] h-[90%]"
          >
            <div className="bg-[#1a1a1a] overflow-hidden rounded-[32px] w-full h-full transition-transform duration-300 hover:scale-105">
              <div className="relative h-full">
                <Image src="/obama.jpg" alt="Barack Obama" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90" />
                <div className="absolute bottom-0 w-full p-8">
                  <div className="space-y-4">
                    <div className="text-white">
                      <div className="text-8xl font-bold leading-none">22</div>
                      <div className="text-8xl font-bold leading-none">08</div>
                      <div className="text-3xl mt-2">18:00</div>
                    </div>
                    <p className="text-sm text-gray-400">
                      A book presentation about the 44th president of the United States
                    </p>
                    <div className="pt-4">
                      <Image src="/barcode.png" alt="Barcode" width={200} height={60} className="opacity-60" />
                      <div className="text-xs text-gray-500 mt-2">SE123S 1AR23S6AS 77</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
    
          {/* Center logo and text */}
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  className="absolute left-1/2 top-4 -translate-x-1/2 space-y-4"
>
  <div className="w-20 h-20 mx-auto bg-[#1a2236] rounded-3xl p-5 relative">
    <div className="w-full h-full rounded-full bg-white/10">
      <div className="absolute inset-0 grid place-items-center">
        <div className="w-8 h-8 rounded-full bg-[#ff6b00]" />
      </div>
    </div>
    <div className="absolute inset-0 opacity-20">
      <div className="w-full h-full grid grid-cols-4 gap-px">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="border-t border-l border-white/20" />
        ))}
      </div>
    </div>
  </div>
  <h1 className="text-white text-6xl font-bold tracking-wider text-center">
    ACTI
    <br />
    VOTE
  </h1>
  
  {/* Real-time Clock */}
  <RealTimeClock />
</motion.div>
    
          {/* Center bottom card - Trump */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute left-[30%] bottom-4 w-[42%] h-[60%]"
          >
            <div className="bg-[#1a1a1a] overflow-hidden rounded-[32px] w-full h-full transition-transform duration-300 hover:scale-105">
              <div className="relative h-full">
                <Image src="/trump.jpg" alt="Donald Trump" fill className="object-cover" />
                <div className="absolute top-4 right-4">
                  <div className="bg-white rounded-xl px-3 py-1">
                    <div className="text-black font-medium">12</div>
                    <div className="text-black text-sm">OCT</div>
                  </div>
                </div>
                <div className="absolute bottom-0 w-full p-8 bg-gradient-to-t from-black/90 to-transparent">
                  <h2 className="text-white text-4xl font-bold mb-1">
                    DONALD
                    <br />
                    JOHN TRUMP
                  </h2>
                  <p className="text-gray-400">45th president of the United States</p>
                  <div className="text-xs text-gray-500 mt-2">www.activote.com</div>
                </div>
              </div>
            </div>
          </motion.div>
    
          {/* Right stacked cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute right-4 top-4 w-[26%] h-[90%] space-y-4"
          >
            {/* Benjamin Franklin card */}
            <div className="bg-[#1a1a1a] overflow-hidden rounded-[32px] w-full h-[48%] transition-transform duration-300 hover:scale-105">
              <div className="relative h-full">
                <div className="absolute top-0 w-full h-7 bg-black/90 flex items-center justify-between px-4 text-xs text-white">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff6b00]" />
                    ACTIVOTE
                  </div>
                  <span>1h</span>
                </div>
                <Image src="/franklin.jpg" alt="Benjamin Franklin" fill className="object-cover" />
                <div className="absolute bottom-0 w-full p-8 bg-gradient-to-t from-black/90 to-transparent">
                  <h2 className="text-white text-3xl font-bold mb-2">
                    THE BENJAMIN
                    <br />
                    FRANKLIN
                    <br />
                    STORY
                  </h2>
                  <p className="text-sm text-gray-300">
                    was an American polymath
                    <br />
                    who was active as a write
                  </p>
                </div>
              </div>
            </div>
    
            {/* Trust Act card */}
<div className="bg-[#1a1a1a] overflow-hidden rounded-[32px] w-full h-[48%] transition-transform duration-300 hover:scale-105">
  <div className="relative h-full">
    {/* Video Background */}
    <video 
      className="absolute inset-0 w-full h-full object-cover"
      autoPlay 
      loop 
      muted 
      playsInline
    >
      <source src="/vote.mp4" type="video/mp4" />
      {/* Fallback if video doesn't load */}
      Your browser does not support the video tag.
    </video>
    
    {/* Overlay to make text readable */}
    <div className="absolute inset-0 bg-black/60"></div>
    
    <div className="absolute top-0 w-full h-7 bg-black/90 flex items-center justify-between px-4 text-xs text-white z-10">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-[#ff6b00]" />
        ACTIVOTE
      </div>
      <span>9:14</span>
    </div>
    <div className="p-8 pt-16 relative z-10">
      <h3 className="text-white text-2xl font-bold mb-4">
        SB1295: TRUST
        <br />
        ACT OF 2021.
        <br />
        TIME TO RESCUE
        <br />
        UNITED STATES
        <br />
        TRUSTS ACT 2021
      </h3>
      <p className="text-gray-400 mt-8">How would you vote?</p>
    </div>
  </div>
</div>
          </motion.div>
        </div>
        
        {/* Main Content - Ensure it starts AFTER Hero */}
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8">Election Dashboard</h1>
    
          <div className="grid gap-8">
            {/* Voting Statistics & User Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <VotingStatistics
                  votedVoters={dashboardData?.votedVoters ?? 0}
                  totalVoters={dashboardData?.totalVoters ?? 0}
                  percentageVoted={percentageVoted}
                />
              </div>
              <UserVoteStatus
                hasVoted={dashboardData?.hasVoted ?? false}
                username={dashboardData?.username ?? "Guest"}
                userImage={dashboardData?.userImage ?? "/nigga.jpg"}
              />
            </div>
    
            {/* Candidate List */}
<div className="grid gap-6 md:grid-cols-3 mt-6">
  {dashboardData?.candidates.map((candidate) => (
    <motion.div
      key={candidate.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: candidate.id * 0.1 }}
      whileHover={{ translateY: -8 }}
    >
      <Card
        className={`bg-black/80 border hover:shadow-[0_8px_30px_rgba(0,0,0,0.7)] backdrop-blur-sm overflow-hidden rounded-xl cursor-pointer ${
          selectedCandidate === candidate.id ? "border-[#9fef00]" : "border-[#333]"
        } hover:border-[#9fef00] transition-all duration-300`}
        onClick={() => {
          setSelectedCandidate(candidate.id);
          handleVote(candidate.id); // 🟢 Call the vote handler
        }}
      >
        {/* Large Image at Top */}
        <div className="relative w-full h-48 group">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={candidate.imageUrl ? `http://localhost:8080/images/${candidate.imageUrl}` : "/placeholder.svg"}
              alt={candidate.name || "Candidate"}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-40 group-hover:opacity-70 transition-opacity duration-300" />

          {/* Party Badge */}
          <div className="absolute top-3 right-3 bg-black/70 px-3 py-1 rounded-full border border-[#333] group-hover:border-[#9fef00] transition-colors duration-300">
            <p className="text-[#9fef00] text-sm">{candidate.party}</p>
          </div>

          {/* Vote button overlay on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.button
              className="bg-[#9fef00] text-black px-4 py-2 rounded-full font-medium flex items-center gap-2 shadow-[0_0_20px_rgba(159,239,0,0.3)]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedCandidate(candidate.id);
                handleVote(candidate.id);
              }}
            >
              Vote Now
              <ChevronRight className="size-4" />
            </motion.button>
          </div>
        </div>
        
        {/* Content Below Image */}
        <CardContent className="p-4 bg-gradient-to-t from-black/70 to-black/30">
          <CardTitle className="text-xl text-white mb-2 text-center">{candidate.name}</CardTitle>
          
          {/* Vote count with progress bar */}
          <div className="mt-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <TrendingUp className="size-4 text-[#9fef00]" />
                <span className="text-gray-400 text-sm">Votes</span>
              </div>
              <span className="text-white font-bold">{candidate.voteCount}</span>
            </div>
            
            {/* Progress bar */}
            <div className="h-1.5 bg-[#333] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((candidate.voteCount / Math.max(...dashboardData?.candidates.map(c => c.voteCount) || [1])) * 100, 100)}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-[#9fef00] to-[#7ab800]"
              />
            </div>
            
            {/* Selection indicator */}
            {selectedCandidate === candidate.id && (
              <div className="mt-2 flex justify-center">
                <div className="size-3 rounded-full bg-[#9fef00] animate-pulse" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  ))}
</div>
    
            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <CandidateVotesChart data={candidateVoteData} />
              <VoteDistributionChart data={voteDistributionData} />
            </div>
    
            {/* Blockchain Visualization */}
            {blockchainData && <BlockchainVisualization blocks={blockchainData.blocks} />}
          </div>
        </div>
      </div>
    );}