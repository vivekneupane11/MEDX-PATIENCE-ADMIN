import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package2, AlertTriangle, Search, Filter, ArrowUpDown, TrendingUp, Activity, Clock, Truck, Warehouse } from 'lucide-react';
import { PieChart, Pie, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import Card from '../components/ui/Card';

const Inventory = () => {
  const [view, setView] = useState<'grid' | 'table'>('grid');
  const [period, setPeriod] = useState('month');
  const [stockView, setStockView] = useState<'depot' | 'vehicles'>('depot');
  const [filter, setFilter] = useState({
    category: 'all',
    status: 'all',
    location: 'all'
  });

  // Données pour les graphiques
  const stockDistribution = [
    { name: 'CPAP', value: 45, color: '#6366F1' },
    { name: 'BPAP', value: 30, color: '#22C55E' },
    { name: 'VNI', value: 15, color: '#F59E0B' },
    { name: 'Autres', value: 10, color: '#EC4899' }
  ];

  const stockHistory = [
    { date: '01/03', cpap: 42, bpap: 28, vni: 14 },
    { date: '02/03', cpap: 45, bpap: 30, vni: 15 },
    { date: '03/03', cpap: 43, bpap: 29, vni: 16 },
    { date: '04/03', cpap: 46, bpap: 31, vni: 15 },
    { date: '05/03', cpap: 44, bpap: 30, vni: 14 },
    { date: '06/03', cpap: 47, bpap: 32, vni: 16 },
    { date: '07/03', cpap: 45, bpap: 30, vni: 15 }
  ];

  const vehicleStocks = [
    {
      technicien: "Pierre Martin",
      vehicle: "Utilitaire 1",
      stock: [
        { type: "CPAP", quantity: 3 },
        { type: "BPAP", quantity: 2 },
        { type: "Masques", quantity: 10 }
      ]
    },
    {
      technicien: "Marie Lambert",
      vehicle: "Utilitaire 2",
      stock: [
        { type: "CPAP", quantity: 2 },
        { type: "BPAP", quantity: 1 },
        { type: "Masques", quantity: 8 }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* En-tête avec gradient */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-2xl text-white">
        <div>
          <h1 className="text-2xl font-bold">Gestion des stocks</h1>
          <p className="text-blue-100 mt-1">Vue d'ensemble du matériel médical</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="bg-white/10 border-0 rounded-lg text-white placeholder-white/60 px-4 py-2"
          >
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
            <option value="quarter">Ce trimestre</option>
          </select>
          <button className="flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
            <Package2 className="w-4 h-4 mr-2" />
            Nouveau matériel
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total équipements', value: '125', change: '+5', icon: Package2, color: 'blue' },
          { title: 'Stock dépôt', value: '98', change: '+3', icon: Warehouse, color: 'green' },
          { title: 'Stock véhicules', value: '27', change: '+2', icon: Truck, color: 'yellow' },
          { title: 'Stock critique', value: '3', change: '-1', icon: AlertTriangle, color: 'red' }
        ].map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{kpi.title}</p>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                    {kpi.value}
                  </h3>
                  <p className={`text-sm mt-2 ${
                    kpi.change.startsWith('+') ? 'text-green-600' : 
                    kpi.change.startsWith('-') ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {kpi.change} vs mois dernier
                  </p>
                </div>
                <div className={`p-4 rounded-2xl bg-${kpi.color}-100 dark:bg-${kpi.color}-900/20`}>
                  <kpi.icon className={`w-8 h-8 text-${kpi.color}-600 dark:text-${kpi.color}-400`} />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Sélecteur de vue */}
      <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-fit">
        <button
          onClick={() => setStockView('depot')}
          className={`px-4 py-2 rounded-md transition-colors ${
            stockView === 'depot'
              ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-700/50'
          }`}
        >
          <Warehouse className="w-4 h-4 inline-block mr-2" />
          Stock dépôt
        </button>
        <button
          onClick={() => setStockView('vehicles')}
          className={`px-4 py-2 rounded-md transition-colors ${
            stockView === 'vehicles'
              ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-700/50'
          }`}
        >
          <Truck className="w-4 h-4 inline-block mr-2" />
          Stock véhicules
        </button>
      </div>

      {stockView === 'depot' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Distribution du stock */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <Package2 className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                Distribution du stock dépôt
              </h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <defs>
                      {stockDistribution.map((entry, index) => (
                        <linearGradient key={`gradient-${index}`} id={`gradient-${entry.name}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={entry.color} stopOpacity={0.8}/>
                          <stop offset="100%" stopColor={entry.color} stopOpacity={0.3}/>
                        </linearGradient>
                      ))}
                    </defs>
                    <Pie
                      data={stockDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={8}
                      dataKey="value"
                    >
                      {stockDistribution.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={`url(#gradient-${entry.name})`}
                          stroke={entry.color}
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        borderRadius: '8px',
                        border: 'none',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Legend 
                      verticalAlign="middle" 
                      align="right" 
                      layout="vertical"
                      formatter={(value, entry: any) => (
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {value}
                        </span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>

          {/* Évolution du stock */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
                Évolution du stock dépôt
              </h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={stockHistory}>
                    <defs>
                      <linearGradient id="cpapGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="bpapGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="vniGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#9CA3AF"
                      tick={{ fill: '#6B7280' }}
                    />
                    <YAxis 
                      stroke="#9CA3AF"
                      tick={{ fill: '#6B7280' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        borderRadius: '8px',
                        border: 'none',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="cpap"
                      stroke="#6366F1"
                      fill="url(#cpapGradient)"
                      name="CPAP"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="bpap"
                      stroke="#22C55E"
                      fill="url(#bpapGradient)"
                      name="BPAP"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="vni"
                      stroke="#F59E0B"
                      fill="url(#vniGradient)"
                      name="VNI"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {vehicleStocks.map((vehicle, index) => (
            <motion.div
              key={vehicle.technicien}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <Truck className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {vehicle.vehicle}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {vehicle.technicien}
                      </p>
                    </div>
                  </div>
                  <button className="px-3 py-1 text-sm bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/40 transition-colors">
                    Mettre à jour
                  </button>
                </div>
                <div className="space-y-4">
                  {vehicle.stock.map((item) => (
                    <div key={item.type} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {item.type}
                      </span>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {item.quantity} unités
                        </span>
                        <div className="ml-4 w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-600 dark:bg-blue-400 rounded-full"
                            style={{ width: `${(item.quantity / 10) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Alertes et actions rapides */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
              Actions rapides
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                <Package2 className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2" />
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  Nouvelle entrée stock
                </h4>
              </button>
              <button className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                <Truck className="w-6 h-6 text-green-600 dark:text-green-400 mb-2" />
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  Transfert véhicule
                </h4>
              </button>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-red-600 dark:text-red-400" />
              Alertes stock
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      Stock critique CPAP
                    </span>
                  </div>
                  <span className="text-xs text-red-600 dark:text-red-400">5 unités</span>
                </div>
              </div>
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      Stock faible BPAP
                    </span>
                  </div>
                  <span className="text-xs text-yellow-600 dark:text-yellow-400">8 unités</span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Inventory;