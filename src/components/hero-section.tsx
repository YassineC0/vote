"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

interface HeroCard {
  id: number
  title: string
  subtitle?: string
  date?: string
  imagePath: string
  isVideo?: boolean
}

const heroCards: HeroCard[] = [
  {
    id: 1,
    title: "Barack Obama",
    subtitle: "A book presentation about the 44th president of the United States",
    date: "22/08 18:00",
    imagePath: "/presidents/obama.jpg",
  },
  {
    id: 2,
    title: "Donald J. Trump",
    subtitle: "45th president of the United States",
    date: "June 14, 1946",
    imagePath: "/presidents/trump.jpg",
  },
  {
    id: 3,
    title: "The Benjamin Franklin Story",
    subtitle: "Was an American polymath who was active as a writer",
    imagePath: "/historical/franklin.jpg",
  },
  {
    id: 4,
    title: "SB1295: Trust Act of 2021",
    subtitle: "Time to rescue United States Trusts Act 2021",
    imagePath: "/legislation/trust-act.jpg",
  },
]

export function HeroSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {heroCards.map((card) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: card.id * 0.1 }}
          >
            <Card
              className="group relative overflow-hidden bg-[#1a1a1a] border-[#333] hover:border-[#9fef00] transition-all duration-500 rounded-xl"
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardContent className="p-0">
                <div className="relative aspect-[3/4] w-full">
                  {card.isVideo ? (
                    <video
                      src={card.imagePath}
                      className="object-cover w-full h-full"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  ) : (
                    <Image src={card.imagePath || "/placeholder.svg"} alt={card.title} fill className="object-cover" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                  {/* Content overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 transform transition-transform duration-500 ease-in-out">
                    <div
                      className={`transform transition-transform duration-500 ${
                        hoveredCard === card.id ? "translate-y-0" : "translate-y-12"
                      }`}
                    >
                      {card.date && <div className="text-[#9fef00] text-sm mb-2">{card.date}</div>}
                      <h3 className="text-2xl font-bold text-white mb-2">{card.title}</h3>
                      {card.subtitle && (
                        <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          {card.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

