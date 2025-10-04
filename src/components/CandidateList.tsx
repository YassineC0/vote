import type React from "react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, X, AlertCircle, Award, Users, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

interface Candidate {
  id: number;
  name: string;
  party: string;
  imageUrl: string;
  voteCount: number;
}

interface CandidateListProps {
  candidates: Candidate[];
  hasVoted: boolean;
  onVote: (candidateId: number) => void;
}

export const CandidateList: React.FC<CandidateListProps> = ({ candidates, hasVoted, onVote }) => {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [note, setNote] = useState("");
  const [showAlreadyVotedError, setShowAlreadyVotedError] = useState(false);

  const handleVoteClick = (candidate: Candidate) => {
    if (hasVoted) {
      // Show error message if user has already voted
      setShowAlreadyVotedError(true);
      setTimeout(() => setShowAlreadyVotedError(false), 3000); // Hide after 3 seconds
      return;
    }
    setSelectedCandidate(candidate);
  };

  const handleConfirmVote = () => {
    if (selectedCandidate) {
      onVote(selectedCandidate.id);
      setSelectedCandidate(null);
      setNote("");
    }
  };

  const handleCancelVote = () => {
    setSelectedCandidate(null);
    setNote("");
  };

  // Find the candidate with the most votes
  const maxVotes = Math.max(...candidates.map(c => c.voteCount));
  const totalVotes = candidates.reduce((sum, c) => sum + c.voteCount, 0);

  return (
    <Card className="bg-black/80 hover:bg-black/90 transition-all p-6 rounded-xl border border-[#333] shadow-[0_8px_30px_rgba(0,0,0,0.7)] backdrop-blur-sm">
      <CardContent className="p-0">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white mb-0">Candidates</h2>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Users className="size-4 text-[#9fef00]" />
            <span>Total Votes: <span className="text-white font-medium">{totalVotes}</span></span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {candidates.map((candidate) => (
            <div
              key={candidate.id}
              onClick={() => handleVoteClick(candidate)}
              className="bg-[#1a1a1a] rounded-xl p-5 border border-[#333] hover:border-[#9fef00] transition-all group cursor-pointer hover:shadow-[0_0_20px_rgba(159,239,0,0.15)] transform hover:-translate-y-1 duration-300"
            >
              {/* Circular image with improved quality */}
              <div className="flex flex-col items-center mb-4">
                <div className="relative mb-4">
                  <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#333] group-hover:border-[#9fef00] transition-all">
                    <div className="w-full h-full relative">
                      <img
                        src={candidate.imageUrl ? `/images/${candidate.imageUrl}` : "/default.jpg"}
                        alt={candidate.name}
                        className="w-full h-full object-cover"
                        style={{ 
                          objectFit: 'cover'
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Vote badge */}
                  {hasVoted && (
                    <div className="absolute -top-2 -right-2 bg-[#9fef00] text-black p-1.5 rounded-full shadow-lg">
                      <CheckCircle className="size-5" />
                    </div>
                  )}
                  
                  {/* Leading candidate badge */}
                  {candidate.voteCount === maxVotes && maxVotes > 0 && (
                    <div className="absolute -bottom-2 -right-2 bg-[#ff6b00] text-white p-1.5 rounded-full shadow-lg">
                      <Award className="size-5" />
                    </div>
                  )}
                </div>
                
                <h3 className="text-lg font-bold text-white text-center">{candidate.name}</h3>
                <p className="text-sm text-[#9fef00] mb-3 text-center">{candidate.party}</p>
              </div>
              
              {/* Vote count with improved aesthetics */}
              <div className="bg-black/60 rounded-lg p-3 mb-3 shadow-inner">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="size-4 text-[#9fef00]" />
                    <span className="text-gray-400 text-sm">Votes</span>
                  </div>
                  <span className="text-white font-bold text-lg">{candidate.voteCount}</span>
                </div>
                
                {/* Progress bar */}
                <div className="h-2 bg-[#333] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${totalVotes ? (candidate.voteCount / totalVotes) * 100 : 0}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-[#9fef00] to-[#7ab800]"
                  />
                </div>
                
                {/* Percentage */}
                <div className="text-right mt-1 text-xs text-gray-400">
                  {totalVotes ? ((candidate.voteCount / totalVotes) * 100).toFixed(1) : 0}%
                </div>
              </div>
              
              {/* Vote button */}
              {!hasVoted && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVoteClick(candidate);
                  }}
                  className="w-full py-2.5 bg-[#9fef00] text-black rounded-lg font-medium hover:bg-[#7ab800] transition-colors flex items-center justify-center gap-2 shadow-[0_4px_10px_rgba(159,239,0,0.3)]"
                >
                  <CheckCircle className="size-4" />
                  Vote Now
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Already Voted Error Message */}
        <AnimatePresence>
          {showAlreadyVotedError && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50"
            >
              <AlertCircle className="size-5" />
              <div>
                <p className="font-medium">You have already voted</p>
                <p className="text-sm opacity-90">Each voter can only vote once in this election</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Confirmation Dialog */}
        <AnimatePresence>
          {selectedCandidate && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ 
                  type: "spring", 
                  damping: 15, 
                  stiffness: 300 
                }}
                className="relative max-w-md w-full mx-4"
              >
                <div className="relative bg-black rounded-2xl border-2 border-[#9fef00] overflow-hidden shadow-[0_0_30px_rgba(159,239,0,0.3)]">
                  {/* Decorative elements */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#9fef00] to-[#7ab800]"></div>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-[#9fef00]/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-[#9fef00]/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
                  
                  {/* Close button */}
                  <button 
                    onClick={handleCancelVote}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white z-10"
                  >
                    <X className="size-5" />
                  </button>
                  
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-[#9fef00]/20 flex items-center justify-center mr-4">
                        <CheckCircle className="size-6 text-[#9fef00]" />
                      </div>
                      <h3 className="text-xl font-bold text-white">Confirm Your Vote</h3>
                    </div>
                    
                    <p className="text-gray-300 mb-6">
                      Are you sure you would like to vote for <span className="text-[#9fef00] font-bold">{selectedCandidate.name}</span>?
                    </p>
                    
                    <div className="mb-6">
                      <label className="block text-sm text-gray-400 mb-2">Add a note (optional)</label>
                      <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Why are you voting for this candidate?"
                        className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg p-3 text-white placeholder:text-gray-500 focus:border-[#9fef00] focus:outline-none focus:ring-1 focus:ring-[#9fef00]"
                        rows={3}
                      />
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleCancelVote}
                        className="flex-1 py-3 px-4 bg-[#333] text-white rounded-lg font-medium hover:bg-[#444] transition-colors"
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleConfirmVote}
                        className="flex-1 py-3 px-4 bg-[#9fef00] text-black rounded-lg font-bold hover:bg-[#7ab800] transition-colors shadow-[0_4px_10px_rgba(159,239,0,0.2)]"
                      >
                        Confirm Vote
                      </motion.button>
                    </div>
                  </div>
                  
                  {/* Candidate image preview */}
                  <div className="px-6 pb-6">
                    <div className="flex items-center p-3 bg-[#1a1a1a] rounded-lg">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                        <img
                          src={selectedCandidate.imageUrl 
                            ? `/images/${selectedCandidate.imageUrl}` 
                            : "/default.jpg"}
                          alt={selectedCandidate.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-white font-medium">{selectedCandidate.name}</p>
                        <p className="text-sm text-[#9fef00]">{selectedCandidate.party}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};