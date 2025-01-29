import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, CheckCircle } from 'lucide-react';
import Card from '../ui/Card';

export function DailyOverview() {
  const interventions = [
    {
      id: 1,
      time: '09:00',
      patient: 'Jean Martin',
      address: '15 Rue du Commerce, Paris',
      type: 'Installation CPAP',
      status: 'completed'
    },
    {
      id: 2,
      time: '11:30',
      patient: 'Marie Dubois',
      address: '8 Avenue des Lilas, Paris',
      type: 'Maintenance BPAP',
      status: 'current'
    },
    {
      id: 3,
      time: '14:00',
      patient: 'Pierre Lambert',
      address: '23 Rue Victor Hugo, Paris',
      type: 'Installation VNI',
      status: 'upcoming'
    }
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
          Planning du jour
        </h2>
        <button className="text-sm text-green-600 dark:text-green-400 hover:underline">
          Voir tout
        </button>
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
                ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
                : 'bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {intervention.time}
                </span>
              </div>
              {intervention.status === 'completed' && (
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              )}
            </div>

            <h3 className="font-medium text-gray-900 dark:text-white mb-2">
              {intervention.type}
            </h3>

            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                {intervention.address}
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 mr-2 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs">
                  {intervention.patient[0]}
                </div>
                {intervention.patient}
              </div>
            </div>

            {intervention.status === 'current' && (
              <button className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Commencer l'intervention
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </Card>
  );
}