import { motion } from 'framer-motion';
import { Clock, MapPin, User, CheckSquare, AlertTriangle } from 'lucide-react';
import Card from '../ui/Card';

export function CurrentIntervention() {
  const intervention = {
    type: 'Installation CPAP',
    patient: 'Marie Dubois',
    address: '8 Avenue des Lilas, Paris',
    startTime: '11:30',
    duration: '45 min',
    steps: [
      { id: 1, label: 'Vérification matériel', completed: true },
      { id: 2, label: 'Installation appareil', completed: true },
      { id: 3, label: 'Configuration', completed: false },
      { id: 4, label: 'Formation patient', completed: false },
      { id: 5, label: 'Documentation', completed: false }
    ]
  };

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
        <Clock className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
        Intervention en cours
      </h2>

      <div className="space-y-6">
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <h3 className="font-medium text-gray-900 dark:text-white mb-4">
            {intervention.type}
          </h3>

          <div className="space-y-3 text-sm">
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <User className="w-4 h-4 mr-2" />
              {intervention.patient}
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <MapPin className="w-4 h-4 mr-2" />
              {intervention.address}
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Clock className="w-4 h-4 mr-2" />
              Début : {intervention.startTime} (Durée estimée : {intervention.duration})
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
            Progression
          </h4>
          <div className="space-y-3">
            {intervention.steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  step.completed
                    ? 'bg-green-50 dark:bg-green-900/20'
                    : 'bg-gray-50 dark:bg-gray-800'
                }`}
              >
                <div className="flex items-center">
                  <CheckSquare className={`w-4 h-4 mr-2 ${
                    step.completed
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-400 dark:text-gray-500'
                  }`} />
                  <span className="text-sm text-gray-900 dark:text-white">
                    {step.label}
                  </span>
                </div>
                {!step.completed && index === intervention.steps.findIndex(s => !s.completed) && (
                  <span className="text-xs text-green-600 dark:text-green-400">
                    En cours
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Étape suivante
          </button>
          <button className="px-4 py-2 bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors">
            <AlertTriangle className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Card>
  );
}