"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface CandidateVotesChartProps {
  data: {
    name: string;
    current: number;
    previous: number;
  }[];
}

export function CandidateVotesChart({ data }: CandidateVotesChartProps) {
  console.log("Chart Data:", data); // Debugging log

  if (!data || data.length === 0) {
    return (
      <Card className="bg-[#1a1a1a] hover:bg-[#222] transition-all p-6 rounded-xl border-[#333] shadow-lg hover:shadow-xl min-h-[300px] flex items-center justify-center">
        <p className="text-white text-lg">No data available</p>
      </Card>
    );
  }

  return (
    <Card className="bg-[#1a1a1a] hover:bg-[#222] transition-all p-6 rounded-xl border-[#333] shadow-lg hover:shadow-xl">
      <CardHeader className="p-0 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-bold text-white mb-1">Vote Distribution</CardTitle>
            <p className="text-sm text-[#9fef00]">Last 7 days VS prior week</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />

            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-[#2a2a2a] rounded-lg p-3 border border-[#333] shadow-xl">
                      <p className="text-[#9fef00] mb-2">{payload[0]?.payload.name}</p>
                      <p className="text-white text-sm">Current: {payload[0]?.value}</p>
                      <p className="text-gray-400 text-sm">
                        Previous: {payload[1] ? payload[1].value : "N/A"}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />

            <Line
              type="monotone"
              dataKey="current"
              stroke="#9fef00"
              strokeWidth={3}
              dot={{ strokeWidth: 3, r: 4, fill: "#1a1a1a", stroke: "#9fef00" }}
              activeDot={{ r: 6, strokeWidth: 3 }}
            />
            <Line
              type="monotone"
              dataKey="previous"
              stroke="#666"
              strokeWidth={2}
              dot={{ strokeWidth: 2, r: 3, fill: "#1a1a1a", stroke: "#666" }}
              activeDot={{ r: 5, strokeWidth: 2 }}
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
