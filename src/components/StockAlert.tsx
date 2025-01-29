import { AlertTriangle } from 'lucide-react';

interface StockAlertProps {
  type: string;
  message: string;
  quantity: number;
  threshold: number;
}

const StockAlert = ({ type, message, quantity, threshold }: StockAlertProps) => {
  const percentage = (quantity / threshold) * 100;

  return (
    <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {type}
          </span>
        </div>
        <span className="text-xs text-red-600 dark:text-red-400">
          {message}
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className="bg-red-600 dark:bg-red-500 h-2 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="mt-1 flex justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>{quantity} unités</span>
        <span>Seuil : {threshold}</span>
      </div>
    </div>
  );
};

export default StockAlert;