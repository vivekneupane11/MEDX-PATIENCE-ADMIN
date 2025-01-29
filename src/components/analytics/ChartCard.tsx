import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import Card from '../ui/Card';

interface ChartCardProps {
  title: string;
  icon: LucideIcon;
  color: string;
  children: ReactNode;
  className?: string;
}

export function ChartCard({ title, icon: Icon, color, children, className }: ChartCardProps) {
  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'text-blue-600 dark:text-blue-400',
      green: 'text-green-600 dark:text-green-400',
      yellow: 'text-yellow-600 dark:text-yellow-400',
      red: 'text-red-600 dark:text-red-400',
      purple: 'text-purple-600 dark:text-purple-400'
    };
    return colors[color] || colors.blue;
  };

  return (
    <Card className={`p-6 ${className || ''}`}>
      <div className="flex items-center gap-2 mb-6">
        <Icon className={`w-5 h-5 ${getColorClasses(color)}`} />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
      </div>
      {children}
    </Card>
  );
}