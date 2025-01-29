import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import Card from '../ui/Card';

interface StatCardProps {
  title: string;
  value: number | string;
  change?: string;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'gray';
  index?: number;
}

export function StatCard({ title, value, change, icon: Icon, color, index = 0 }: StatCardProps) {
  const getColorClasses = (color: StatCardProps['color']) => {
    const colors = {
      blue: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
      green: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400',
      yellow: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400',
      red: 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400',
      purple: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
      gray: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
    };
    return colors[color];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
              {value}
            </h3>
            {change && (
              <p className={`text-sm mt-2 ${
                change.startsWith('+') ? 'text-green-600' : 
                change.startsWith('-') ? 'text-red-600' : 'text-gray-600'
              }`}>
                {change} vs période préc.
              </p>
            )}
          </div>
          <div className={`p-4 rounded-2xl ${getColorClasses(color)}`}>
            <Icon className="w-8 h-8" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}