import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, FileCheck, Clock, AlertTriangle, Activity, TrendingUp, Package2 } from 'lucide-react';
import Card from '../components/ui/Card';
import { StatCard } from '../components/analytics/StatCard';
import { TrendChart } from '../components/analytics/TrendChart';
import { DistributionChart } from '../components/analytics/DistributionChart';
import { BarChart } from '../components/analytics/BarChart';
import { ChartCard } from '../components/analytics/ChartCard';

export default function Prescriptions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState({
    status: 'all',
    priority: 'all',
    doctor: 'all'
  });

  // Données statistiques
  const stats = {
    totalPrescriptions: 156,
    totalChange: '+15',
    enAttente: 12,
    attenteChange: '-3',
    validees: 140,
    valideesChange: '+18',
    urgentes: 4,
    urgentesChange: '+2'
  };

  // Données pour les graphiques
  const prescriptionsTrend = [
    { date: '01/03', nouvelles: 12, validees: 10, rejetees: 1 },
    { date: '02/03', nouvelles: 15, validees: 13, rejetees: 2 },
    { date: '03/03', nouvelles: 10, validees: 12, rejetees: 1 },
    { date: '04/03', nouvelles: 18, validees: 15, rejetees: 2 },
    { date: '05/03', nouvelles: 14, validees: 13, rejetees: 1 }
  ];

  const equipementDistribution = [
    { name: 'CPAP', value: 45, color: '#6366F1' },
    { name: 'BiPAP', value: 30, color: '#22C55E' },
    { name: 'VNI', value: 15, color: '#F59E0B' },
    { name: 'Autres', value: 10, color: '#EC4899' }
  ];

  const performanceMedecins = [
    { name: 'Dr. Martin', prescriptions: 45, validationTime: 24, satisfaction: 95 },
    { name: 'Dr. Dubois', prescriptions: 38, validationTime: 18, satisfaction: 98 },
    { name: 'Dr. Lambert', prescriptions: 42, validationTime: 22, satisfaction: 96 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Gestion des ordonnances
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Suivi et validation des prescriptions
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Nouvelle ordonnance
        </button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total prescriptions"
          value={stats.totalPrescriptions}
          change={stats.totalChange}
          icon={FileCheck}
          color="blue"
          index={0}
        />
        <StatCard
          title="En attente"
          value={stats.enAttente}
          change={stats.attenteChange}
          icon={Clock}
          color="yellow"
          index={1}
        />
        <StatCard
          title="Validées"
          value={stats.validees}
          change={stats.valideesChange}
          icon={Activity}
          color="green"
          index={2}
        />
        <StatCard
          title="Urgentes"
          value={stats.urgentes}
          change={stats.urgentesChange}
          icon={AlertTriangle}
          color="red"
          index={3}
        />
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Évolution des prescriptions"
          icon={TrendingUp}
          color="blue"
        >
          <TrendChart
            data={prescriptionsTrend}
            lines={[
              { key: 'nouvelles', name: 'Nouvelles', color: '#6366F1' },
              { key: 'validees', name: 'Validées', color: '#22C55E' },
              { key: 'rejetees', name: 'Rejetées', color: '#EF4444' }
            ]}
          />
        </ChartCard>

        <ChartCard
          title="Distribution équipements"
          icon={Package2}
          color="purple"
        >
          <DistributionChart data={equipementDistribution} />
        </ChartCard>

        <ChartCard
          title="Performance médecins"
          icon={Activity}
          color="green"
          className="lg:col-span-2"
        >
          <BarChart
            data={performanceMedecins}
            series={[
              { key: 'prescriptions', name: 'Prescriptions', color: '#6366F1' },
              { key: 'validationTime', name: 'Temps validation (min)', color: '#22C55E' },
              { key: 'satisfaction', name: 'Satisfaction (%)', color: '#F59E0B' }
            ]}
          />
        </ChartCard>
      </div>

      {/* Reste du composant (recherche, liste des prescriptions, etc.) */}
      {/* ... */}
    </div>
  );
}