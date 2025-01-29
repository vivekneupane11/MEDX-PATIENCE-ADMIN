import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Truck, Users } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { StockMap } from './components/StockMap';
import { VehicleStockList } from './components/VehicleStockList';

export default function TechnicianStock() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'myStock' | 'nearby'>('myStock');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Tout' },
    { id: 'equipment', label: 'Équipements' },
    { id: 'consumable', label: 'Consommables' },
    { id: 'tool', label: 'Outils' }
  ];

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-purple-600 to-indigo-600 p-6 rounded-2xl text-white">
        <div>
          <h1 className="text-2xl font-bold">Stock véhicule</h1>
          <p className="text-purple-100 mt-1">Gestion de votre inventaire mobile</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Carte et stock véhicule */}
        <div className="lg:col-span-2 space-y-6">
          {/* Carte des interventions */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <Users className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
                Carte des interventions
              </h2>
              <div className="flex gap-2">
                <Badge variant="success">3 techniciens</Badge>
                <Badge variant="warning">2 interventions</Badge>
              </div>
            </div>
            <div className="h-[400px] rounded-lg overflow-hidden">
              <StockMap />
            </div>
          </Card>

          {/* Stock véhicule */}
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

            {/* Filtres */}
            <div className="mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher un équipement..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                  />
                </div>
                <div className="flex gap-4">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <VehicleStockList searchTerm={searchTerm} selectedCategory={selectedCategory} />
          </Card>
        </div>
      </div>
    </div>
  );
}