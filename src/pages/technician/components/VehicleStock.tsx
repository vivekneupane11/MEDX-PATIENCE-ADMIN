import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Package2, 
  AlertTriangle, 
  TrendingDown, 
  Truck, 
  QrCode,
  History,
  Users,
  Search
} from 'lucide-react';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';

interface StockItem {
  id: string;
  name: string;
  category: 'equipment' | 'consumable' | 'tool';
  quantity: number;
  minQuantity: number;
  status: 'ok' | 'low' | 'critical';
  lastUpdate: string;
}

interface NearbyTechnician {
  id: string;
  name: string;
  distance: string;
  stock: StockItem[];
}

export function VehicleStock() {
  const [activeTab, setActiveTab] = useState<'myStock' | 'nearby'>('myStock');
  const [searchTerm, setSearchTerm] = useState('');

  const stockItems: StockItem[] = [
    {
      id: '1',
      name: 'CPAP DreamStation',
      category: 'equipment',
      quantity: 2,
      minQuantity: 2,
      status: 'ok',
      lastUpdate: '2024-03-15'
    },
    {
      id: '2',
      name: 'Masques nasaux taille M',
      category: 'consumable',
      quantity: 1,
      minQuantity: 3,
      status: 'critical',
      lastUpdate: '2024-03-15'
    },
    {
      id: '3',
      name: 'Filtres CPAP',
      category: 'consumable',
      quantity: 5,
      minQuantity: 10,
      status: 'low',
      lastUpdate: '2024-03-15'
    },
    {
      id: '4',
      name: 'Kit maintenance',
      category: 'tool',
      quantity: 1,
      minQuantity: 1,
      status: 'ok',
      lastUpdate: '2024-03-15'
    }
  ];

  const nearbyTechnicians: NearbyTechnician[] = [
    {
      id: '1',
      name: 'Jean Martin',
      distance: '1.5 km',
      stock: [
        {
          id: '1',
          name: 'CPAP DreamStation',
          category: 'equipment',
          quantity: 1,
          minQuantity: 2,
          status: 'low',
          lastUpdate: '2024-03-15'
        },
        {
          id: '2',
          name: 'Masques nasaux taille M',
          category: 'consumable',
          quantity: 4,
          minQuantity: 3,
          status: 'ok',
          lastUpdate: '2024-03-15'
        }
      ]
    },
    {
      id: '2',
      name: 'Marie Dubois',
      distance: '2.0 km',
      stock: [
        {
          id: '3',
          name: 'Filtres CPAP',
          category: 'consumable',
          quantity: 8,
          minQuantity: 10,
          status: 'ok',
          lastUpdate: '2024-03-15'
        }
      ]
    }
  ];

  const getStatusColor = (status: StockItem['status']) => {
    switch (status) {
      case 'critical':
        return 'danger';
      case 'low':
        return 'warning';
      default:
        return 'success';
    }
  };

  const getCategoryLabel = (category: StockItem['category']) => {
    switch (category) {
      case 'equipment':
        return 'Équipement';
      case 'consumable':
        return 'Consommable';
      case 'tool':
        return 'Outil';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Truck className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Stock véhicule
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('myStock')}
            className={`px-3 py-1 text-sm rounded-lg transition-colors ${
              activeTab === 'myStock'
                ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            Mon stock
          </button>
          <button
            onClick={() => setActiveTab('nearby')}
            className={`px-3 py-1 text-sm rounded-lg transition-colors ${
              activeTab === 'nearby'
                ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            À proximité
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un équipement..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg"
          />
        </div>
      </div>

      {activeTab === 'myStock' ? (
        <>
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              <button className="flex items-center px-3 py-1 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                <QrCode className="w-4 h-4 mr-2" />
                Scanner
              </button>
              <button className="flex items-center px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <History className="w-4 h-4 mr-2" />
                Historique
              </button>
            </div>
            <button className="text-sm text-purple-600 dark:text-purple-400 hover:underline">
              Mettre à jour
            </button>
          </div>

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
                      {getCategoryLabel(item.category)}
                    </Badge>
                  </div>
                  <Badge variant={getStatusColor(item.status)}>
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
                  <button className="mt-4 w-full px-3 py-1 text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600">
                    Commander
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </>
      ) : (
        <div className="space-y-6">
          {nearbyTechnicians.map((tech, techIndex) => (
            <motion.div
              key={tech.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: techIndex * 0.1 }}
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
            >
              <div className="bg-gray-50 dark:bg-gray-800 p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2" />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {tech.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      À {tech.distance}
                    </p>
                  </div>
                </div>
                <button className="px-3 py-1 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Contacter
                </button>
              </div>

              <div className="p-4 space-y-4">
                {tech.stock.map((item, itemIndex) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (techIndex + itemIndex) * 0.1 }}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {item.name}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                        ({item.quantity} disponible{item.quantity > 1 ? 's' : ''})
                      </span>
                    </div>
                    <button className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                      Demander
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </Card>
  );
}