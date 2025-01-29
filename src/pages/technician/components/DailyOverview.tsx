import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, User, CheckCircle, AlertTriangle } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';

interface DailyOverviewProps {
  selectedDate: Date;
}

export function DailyOverview({ selectedDate }: DailyOverviewProps) {
  const interventions = [
    {
      id: 1,
      time: '09:00',
      patient: 'Jean Martin',
      address: '15 Rue du Commerce, Paris',
      type: 'Installation CPAP',
      status: 'completed',
      priority: 'normal'
    },
    {
      id: 2,
      time: '11:30',
      patient: 'Marie Dubois',
      address: '8 Avenue des Lilas, Paris',
      type: 'Maintenance BPAP',
      status: 'current',
      priority: 'high'
    },
    {
      id: 3,
      time: '14:00',
      patient: 'Pierre Lambert',
      address: '23 Rue Victor Hugo, Paris',
      type: 'Installation VNI',
      status: 'upcoming',
      priority: 'normal'
    }
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="danger">Urgent</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
          Planning du jour
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {selectedDate.toLocaleDateString('fr-FR', { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'long' 
          })}
        </span>
      </div>

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
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {intervention.time}
                </span>
                {getPriorityBadge(intervention.priority)}
              </div>
              {intervention.status === 'completed' && (
                <CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              )}
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

            {intervention.status === 'current' && (
              <button className="mt-4 w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Commencer l'intervention
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </Card>
  );
}