import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, X, Clock, Hash, Link, Database, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

interface Block {
  id: number;
  hash: string;
  previousHash: string;
  timestamp: string;
  // Add any other block properties you might have
  data?: string;
  nonce?: number;
  difficulty?: number;
}

interface BlockchainVisualizationProps {
  blocks: Block[];
}

export function BlockchainVisualization({ blocks = [] }: BlockchainVisualizationProps) {
  // Track the start index of the visible window
  const [startIndex, setStartIndex] = useState(0);
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);
  const blocksToShow = 7; // Fixed number of blocks to show at once
  
  const formatDate = (timestamp: string | number) => {
    if (!timestamp) return "Invalid Date";
    const date = new Date(timestamp);
    return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleString();
  };
  
  // Move window forward
  const showNextBlock = () => {
    if (startIndex + blocksToShow < blocks.length) {
      setStartIndex(startIndex + 1);
    }
  };
  
  // Move window backward
  const showPrevBlock = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  // Handle block click
  const handleBlockClick = (block: Block) => {
    setSelectedBlock(block);
  };

  // Get only the blocks in the current window
  const visibleBlocks = blocks.slice(startIndex, startIndex + blocksToShow);
  
  // Calculate the current range being shown
  const endIndex = Math.min(startIndex + blocksToShow, blocks.length);

  return (
    <Card className="bg-[#1a1a1a] hover:bg-[#222] transition-all rounded-xl border-[#333] shadow-lg hover:shadow-xl">
      <CardHeader className="border-b border-[#333]">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold text-white">Blockchain Visualization</CardTitle>
          <div className="text-sm text-gray-400">
            Showing blocks {startIndex + 1} - {endIndex} of {blocks.length}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 relative">
        <div className="flex items-center">
          {/* Left navigation button */}
          <button
            onClick={showPrevBlock}
            disabled={startIndex === 0}
            className={`flex-shrink-0 mr-2 p-2 rounded-full ${
              startIndex === 0 
                ? 'bg-[#222] text-gray-500 cursor-not-allowed' 
                : 'bg-[#2a2a2a] text-[#9fef00] hover:bg-[#333] cursor-pointer'
            } transition-colors`}
            aria-label="Show previous block"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          {/* Blocks container - fixed width to prevent layout shifts */}
          <div className="flex-1 flex space-x-4 py-2 overflow-hidden">
            <AnimatePresence initial={false} mode="popLayout">
              {visibleBlocks.map((block, index) => (
                <motion.div
                  key={block.id || `block-${startIndex + index}`}
                  initial={{ opacity: 0, x: index === blocksToShow - 1 ? 50 : -50, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: index === 0 ? -50 : 50, scale: 0.8 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 20,
                    duration: 0.3
                  }}
                  onClick={() => handleBlockClick(block)}
                  className="flex-shrink-0 w-[calc(20%-16px)] min-w-[200px] p-4 border border-[#333] rounded-lg bg-[#2a2a2a] hover:bg-[#333] transition-all group cursor-pointer hover:shadow-lg"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-[#9fef00]">Block {startIndex + index + 1}</h3>
                    <span className="text-xs text-gray-500">#{block.id}</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-gray-400">
                      <span className="text-[#9fef00]">Hash:</span>{" "}
                      <span className="font-mono">{block.hash.substring(0, 10)}...</span>
                    </p>
                    <p className="text-xs text-gray-400">
                      <span className="text-[#9fef00]">Prev:</span>{" "}
                      <span className="font-mono">{block.previousHash.substring(0, 10)}...</span>
                    </p>
                    <p className="text-xs text-gray-400">
                      <span className="text-[#9fef00]">Time:</span> {formatDate(block.timestamp)}
                    </p>
                  </div>
                  <div className="mt-3 h-1 bg-[#333] rounded-full overflow-hidden">
                    <div className="h-full w-full bg-gradient-to-r from-[#9fef00] to-[#7ab800] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {/* Right navigation button */}
          <button
            onClick={showNextBlock}
            disabled={startIndex + blocksToShow >= blocks.length}
            className={`flex-shrink-0 ml-2 p-2 rounded-full ${
              startIndex + blocksToShow >= blocks.length 
                ? 'bg-[#222] text-gray-500 cursor-not-allowed' 
                : 'bg-[#2a2a2a] text-[#9fef00] hover:bg-[#333] cursor-pointer'
            } transition-colors`}
            aria-label="Show next block"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        
        {/* Block position indicator */}
        <div className="flex justify-center mt-4">
          <div className="flex space-x-1">
            {Array.from({ length: Math.min(blocks.length, 10) }).map((_, index) => {
              // Only show indicators for the first 10 blocks to avoid clutter
              const blockIndex = Math.floor(index * (blocks.length / 10));
              const isActive = blockIndex >= startIndex && blockIndex < startIndex + blocksToShow;
              return (
                <div 
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    isActive ? 'bg-[#9fef00]' : 'bg-[#333]'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </CardContent>
      
      {/* Block Detail Modal */}
      <AnimatePresence>
        {selectedBlock && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="w-full max-w-2xl"
            >
              <div className="bg-[#1a1a1a] rounded-2xl border-2 border-[#9fef00] overflow-hidden shadow-[0_0_30px_rgba(159,239,0,0.2)]">
                {/* Header */}
                <div className="p-6 border-b border-[#333] flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#9fef00]/20 flex items-center justify-center">
                      <Database className="size-5 text-[#9fef00]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Block #{selectedBlock.id}</h3>
                      <p className="text-sm text-gray-400">Created at {formatDate(selectedBlock.timestamp)}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedBlock(null)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="size-6" />
                  </button>
                </div>
                
                {/* Block details */}
                <div className="p-6 space-y-6">
                  {/* Hash */}
                  <div className="bg-[#2a2a2a] p-4 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <Hash className="size-5 text-[#9fef00]" />
                      <h4 className="text-white font-medium">Block Hash</h4>
                    </div>
                    <p className="font-mono text-sm text-gray-300 break-all pl-8">{selectedBlock.hash}</p>
                  </div>
                  
                  {/* Previous Hash with arrow animation */}
                  <div className="bg-[#2a2a2a] p-4 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <Link className="size-5 text-[#9fef00]" />
                      <h4 className="text-white font-medium">Previous Block Hash</h4>
                    </div>
                    <div className="relative">
                      <p className="font-mono text-sm text-gray-300 break-all pl-8">{selectedBlock.previousHash}</p>
                      {selectedBlock.id > 1 && (
                        <motion.div 
                          initial={{ x: 0, opacity: 0.5 }}
                          animate={{ x: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
                          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                          className="absolute left-2 top-1/2 -translate-y-1/2"
                        >
                          <ArrowRight className="size-4 text-[#9fef00]" />
                        </motion.div>
                      )}
                    </div>
                  </div>
                  
                  {/* Timestamp */}
                  <div className="bg-[#2a2a2a] p-4 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="size-5 text-[#9fef00]" />
                      <h4 className="text-white font-medium">Timestamp</h4>
                    </div>
                    <div className="pl-8">
                      <p className="text-sm text-gray-300">{formatDate(selectedBlock.timestamp)}</p>
                      <p className="text-xs text-gray-500 mt-1">Unix Timestamp: {new Date(selectedBlock.timestamp).getTime()}</p>
                    </div>
                  </div>
                  
                  {/* Additional block data if available */}
                  {selectedBlock.data && (
                    <div className="bg-[#2a2a2a] p-4 rounded-xl">
                      <div className="flex items-center gap-3 mb-2">
                        <Database className="size-5 text-[#9fef00]" />
                        <h4 className="text-white font-medium">Block Data</h4>
                      </div>
                      <pre className="font-mono text-sm text-gray-300 bg-[#1a1a1a] p-3 rounded-lg mt-2 overflow-x-auto">
                        {typeof selectedBlock.data === 'object' 
                          ? JSON.stringify(selectedBlock.data, null, 2) 
                          : selectedBlock.data}
                      </pre>
                    </div>
                  )}
                  
                  {/* Additional properties */}
                  <div className="grid grid-cols-2 gap-4">
                    {selectedBlock.nonce !== undefined && (
                      <div className="bg-[#2a2a2a] p-4 rounded-xl">
                        <h4 className="text-white font-medium mb-1">Nonce</h4>
                        <p className="text-sm text-gray-300">{selectedBlock.nonce}</p>
                      </div>
                    )}
                    
                    {selectedBlock.difficulty !== undefined && (
                      <div className="bg-[#2a2a2a] p-4 rounded-xl">
                        <h4 className="text-white font-medium mb-1">Difficulty</h4>
                        <p className="text-sm text-gray-300">{selectedBlock.difficulty}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Footer */}
                <div className="p-4 bg-[#2a2a2a] border-t border-[#333] text-center">
                  <p className="text-sm text-gray-400">
                    Block {selectedBlock.id} of {blocks.length} in the blockchain
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Card>
  );
}