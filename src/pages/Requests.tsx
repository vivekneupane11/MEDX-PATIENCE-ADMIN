import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus, MapPin, Clock, User, AlertTriangle, Package2, Calendar, FileCheck, TrendingUp, Activity } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { StatCard } from '../components/analytics/StatCard';
import { TrendChart } from '../components/analytics/TrendChart';
import { DistributionChart } from '../components/analytics/DistributionChart';
import { ChartCard } from '../components/analytics/ChartCard';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

interface Request {
  id: string;
  type: 'installation' | 'maintenance' | 'reparation' | 'recuperation';
  priority: 'high' | 'medium' | 'low';
  patient: {
    name: string;
    address: string;
    phone: string;
  };
  equipment: {
    type: string;
    model: string;
    serialNumber?: string;
  };
  timeReceived: string;
  scheduledFor?: string;
  stockStatus: 'available' | 'low' | 'critical';
  suggestedTech?: string;
  doctor: string;
  status: 'pending' | 'validated' | 'rejected';
}

export default function Requests() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState({
    type: 'all',
    priority: 'all',
    status: 'all'
  });

  // Données statistiques
  const stats = {
    total: 60,
    pending: 12,
    validated: 45,
    rejected: 3
  };

  // Données pour les graphiques
  const requestsTrend = [
    { date: '01/03', nouvelles: 15, validees: 12, rejetees: 2 },
    { date: '02/03', nouvelles: 18, validees: 15, rejetees: 1 },
    { date: '03/03', nouvelles: 12, validees: 14, rejetees: 1 },
    { date: '04/03', nouvelles: 20, validees: 16, rejetees: 2 },
    { date: '05/03', nouvelles: 16, validees: 15, rejetees: 1 }
  ];

  const typeDistribution = [
    { name: 'Installation', value: 40, color: '#6366F1' },
    { name: 'Maintenance', value: 35, color: '#22C55E' },
    { name: 'Réparation', value: 15, color: '#F59E0B' },
    { name: 'Récupération', value: 10, color: '#EC4899' }
  ];

  const requests: Request[] = [
    {
      id: '1',
      type: 'installation',
      priority: 'high',
      patient: {
        name: 'Sophie Dubois',
        address: '15 Rue du Commerce, Paris',
        phone: '06 12 34 56 78'
      },
      equipment: {
        type: 'CPAP',
        model: 'DreamStation 2',
        serialNumber: 'DS2024-001'
      },
      timeReceived: 'Il y a 10 min',
      scheduledFor: '16/03/2024 - 14:00',
      stockStatus: 'available',
      suggestedTech: 'Pierre Martin',
      doctor: 'Dr. Lambert',
      status: 'pending'
    },
    {
      id: '2',
      type: 'maintenance',
      priority: 'medium',
      patient: {
        name: 'Jean Dupont',
        address: '8 Avenue Montaigne, Paris',
        phone: '06 98 76 54 32'
      },
      equipment: {
        type: 'BiPAP',
        model: 'AirCurve 10',
        serialNumber: 'AC2024-002'
      },
      timeReceived: 'Il y a 30 min',
      scheduledFor: '17/03/2024 - 10:00',
      stockStatus: 'low',
      suggestedTech: 'Marie Lambert',
      doctor: 'Dr. Bernard',
      status: 'validated'
    }
  ];

  const getPriorityColor = (priority: Request['priority']) => {
    switch (priority) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
    }
  };

  const getStatusColor = (status: Request['status']) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'validated':
        return 'success';
      case 'rejected':
        return 'danger';
    }
  };

  const getStatusLabel = (status: Request['status']) => {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'validated':
        return 'Validée';
      case 'rejected':
        return 'Refusée';
    }
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Demandes d'intervention
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Gestion des demandes d'intervention
          </p>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Nouvelle demande
        </button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total demandes"
          value={stats.total}
          icon={Package2}
          color="blue"
          index={0}
        />
        <StatCard
          title="En attente"
          value={stats.pending}
          icon={Clock}
          color="yellow"
          index={1}
        />
        <StatCard
          title="Validées"
          value={stats.validated}
          icon={FileCheck}
          color="green"
          index={2}
        />
        <StatCard
          title="Refusées"
          value={stats.rejected}
          icon={AlertTriangle}
          color="red"
          index={3}
        />
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Évolution des demandes"
          icon={TrendingUp}
          color="blue"
        >
          <TrendChart
            data={requestsTrend}
            lines={[
              { key: 'nouvelles', name: 'Nouvelles', color: '#6366F1' },
              { key: 'validees', name: 'Validées', color: '#22C55E' },
              { key: 'rejetees', name: 'Rejetées', color: '#EF4444' }
            ]}
          />
        </ChartCard>

        <ChartCard
          title="Types de demandes"
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
              placeholder="Rechercher une demande..."
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
              value={filter.priority}
              onChange={(e) => setFilter(f => ({ ...f, priority: e.target.value }))}
              className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            >
              <option value="all">Toutes les priorités</option>
              <option value="high">Haute</option>
              <option value="medium">Moyenne</option>
              <option value="low">Basse</option>
            </select>
            <select
              value={filter.status}
              onChange={(e) => setFilter(f => ({ ...f, status: e.target.value }))}
              className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="validated">Validées</option>
              <option value="rejected">Refusées</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Liste des demandes */}
      <DndContext collisionDetection={closestCenter}>
        <SortableContext items={requests.map(r => r.id)} strategy={verticalListSortingStrategy}>
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
                          {request.equipment.type} - {request.equipment.model}
                        </h3>
                        <Badge variant={getPriorityColor(request.priority)}>
                          Priorité {request.priority === 'high' ? 'haute' : request.priority === 'medium' ? 'moyenne' : 'basse'}
                        </Badge>
                        <Badge variant={getStatusColor(request.status)}>
                          {getStatusLabel(request.status)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        SN: {request.equipment.serialNumber}
                      </p>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="w-4 h-4 mr-1" />
                      {request.timeReceived}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <User className="w-4 h-4 mr-2" />
                        Patient: {request.patient.name}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <MapPin className="w-4 h-4 mr-2" />
                        {request.patient.address}
                      </div>
                    </div>
                    {request.scheduledFor && (
                      <div>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <Calendar className="w-4 h-4 mr-2" />
                          Planifié: {request.scheduledFor}
                        </div>
                      </div>
                    )}
                    {request.suggestedTech && (
                      <div>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <User className="w-4 h-4 mr-2" />
                          Technicien suggéré: {request.suggestedTech}
                        </div>
                      </div>
                    )}
                  </div>

                  {request.status === 'pending' && (
                    <div className="flex gap-2">
                      <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Valider
                      </button>
                      <button className="px-4 py-2 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        Reporter
                      </button>
                      <button className="px-4 py-2 text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors">
                        Refuser
                      </button>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}