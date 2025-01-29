import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, FileCheck, Clock, MapPin, Phone, Mail, User, TrendingUp, Activity, AlertTriangle, Users } from 'lucide-react';
import Card from '../components/ui/Card';
import { StatCard } from '../components/analytics/StatCard';
import { TrendChart } from '../components/analytics/TrendChart';
import { DistributionChart } from '../components/analytics/DistributionChart';
import { ChartCard } from '../components/analytics/ChartCard';

export default function Patients() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  // Données statistiques
  const stats = {
    totalPatients: 245,
    totalChange: '+12',
    nouveauxPatients: 18,
    nouveauxChange: '+5',
    enTraitement: 180,
    traitementChange: '+8',
    alertes: 5,
    alertesChange: '-2'
  };

  // Données pour les graphiques
  const patientsTrend = [
    { date: '01/03', actifs: 230, nouveaux: 8, termines: 5 },
    { date: '02/03', actifs: 235, nouveaux: 10, termines: 4 },
    { date: '03/03', actifs: 238, nouveaux: 7, termines: 6 },
    { date: '04/03', actifs: 240, nouveaux: 6, termines: 3 },
    { date: '05/03', actifs: 245, nouveaux: 8, termines: 4 }
  ];

  const pathologiesDistribution = [
    { name: 'SAOS', value: 45, color: '#6366F1' },
    { name: 'BPCO', value: 30, color: '#22C55E' },
    { name: 'Asthme', value: 15, color: '#F59E0B' },
    { name: 'Autres', value: 10, color: '#EC4899' }
  ];

  // ... (rest of your existing patients data)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Gestion des patients
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Liste des patients et suivi des traitements
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Nouveau patient
        </button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total patients"
          value={stats.totalPatients}
          change={stats.totalChange}
          icon={Users}
          color="blue"
          index={0}
        />
        <StatCard
          title="Nouveaux patients"
          value={stats.nouveauxPatients}
          change={stats.nouveauxChange}
          icon={Activity}
          color="green"
          index={1}
        />
        <StatCard
          title="En traitement"
          value={stats.enTraitement}
          change={stats.traitementChange}
          icon={Clock}
          color="yellow"
          index={2}
        />
        <StatCard
          title="Alertes"
          value={stats.alertes}
          change={stats.alertesChange}
          icon={AlertTriangle}
          color="red"
          index={3}
        />
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Évolution des patients"
          icon={TrendingUp}
          color="blue"
        >
          <TrendChart
            data={patientsTrend}
            lines={[
              { key: 'actifs', name: 'Patients actifs', color: '#6366F1' },
              { key: 'nouveaux', name: 'Nouveaux patients', color: '#22C55E' },
              { key: 'termines', name: 'Traitements terminés', color: '#F59E0B' }
            ]}
          />
        </ChartCard>

        <ChartCard
          title="Distribution des pathologies"
          icon={Activity}
          color="green"
        >
          <DistributionChart data={pathologiesDistribution} />
        </ChartCard>
      </div>

      {/* Reste du composant (recherche, liste des patients, etc.) */}
      {/* ... */}
    </div>
  );
}