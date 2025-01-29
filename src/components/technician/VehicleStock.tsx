import { motion } from 'framer-motion';
import { Package2, AlertTriangle, TrendingDown, Truck } from 'lucide-react';
import Card from '../ui/Card';

export function VehicleStock() {
  const stockItems = [
    {
      id: 1,
      name: 'CPAP DreamStation',
      quantity: 3,
      minQuantity: 2,
      status: 'ok'
    },
    {
      id: 2,
      name: 'Masques nasaux taille M',
      quantity: 1,
      minQuantity: 3,
      status: 'low'
    },
    {
      id: 3,
      name: 'Filtres',
      quantity: 5,
      minQuantity: 10,
      status: 'warning'
    }
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <Truck className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
          Stock véhicule
        </h2>
        <button className="text-sm text-green-600 dark:text-green-400 hover:underline">
          Inventaire complet
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stockItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-lg border ${
              item.status === 'low'
                ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
                : item.status === 'warning'
                ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800'
                : 'bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {item.name}
              </span>
              {item.status !== 'ok' && (
                <div className={`p-1 rounded-full ${
                  item.status === 'low'
                    ? 'bg-red-100 dark:bg-red-900/40'
                    : 'bg-yellow-100 dark:bg-yellow-900/40'
                }`}>
                  {item.status === 'low' ? (
                    <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                  )}
                </div>
              )}
            </div>

            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                <span>Quantité</span>
                <span>{item.quantity} / {item.minQuantity}</span>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    item.status === 'low'
                      ? 'bg-red-600'
                      : item.status === 'warning'
                      ? 'bg-yellow-600'
                      : 'bg-green-600'
                  }`}
                  style={{ width: `${(item.quantity / item.minQuantity) * 100}%` }}
                />
              </div>
            </div>

            {item.status !== 'ok' && (
              <button className="mt-4 w-full px-3 py-1 text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600">
                Commander
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </Card>
  );
}