"use client"

import { useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"

export function HeroLayout() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <div className="relative w-screen h-screen bg-black p-4 overflow-hidden">
      {/* Left tall card - Obama */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute left-4 top-4 w-[28%] h-[90%]"
      >
        <Card className="bg-[#1a1a1a] overflow-hidden rounded-[32px] w-full h-full">
          <div className="relative h-full">
            <Image src="/presidents/obama.jpg" alt="Barack Obama" fill className="object-cover" />
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
        </Card>
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
      </motion.div>

      {/* Center bottom card - Trump */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute left-[30%] bottom-4 w-[42%] h-[60%]"
      >
        <Card className="bg-[#1a1a1a] overflow-hidden rounded-[32px] w-full h-full">
          <div className="relative h-full">
            <Image src="/presidents/trump.jpg" alt="Donald Trump" fill className="object-cover" />
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
        </Card>
      </motion.div>

      {/* Right stacked cards */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute right-4 top-4 w-[26%] h-[90%] space-y-4"
      >
        {/* Benjamin Franklin card */}
        <Card className="bg-[#1a1a1a] overflow-hidden rounded-[32px] w-full h-[48%]">
          <div className="relative h-full">
            <div className="absolute top-0 w-full h-7 bg-black/90 flex items-center justify-between px-4 text-xs text-white">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff6b00]" />
                ACTIVOTE
              </div>
              <span>1h</span>
            </div>
            <Image src="/historical/franklin.jpg" alt="Benjamin Franklin" fill className="object-cover" />
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
        </Card>

        {/* Trust Act card */}
        <Card className="bg-[#1a1a1a] overflow-hidden rounded-[32px] w-full h-[48%]">
          <div className="relative h-full">
            <div className="absolute top-0 w-full h-7 bg-black/90 flex items-center justify-between px-4 text-xs text-white">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff6b00]" />
                ACTIVOTE
              </div>
              <span>9:14</span>
            </div>
            <div className="p-8 pt-16">
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
        </Card>
      </motion.div>
    </div>
  )
}

