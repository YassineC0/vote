'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { motion, AnimatePresence } from 'framer-motion'

const candidates = [
  {
    id: 1,
    name: "Alice Johnson",
    party: "Progressive Party",
    description: "Alice Johnson is a seasoned politician with over 20 years of experience in public service. She has been a strong advocate for environmental policies, pushing for renewable energy initiatives and stricter regulations on industrial pollution. Johnson also champions social justice reform, focusing on equality in education and healthcare. Her track record includes successful bills on affordable housing and workers' rights.",
    image: "/placeholder.svg?height=400&width=400"
  },
  {
    id: 2,
    name: "Bob Smith",
    party: "Conservative Alliance",
    description: "Bob Smith brings a wealth of experience from the private sector to his political career. With a background in finance, he advocates for fiscal responsibility and reducing government spending. Smith is a proponent of traditional values, supporting policies that strengthen family structures and local communities. He has proposed several tax reform bills aimed at stimulating small business growth and job creation.",
    image: "/placeholder.svg?height=400&width=400"
  },
  {
    id: 3,
    name: "Carol Williams",
    party: "Centrist Union",
    description: "Carol Williams is known for her balanced approach to both economic and social issues. With a background in economics and social work, she seeks to bridge the gap between different political ideologies. Williams has been instrumental in negotiating bipartisan legislation on healthcare reform and infrastructure development. She is a strong believer in evidence-based policymaking and often calls for increased investment in scientific research and education.",
    image: "/placeholder.svg?height=400&width=400"
  },
  {
    id: 4,
    name: "David Brown",
    party: "Liberty League",
    description: "David Brown is a passionate advocate for individual freedoms and limited government intervention. With a background in constitutional law, he has been at the forefront of protecting civil liberties. Brown has proposed legislation to reduce regulations on businesses and to protect privacy rights in the digital age. He is also a strong supporter of decentralization, advocating for more power to be given to local governments.",
    image: "/placeholder.svg?height=400&width=400"
  }
]

export default function VotePage({ handleVote }: { handleVote: (candidateId: number) => Promise<void> }) {
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);
  const [voteSubmitted, setVoteSubmitted] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const handleVoteClick = async () => {
    if (selectedCandidate !== null) {
      await handleVote(selectedCandidate); // Call the function from dashboard/page.tsx
      setVoteSubmitted(true);
      setIsDialogOpen(false);
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-black p-8 text-white">
      {/* Voting UI */}
      <AnimatePresence>
        {selectedCandidate !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedCandidate(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-black border border-white/10 rounded-lg max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const candidate = candidates.find(c => c.id === selectedCandidate);
                if (!candidate) return null;
                return (
                  <Card className="bg-black border-none">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={candidate.image} alt={candidate.name} />
                          <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-3xl">{candidate.name}</CardTitle>
                          <CardDescription className="text-gray-400 text-xl">{candidate.party}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-white text-lg">{candidate.description}</p>
                      <Button 
                        className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-6"
                        onClick={() => setIsDialogOpen(true)}
                      >
                        Vote for {candidate.name}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-black border border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Confirm Your Vote</DialogTitle>
            <DialogDescription>
              Are you sure you want to vote for {candidates.find(c => c.id === selectedCandidate)?.name}?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-4 mt-4">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button className="bg-red-600 hover:bg-red-700" onClick={handleVoteClick}>Confirm Vote</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
