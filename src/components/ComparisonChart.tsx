'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { useInView } from 'react-intersection-observer';

interface ComparisonChartProps {
  windowsOfficeCost: number;
  linuxCost: number;
}

export default function ComparisonChart({
  windowsOfficeCost,
  linuxCost,
}: ComparisonChartProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const data = [
    {
      name: 'Windows + Office',
      cost: windowsOfficeCost,
      fill: '#ef4444',
    },
    {
      name: 'Linux',
      cost: linuxCost,
      fill: '#10b981',
    },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-semibold text-gray-900 dark:text-white">
            {payload[0].payload.name}
          </p>
          <p className="text-lg font-bold" style={{ color: payload[0].fill }}>
            {payload[0].value.toLocaleString('fr-FR')} €/an
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div ref={ref} className="w-full h-64 md:h-80">
      {inView && (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              type="number"
              tickFormatter={(value) => `${value.toLocaleString('fr-FR')} €`}
              stroke="#6b7280"
            />
            <YAxis type="category" dataKey="name" stroke="#6b7280" />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }} />
            <Bar dataKey="cost" radius={[0, 8, 8, 0]} animationDuration={1500}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
