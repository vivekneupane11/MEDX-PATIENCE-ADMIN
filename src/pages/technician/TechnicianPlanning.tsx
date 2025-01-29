import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  List, 
  Grid, 
  Clock,
  MapPin,
  User,
  Wrench,
  Package2
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

export default function TechnicianPlanning() {
  const [view, setView] = useState<'calendar' | 'list'>('calendar');
  const [currentDate, setCurrentDate] = useState(new Date());

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() + 7);
    }
    setCurrentDate(newDate);
  };

  // Statistiques rapides
  const stats = [
    { 
      icon: Clock,
      label: "Aujourd'hui", 
      value: '3', 
      type: 'interventions',
      color: 'purple'
    },
    { 
      icon: Package2,
      label: 'Cette semaine', 
      value: '12', 
      type: 'interventions',
      color: 'blue'
    },
    { 
      icon: Wrench,
      label: 'Temps moyen', 
      value: '1h30', 
      type: 'duration',
      color: 'green'
    }
  ];

  // Données des interventions
  const interventions = [
    {
      id: 1,
      time: '09:00',
      type: 'Installation CPAP',
      patient: 'Jean Martin',
      address: '15 Rue du Commerce, Paris',
      status: 'completed'
    },
    {
      id: 2,
      time: '11:30',
      type: 'Maintenance BPAP',
      patient: 'Marie Dubois',
      address: '8 Avenue des Lilas, Paris',
      status: 'current'
    },
    {
      id: 3,
      time: '14:00',
      type: 'Installation VNI',
      patient: 'Pierre Lambert',
      address: '23 Rue Victor Hugo, Paris',
      status: 'upcoming'
    }
  ];

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-purple-600 to-indigo-600 p-6 rounded-2xl text-white">
        <div>
          <h1 className="text-2xl font-bold">Planning</h1>
          <p className="text-purple-100 mt-1">Organisation de vos interventions</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-white/10 rounded-lg p-1">
            <button
              onClick={() => setView('calendar')}
              className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-2 ${
                view === 'calendar'
                  ? 'bg-white text-purple-600'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <Grid className="w-4 h-4" />
              <span className="hidden sm:inline">Calendrier</span>
            </button>
            <button
              onClick={() => setView('list')}
              className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-2 ${
                view === 'list'
                  ? 'bg-white text-purple-600'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <List className="w-4 h-4" />
              <span className="hidden sm:inline">Liste</span>
            </button>
          </div>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900/20`}>
                    <stat.icon className={`w-5 h-5 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                      {stat.value}
                    </p>
                  </div>
                </div>
                <Badge variant={
                  stat.type === 'interventions' ? 'purple' : 
                  stat.type === 'duration' ? 'success' : 'default'
                }>
                  {stat.type === 'interventions' ? 'Interventions' : 'Durée'}
                </Badge>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Navigation du calendrier */}
      <Card className="p-4">
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigateDate('prev')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {currentDate.toLocaleDateString('fr-FR', { 
              month: 'long',
              year: 'numeric'
            })}
          </h2>
          <button
            onClick={() => navigateDate('next')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </Card>

      {/* Liste des interventions */}
      <Card className="p-6">
        <div className="space-y-4">
          {interventions.map((intervention, index) => (
            <motion.div
              key={intervention.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border ${
                intervention.status === 'completed'
                  ? 'bg-gray-50 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700'
                  : intervention.status === 'current'
                  ? 'bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800'
                  : 'bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {intervention.time}
                  </span>
                </div>
                <Badge variant={
                  intervention.status === 'completed' ? 'success' :
                  intervention.status === 'current' ? 'purple' : 'default'
                }>
                  {intervention.status === 'completed' ? 'Terminé' :
                   intervention.status === 'current' ? 'En cours' : 'À venir'}
                </Badge>
              </div>

              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                {intervention.type}
              </h3>

              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  {intervention.patient}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {intervention.address}
                </div>
              </div>

              {intervention.status === 'upcoming' && (
                <button className="mt-4 w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Commencer l'intervention
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
}