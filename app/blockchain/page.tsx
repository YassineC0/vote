import { useEffect, useState } from "react";
import { getBlockchainData } from "../services/api";
import { BlockchainVisualization } from "@/src/components/BlockchainVisualization";

interface Block {
  id: number;
  index: number;
  previousHash: string;
  data: string;
  hash: string;
  timestamp: string; // Ensure it's a string
}

const Blockchain = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);

  useEffect(() => {
    async function fetchBlockchain() {
      try {
        const data = await getBlockchainData();
        console.log("Fetched Blockchain Data:", data);
    
        data.forEach((block: any) => {
          console.log(`Block ID: ${block.id}, Timestamp: ${block.timestamp}`);
        });
    
        setBlocks(data);
      } catch (error) {
        console.error("Failed to load blockchain data", error);
      }
    }
    

    fetchBlockchain();
  }, []);

  return (
    <div className="p-4 bg-[#121212] min-h-screen text-white">
      <h2 className="text-2xl font-bold mb-4">Blockchain Data</h2>
      <BlockchainVisualization blocks={blocks} /> {/* ✅ Pass blocks to visualization */}
    </div>
  );
};

export default Blockchain;
