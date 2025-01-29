import { motion } from 'framer-motion';
import { Clock, Activity, Users, AlertTriangle } from 'lucide-react';
import Card from './ui/Card';

interface DashboardStatsProps {
  stats: {
    prescriptionsEnAttente: number;
    prescriptionsChange: number;
    interventionsDuJour: number;
    interventionsChange: number;
    techniciensActifs: number;
    techniciensChange: number;
    alertesStock: number;
    alertesChange: number;
  };
}

const DashboardStats = ({ stats }: DashboardStatsProps) => {
  const items = [
    {
      title: 'Prescriptions en attente',
      value: stats.prescriptionsEnAttente,
      change: `${stats.prescriptionsChange > 0 ? '+' : ''}${stats.prescriptionsChange}%`,
      icon: Clock,
      color: 'blue'
    },
    {
      title: 'Interventions du jour',
      value: stats.interventionsDuJour,
      change: `${stats.interventionsChange > 0 ? '+' : ''}${stats.interventionsChange}%`,
      icon: Activity,
      color: 'green'
    },
    {
      title: 'Techniciens actifs',
      value: stats.techniciensActifs,
      change: `${stats.techniciensChange > 0 ? '+' : ''}${stats.techniciensChange}%`,
      icon: Users,
      color: 'purple'
    },
    {
      title: 'Alertes stock',
      value: stats.alertesStock,
      change: `${stats.alertesChange > 0 ? '+' : ''}${stats.alertesChange}%`,
      icon: AlertTriangle,
      color: 'red'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.title}</p>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                  {item.value}
                </h3>
                <p className={`text-sm mt-2 ${
                  parseFloat(item.change) > 0 ? 'text-green-600' : 
                  parseFloat(item.change) < 0 ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {item.change} vs période préc.
                </p>
              </div>
              <div className={`p-4 rounded-2xl bg-${item.color}-100 dark:bg-${item.color}-900/20`}>
                <item.icon className={`w-8 h-8 text-${item.color}-600 dark:text-${item.color}-400`} />
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardStats;