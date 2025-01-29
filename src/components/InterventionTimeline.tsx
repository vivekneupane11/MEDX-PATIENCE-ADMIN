import { motion } from 'framer-motion';
import { Clock, MapPin, User } from 'lucide-react';

const InterventionTimeline = () => {
  const interventions = [
    {
      id: 1,
      time: '09:00',
      type: 'Installation CPAP',
      patient: 'Jean Martin',
      address: '123 Rue de Paris',
      status: 'Terminé'
    },
    {
      id: 2,
      time: '10:30',
      type: 'Maintenance BPAP',
      patient: 'Marie Lambert',
      address: '45 Avenue Victor Hugo',
      status: 'En cours'
    }
  ];

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Planning des interventions
      </h2>
      <div className="space-y-4">
        {interventions.map((intervention, index) => (
          <motion.div
            key={intervention.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-4 border-l-2 border-blue-500 dark:border-blue-400"
          >
            <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-blue-500 dark:bg-blue-400" />
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  {intervention.type}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {intervention.time}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <User className="w-4 h-4 mr-2" />
                  {intervention.patient}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <MapPin className="w-4 h-4 mr-2" />
                  {intervention.address}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <Clock className="w-4 h-4 mr-2" />
                  {intervention.status}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default InterventionTimeline;