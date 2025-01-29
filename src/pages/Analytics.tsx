import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Download, TrendingUp, Users, Clock, Activity, ChevronDown } from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import Card from '../components/ui/Card';

const Analytics = () => {
  const [period, setPeriod] = useState('month');

  // Données d'activité
  const activityData = [
    { date: '01/06', interventions: 65, prescriptions: 45, satisfaction: 92 },
    { date: '02/06', interventions: 72, prescriptions: 48, satisfaction: 91 },
    { date: '03/06', interventions: 68, prescriptions: 52, satisfaction: 93 },
    { date: '04/06', interventions: 75, prescriptions: 55, satisfaction: 94 },
    { date: '05/06', interventions: 80, prescriptions: 58, satisfaction: 92 },
    { date: '06/06', interventions: 85, prescriptions: 62, satisfaction: 95 },
    { date: '07/06', interventions: 88, prescriptions: 65, satisfaction: 96 }
  ];

  // Données de répartition
  const distributionData = [
    { name: 'CPAP', value: 45, color: '#6366F1' },
    { name: 'BPAP', value: 30, color: '#22C55E' },
    { name: 'VNI', value: 15, color: '#F59E0B' },
    { name: 'Autres', value: 10, color: '#EC4899' }
  ];

  // Données de performance
  const performanceData = [
    { name: 'Pierre', interventions: 28, satisfaction: 95, efficacite: 88 },
    { name: 'Marie', interventions: 32, satisfaction: 92, efficacite: 85 },
    { name: 'Jean', interventions: 25, satisfaction: 94, efficacite: 90 },
    { name: 'Sophie', interventions: 30, satisfaction: 93, efficacite: 87 }
  ];

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-2xl text-white">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-blue-100 mt-1">Vue d'ensemble des performances</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="bg-white/10 border-0 rounded-lg text-white placeholder-white/60 px-4 py-2"
          >
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
            <option value="quarter">Ce trimestre</option>
            <option value="year">Cette année</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            Exporter
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Satisfaction', value: '93%', change: '+2.5%', icon: TrendingUp, color: 'blue' },
          { title: 'Interventions', value: '284', change: '+12%', icon: Activity, color: 'green' },
          { title: 'Délai moyen', value: '24.5m', change: '-1.2m', icon: Clock, color: 'yellow' },
          { title: 'Techniciens', value: '8', change: '=', icon: Users, color: 'purple' }
        ].map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{kpi.title}</p>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                    {kpi.value}
                  </h3>
                  <p className={`text-sm mt-2 ${
                    kpi.change.startsWith('+') ? 'text-green-600' : 
                    kpi.change.startsWith('-') ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {kpi.change} vs mois dernier
                  </p>
                </div>
                <div className={`p-4 rounded-2xl bg-${kpi.color}-100 dark:bg-${kpi.color}-900/20`}>
                  <kpi.icon className={`w-8 h-8 text-${kpi.color}-600 dark:text-${kpi.color}-400`} />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Évolution de l'activité */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Évolution de l'activité
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

        {/* Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Distribution des interventions
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {distributionData.map((entry, index) => (
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

        {/* Performance des techniciens */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Performance des techniciens
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData} barSize={20}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
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
                  <Bar 
                    dataKey="interventions" 
                    fill="#6366F1" 
                    radius={[4, 4, 0, 0]}
                    name="Interventions"
                  />
                  <Bar 
                    dataKey="satisfaction" 
                    fill="#22C55E" 
                    radius={[4, 4, 0, 0]}
                    name="Satisfaction %"
                  />
                  <Bar 
                    dataKey="efficacite" 
                    fill="#F59E0B" 
                    radius={[4, 4, 0, 0]}
                    name="Efficacité %"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;