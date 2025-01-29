import { motion } from 'framer-motion';
import { AlertTriangle, TrendingDown, Package2 } from 'lucide-react';
import Badge from '../../../components/ui/Badge';

interface VehicleStockListProps {
  searchTerm: string;
  selectedCategory: string;
}

export function VehicleStockList({ searchTerm, selectedCategory }: VehicleStockListProps) {
  const stockItems = [
    {
      id: 1,
      name: 'CPAP DreamStation',
      category: 'equipment',
      quantity: 2,
      minQuantity: 2,
      status: 'ok',
      lastUpdate: '2024-03-15'
    },
    {
      id: 2,
      name: 'Masques nasaux taille M',
      category: 'consumable',
      quantity: 1,
      minQuantity: 3,
      status: 'critical',
      lastUpdate: '2024-03-15'
    },
    {
      id: 3,
      name: 'Filtres CPAP',
      category: 'consumable',
      quantity: 5,
      minQuantity: 10,
      status: 'low',
      lastUpdate: '2024-03-15'
    },
    {
      id: 4,
      name: 'Kit maintenance',
      category: 'tool',
      quantity: 1,
      minQuantity: 1,
      status: 'ok',
      lastUpdate: '2024-03-15'
    }
  ].filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-4">
      {stockItems.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`p-4 rounded-lg border ${
            item.status === 'critical'
              ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
              : item.status === 'low'
              ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800'
              : 'bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {item.name}
              </span>
              <Badge
                variant="default"
                className="ml-2 text-xs"
              >
                {item.category === 'equipment' ? 'Équipement' :
                 item.category === 'consumable' ? 'Consommable' : 'Outil'}
              </Badge>
            </div>
            <Badge variant={
              item.status === 'critical' ? 'danger' :
              item.status === 'low' ? 'warning' : 'success'
            }>
              {item.status === 'critical' ? 'Critique' : 
               item.status === 'low' ? 'Faible' : 'OK'}
            </Badge>
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
              <span>Quantité</span>
              <span>{item.quantity} / {item.minQuantity}</span>
            </div>
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  item.status === 'critical'
                    ? 'bg-red-600'
                    : item.status === 'low'
                    ? 'bg-yellow-600'
                    : 'bg-purple-600'
                }`}
                style={{ width: `${(item.quantity / item.minQuantity) * 100}%` }}
              />
            </div>
          </div>

          {(item.status === 'critical' || item.status === 'low') && (
            <div className="mt-4 flex gap-2">
              <button className="flex-1 px-3 py-1 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Commander
              </button>
              <button className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                Transférer
              </button>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}