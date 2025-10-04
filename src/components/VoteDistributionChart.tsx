import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface VoteDistributionChartProps {
  data: { name: string; value: number; color: string }[];
}

export function VoteDistributionChart({ data }: VoteDistributionChartProps) {
  // Debugging: Log data to check if it's being passed correctly
  console.log("Vote Distribution Chart Data:", data);

  // Check if all candidates have 0 votes (Recharts won't render an empty PieChart)
  const hasVotes = data.some((entry) => entry.value > 0);
  if (!hasVotes) {
    return <p className="text-white text-center">No votes have been cast yet.</p>;
  }

  return (
    <div className="bg-black/80 p-6 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.7)] border border-[#333] backdrop-blur-sm">
      <h2 className="text-xl font-semibold text-white text-center mb-6">Vote Distribution</h2>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={120}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>

          {/* Tooltip with improved handling */}
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-black border border-[#333] p-4 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
                    <p className="text-white font-medium">{payload[0].payload.name}</p>
                    <p className="text-[#9fef00]">Votes: {payload[0].payload.value}</p>
                  </div>
                );
              }
              return null;
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}