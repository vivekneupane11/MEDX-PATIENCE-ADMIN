interface StatCardProps {
  title: string;
  value: number;
  change: string;
  isPositive?: boolean;
}

const StatCard = ({ title, value, change, isPositive = true }: StatCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <span className="text-3xl font-semibold text-gray-900 dark:text-white">{value}</span>
        <span className={`ml-2 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </span>
      </div>
    </div>
  );
}

export default StatCard;