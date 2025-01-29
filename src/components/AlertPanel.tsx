import { motion } from 'framer-motion';
import { AlertTriangle, Clock } from 'lucide-react';

const AlertPanel = () => {
  const alerts = [
    {
      id: 1,
      type: 'stock',
      message: 'Stock critique de masques CPAP',
      time: '10 min'
    },
    {
      id: 2,
      type: 'intervention',
      message: 'Retard intervention #4532',
      time: '25 min'
    }
  ];

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Alertes prioritaires
      </h2>
      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {alert.message}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Clock className="w-4 h-4 mr-1" />
              {alert.time}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AlertPanel;