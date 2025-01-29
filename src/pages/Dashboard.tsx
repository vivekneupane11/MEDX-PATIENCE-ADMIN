import { motion } from 'framer-motion';
import { MapPin, Clock, Users, AlertTriangle, Activity, TrendingUp, Package2 } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Card from '../components/ui/Card';
import Map from '../components/Map';
import InterventionTimeline from '../components/InterventionTimeline';
import AlertPanel from '../components/AlertPanel';
import RequestList from '../components/RequestList';
import DashboardStats from '../components/DashboardStats';
import { useDashboardData } from '../hooks/useDashboardData';

const Dashboard = () => {
  const { stats, loading } = useDashboardData();

  if (loading) {
    return <div>Chargement...</div>;
  }

  // Données pour les graphiques
  const activityData = [
    { date: '01/03', interventions: 12, prescriptions: 8 },
    { date: '02/03', interventions: 15, prescriptions: 10 },
    { date: '03/03', interventions: 13, prescriptions: 7 },
    { date: '04/03', interventions: 18, prescriptions: 12 },
    { date: '05/03', interventions: 16, prescriptions: 9 },
    { date: '06/03', interventions: 20, prescriptions: 15 },
    { date: '07/03', interventions: 22, prescriptions: 14 }
  ];

  const equipmentDistribution = [
    { name: 'CPAP', value: 45, color: '#6366F1' },
    { name: 'BPAP', value: 30, color: '#22C55E' },
    { name: 'VNI', value: 15, color: '#F59E0B' },
    { name: 'Autres', value: 10, color: '#EC4899' }
  ];

  return (
    <div className="space-y-6">
      {/* En-tête avec gradient */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-2xl text-white">
        <div>
          <h1 className="text-2xl font-bold">Tableau de bord</h1>
          <p className="text-blue-100 mt-1">Vue d'ensemble des activités</p>
        </div>
        <select className="bg-white/10 border-0 rounded-lg text-white placeholder-white/60 px-4 py-2">
          <option value="today">Aujourd'hui</option>
          <option value="week">Cette semaine</option>
          <option value="month">Ce mois</option>
        </select>
      </div>

      {/* KPIs */}
      <DashboardStats stats={stats} />

      {/* Graphiques et carte */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Activité journalière
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData}>
                  <defs>
                    <linearGradient id="interventionsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="prescriptionsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="date" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="interventions" 
                    stroke="#6366F1" 
                    fill="url(#interventionsGradient)" 
                    name="Interventions"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="prescriptions" 
                    stroke="#22C55E" 
                    fill="url(#prescriptionsGradient)" 
                    name="Prescriptions"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Distribution équipements
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={equipmentDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {equipmentDistribution.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color}
                        stroke="none"
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend 
                    verticalAlign="middle" 
                    align="right"
                    layout="vertical"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Carte des interventions
            </h3>
            <Map />
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6">
            <AlertPanel />
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-3"
        >
          <Card className="p-6">
            <InterventionTimeline />
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;