import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Truck, MessageSquare } from 'lucide-react';
import Card from '../../components/ui/Card';
import { DailyOverview } from './components/DailyOverview';
import { VehicleStock } from './components/VehicleStock';
import { InterventionMap } from './components/InterventionMap';
import { QuickActions } from './components/QuickActions';
import { CommunicationPanel } from './components/CommunicationPanel';

export default function TechnicianDashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-purple-600 to-indigo-600 p-6 rounded-2xl text-white">
        <div>
          <h1 className="text-2xl font-bold">Tableau de bord technicien</h1>
          <p className="text-purple-100 mt-1">Vue d'ensemble de vos activités</p>
        </div>
        <input
          type="date"
          value={selectedDate.toISOString().split('T')[0]}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
          className="bg-white/10 border-0 rounded-lg text-white placeholder-white/60 px-4 py-2"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vue d'ensemble quotidienne */}
        <div className="lg:col-span-2">
          <DailyOverview selectedDate={selectedDate} />
        </div>

        {/* Actions rapides */}
        <div>
          <QuickActions />
        </div>

        {/* Carte des interventions */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
              Carte des interventions
            </h2>
            <div className="h-[400px]">
              <InterventionMap />
            </div>
          </Card>
        </div>

        {/* Stock véhicule */}
        <div>
          <VehicleStock />
        </div>

        {/* Communication */}
        <div className="lg:col-span-3">
          <CommunicationPanel />
        </div>
      </div>
    </div>
  );
}