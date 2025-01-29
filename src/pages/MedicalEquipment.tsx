import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus, AlertTriangle, CheckCircle, Clock, Wrench, Package2, History, MapPin, User, TrendingUp, Activity } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { StatCard } from '../components/analytics/StatCard';
import { TrendChart } from '../components/analytics/TrendChart';
import { DistributionChart } from '../components/analytics/DistributionChart';
import { ChartCard } from '../components/analytics/ChartCard';

export default function MedicalEquipment() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState({
    type: 'all',
    status: 'all',
    location: 'all'
  });

  // Données statistiques
  const stats = {
    total: 125,
    enService: 98,
    maintenance: 15,
    disponible: 12
  };

  // Données pour les graphiques
  const equipmentTrend = [
    { date: '01/03', enService: 95, maintenance: 12, disponible: 18 },
    { date: '02/03', enService: 98, maintenance: 15, disponible: 12 },
    { date: '03/03', enService: 96, maintenance: 14, disponible: 15 },
    { date: '04/03', enService: 99, maintenance: 13, disponible: 13 },
    { date: '05/03', enService: 98, maintenance: 15, disponible: 12 }
  ];

  const typeDistribution = [
    { name: 'CPAP', value: 45, color: '#6366F1' },
    { name: 'BiPAP', value: 30, color: '#22C55E' },
    { name: 'VNI', value: 15, color: '#F59E0B' },
    { name: 'Autres', value: 10, color: '#EC4899' }
  ];

  const equipment = [
    {
      id: 1,
      name: 'CPAP DreamStation 2',
      type: 'CPAP',
      serialNumber: 'DS2024001',
      status: 'En service',
      patient: 'Jean Martin',
      lastMaintenance: '15/02/2024',
      nextMaintenance: '15/05/2024',
      location: 'Paris 15e',
      technicien: 'Pierre Martin',
      alerts: []
    },
    {
      id: 2,
      name: 'BiPAP AirCurve 10',
      type: 'BiPAP',
      serialNumber: 'AC2024002',
      status: 'Maintenance requise',
      patient: 'Marie Dubois',
      lastMaintenance: '10/01/2024',
      nextMaintenance: '10/04/2024',
      location: 'Paris 11e',
      technicien: 'Sophie Lambert',
      alerts: ['Maintenance préventive requise']
    },
    {
      id: 3,
      name: 'VNI Lumis 150',
      type: 'VNI',
      serialNumber: 'VL2024003',
      status: 'Disponible',
      patient: null,
      lastMaintenance: '20/02/2024',
      nextMaintenance: '20/05/2024',
      location: 'Dépôt central',
      technicien: null,
      alerts: []
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En service':
        return 'success';
      case 'Maintenance requise':
        return 'warning';
      case 'Disponible':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Matériel médical
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Gestion et suivi des équipements
          </p>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Ajouter un équipement
        </button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total équipements"
          value={stats.total}
          icon={Package2}
          color="blue"
          index={0}
        />
        <StatCard
          title="En service"
          value={stats.enService}
          icon={CheckCircle}
          color="green"
          index={1}
        />
        <StatCard
          title="En maintenance"
          value={stats.maintenance}
          icon={Wrench}
          color="yellow"
          index={2}
        />
        <StatCard
          title="Disponibles"
          value={stats.disponible}
          icon={Package2}
          color="gray"
          index={3}
        />
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="État du parc"
          icon={TrendingUp}
          color="blue"
        >
          <TrendChart
            data={equipmentTrend}
            lines={[
              { key: 'enService', name: 'En service', color: '#22C55E' },
              { key: 'maintenance', name: 'En maintenance', color: '#F59E0B' },
              { key: 'disponible', name: 'Disponible', color: '#6B7280' }
            ]}
          />
        </ChartCard>

        <ChartCard
          title="Distribution par type"
          icon={Activity}
          color="purple"
        >
          <DistributionChart data={typeDistribution} />
        </ChartCard>
      </div>

      {/* Filtres */}
      <Card className="p-6">
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
            <select
              value={filter.type}
              onChange={(e) => setFilter(f => ({ ...f, type: e.target.value }))}
              className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            >
              <option value="all">Tous les types</option>
              <option value="cpap">CPAP</option>
              <option value="bipap">BiPAP</option>
              <option value="vni">VNI</option>
            </select>
            <select
              value={filter.status}
              onChange={(e) => setFilter(f => ({ ...f, status: e.target.value }))}
              className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            >
              <option value="all">Tous les statuts</option>
              <option value="service">En service</option>
              <option value="maintenance">En maintenance</option>
              <option value="disponible">Disponible</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Liste des équipements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {equipment.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {item.name}
                    </h3>
                    <Badge variant={getStatusColor(item.status)}>{item.status}</Badge>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.type} - SN: {item.serialNumber}
                  </p>
                </div>
                {item.alerts.length > 0 && (
                  <div className="flex items-center text-yellow-600 dark:text-yellow-400">
                    <AlertTriangle className="w-5 h-5 mr-1" />
                    <span className="text-sm">{item.alerts[0]}</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                {item.patient && (
                  <div className="col-span-2">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <User className="w-4 h-4 mr-2" />
                      Patient: {item.patient}
                    </div>
                  </div>
                )}
                <div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <MapPin className="w-4 h-4 mr-2" />
                    {item.location}
                  </div>
                </div>
                {item.technicien && (
                  <div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <Wrench className="w-4 h-4 mr-2" />
                      Tech: {item.technicien}
                    </div>
                  </div>
                )}
                <div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <History className="w-4 h-4 mr-2" />
                    Maintenance: {item.lastMaintenance}
                  </div>
                </div>
                <div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <Clock className="w-4 h-4 mr-2" />
                    Prochaine: {item.nextMaintenance}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Détails
                </button>
                <button className="px-4 py-2 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  Maintenance
                </button>
                <button className="px-4 py-2 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  Historique
                </button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}