import { motion } from 'framer-motion';
import { Phone, MessageSquare, AlertTriangle, FileText } from 'lucide-react';
import Card from '../../../components/ui/Card';

export function QuickActions() {
  const actions = [
    {
      icon: Phone,
      label: 'Contacter le coordinateur',
      color: 'blue'
    },
    {
      icon: AlertTriangle,
      label: 'Signaler un problème',
      color: 'red'
    },
    {
      icon: FileText,
      label: 'Rapport d\'intervention',
      color: 'green'
    },
    {
      icon: MessageSquare,
      label: 'Messages',
      color: 'purple'
    }
  ];

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Actions rapides
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <motion.button
            key={action.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-lg bg-${action.color}-50 dark:bg-${action.color}-900/20 hover:bg-${action.color}-100 dark:hover:bg-${action.color}-900/30 transition-colors`}
          >
            <action.icon className={`w-6 h-6 text-${action.color}-600 dark:text-${action.color}-400 mb-2`} />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {action.label}
            </span>
          </motion.button>
        ))}
      </div>
    </Card>
  );
}