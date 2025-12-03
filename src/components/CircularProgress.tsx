'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
}

export default function CircularProgress({
  percentage,
  size = 200,
  strokeWidth = 15,
  color = '#3b82f6',
  label = '',
}: CircularProgressProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div ref={ref} className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{
            strokeDashoffset: inView ? offset : circumference,
          }}
          transition={{
            duration: 2,
            ease: 'easeInOut',
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: inView ? 1 : 0,
            scale: inView ? 1 : 0.5,
          }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-4xl font-bold text-gray-900 dark:text-white"
        >
          {percentage}%
        </motion.span>
        {label && (
          <span className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
