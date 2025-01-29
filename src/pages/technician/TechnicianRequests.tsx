import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Clock, User, AlertTriangle, Package2, Calendar, CheckCircle, Wrench, Phone } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { StatCard } from '../../components/analytics/StatCard';
import { TrendChart } from '../../components/analytics/TrendChart';
import { ChartCard } from '../../components/analytics/ChartCard';

export default function TechnicianRequests() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState({
    type: 'all',
    priority: 'all',
    status: 'all'
  });

  // Statistiques du technicien
  const stats = {
    todayInterventions: 5,
    completedToday: 2,
    upcomingToday: 3,
    weeklyTotal: 25
  };

  // Données pour le graphique de tendance
  const weeklyTrend = [
    { date: 'Lun', installations: 3, maintenances: 2, reparations: 1 },
    { date: 'Mar', installations: 2, maintenances: 3, reparations: 1 },
    { date: 'Mer', installations: 4, maintenances: 2, reparations: 0 },
    { date: 'Jeu', installations: 3, maintenances: 2, reparations: 2 },
    { date: 'Ven', installations: 2, maintenances: 4, reparations: 1 }
  ];

  // Liste des demandes d'intervention
  const requests = [
    {
      id: '1',
      type: 'installation',
      priority: 'high',
      status: 'pending',
      scheduledFor: '15/03/2024',
      timeSlot: '09:00 - 10:30',
      patient: {
        name: 'Marie Dubois',
        address: '15 Rue des Lilas, 75015 Paris',
        phone: '06 12 34 56 78'
      },
      equipment: {
        type: 'CPAP',
        model: 'DreamStation 2',
        serialNumber: 'DS2024-001'
      },
      instructions: 'Première installation - Formation patient requise',
      estimatedDuration: '1h30'
    },
    {
      id: '2',
      type: 'maintenance',
      priority: 'medium',
      status: 'in_progress',
      scheduledFor: '15/03/2024',
      timeSlot: '11:00 - 12:00',
      patient: {
        name: 'Jean Martin',
        address: '8 Avenue Montaigne, 75008 Paris',
        phone: '06 98 76 54 32'
      },
      equipment: {
        type: 'BiPAP',
        model: 'AirCurve 10',
        serialNumber: 'AC2024-002'
      },
      instructions: 'Maintenance trimestrielle - Vérification des paramètres',
      estimatedDuration: '1h'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'in_progress':
        return 'success';
      case 'completed':
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'À faire';
      case 'in_progress':
        return 'En cours';
      case 'completed':
        return 'Terminé';
    }
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-purple-600 to-indigo-600 p-6 rounded-2xl text-white">
        <div>
          <h1 className="text-2xl font-bold">Mes interventions</h1>
          <p className="text-purple-100 mt-1">Planning et suivi des interventions</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="bg-white/10 border-0 rounded-lg text-white placeholder-white/60 px-4 py-2">
            <option value="today">Aujourd'hui</option>
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
          </select>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Interventions aujourd'hui"
          value={stats.todayInterventions}
          icon={Calendar}
          color="purple"
          index={0}
        />
        <StatCard
          title="Terminées"
          value={stats.completedToday}
          icon={CheckCircle}
          color="green"
          index={1}
        />
        <StatCard
          title="À venir"
          value={stats.upcomingToday}
          icon={Clock}
          color="yellow"
          index={2}
        />
        <StatCard
          title="Total semaine"
          value={stats.weeklyTotal}
          icon={Package2}
          color="blue"
          index={3}
        />
      </div>

      {/* Graphique des tendances */}
      <ChartCard
        title="Activité de la semaine"
        icon={Wrench}
        color="purple"
      >
        <TrendChart
          data={weeklyTrend}
          lines={[
            { key: 'installations', name: 'Installations', color: '#6366F1' },
            { key: 'maintenances', name: 'Maintenances', color: '#22C55E' },
            { key: 'reparations', name: 'Réparations', color: '#F59E0B' }
          ]}
        />
      </ChartCard>

      {/* Filtres */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une intervention..."
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
              <option value="installation">Installation</option>
              <option value="maintenance">Maintenance</option>
              <option value="reparation">Réparation</option>
            </select>
            <select
              value={filter.status}
              onChange={(e) => setFilter(f => ({ ...f, status: e.target.value }))}
              className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">À faire</option>
              <option value="in_progress">En cours</option>
              <option value="completed">Terminé</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Liste des interventions */}
      <div className="space-y-6">
        {requests.map((request, index) => (
          <motion.div
            key={request.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {request.type === 'installation' ? 'Installation' :
                       request.type === 'maintenance' ? 'Maintenance' : 'Réparation'}
                    </h3>
                    <Badge variant={getPriorityColor(request.priority)}>
                      Priorité {request.priority === 'high' ? 'haute' : request.priority === 'medium' ? 'moyenne' : 'basse'}
                    </Badge>
                    <Badge variant={getStatusColor(request.status)}>
                      {getStatusLabel(request.status)}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {request.equipment.type} - {request.equipment.model}
                  </p>
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="w-4 h-4 mr-1" />
                  {request.scheduledFor} • {request.timeSlot}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <User className="w-4 h-4 mr-2" />
                    {request.patient.name}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <MapPin className="w-4 h-4 mr-2" />
                    {request.patient.address}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <Phone className="w-4 h-4 mr-2" />
                    {request.patient.phone}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <Package2 className="w-4 h-4 mr-2" />
                    SN: {request.equipment.serialNumber}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <Clock className="w-4 h-4 mr-2" />
                    Durée estimée: {request.estimatedDuration}
                  </div>
                  {request.instructions && (
                    <div className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                      <AlertTriangle className="w-4 h-4 mr-2 mt-0.5" />
                      {request.instructions}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                {request.status === 'pending' && (
                  <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    Commencer l'intervention
                  </button>
                )}
                {request.status === 'in_progress' && (
                  <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    Terminer l'intervention
                  </button>
                )}
                <button className="px-4 py-2 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  Détails
                </button>
                {request.status !== 'completed' && (
                  <button className="px-4 py-2 text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors">
                    Signaler un problème
                  </button>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}