import React from 'react';
import type { StatsCardProps } from '../../../types';
import { motion } from 'framer-motion';

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  color = 'text-gray-900',
  onClick,
  isActive = false
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        cursor-pointer bg-white p-3 sm:p-4 rounded-lg shadow
        border-2 transition min-w-[120px] flex-shrink
        ${isActive ? 'border-blue-500 bg-blue-50' : 'border-transparent'}
      `}
    >
      <div className="flex items-center justify-between space-x-2">
        <div>
          <p className="text-xs text-gray-600">{title}</p>
          <p className={`text-xl font-semibold ${color}`}>{value}</p>
        </div>
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
    </motion.div>
  );
};

export default StatsCard;
