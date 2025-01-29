import { motion } from 'framer-motion';
import { Package2, AlertTriangle, TrendingDown, Truck } from 'lucide-react';
import { StatCard } from '../../../components/analytics/StatCard';

export function StockStats() {
  const stats = {
    totalItems: 45,
    lowStock: 3,
    criticalStock: 1,
    lastUpdate: '2h'
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total équipements"
        value={stats.totalItems}
        icon={Package2}
        color="blue"
        index={0}
      />
      <StatCard
        title="Stock faible"
        value={stats.lowStock}
        icon={TrendingDown}
        color="yellow"
        index={1}
      />
      <StatCard
        title="Stock critique"
        value={stats.criticalStock}
        icon={AlertTriangle}
        color="red"
        index={2}
      />
      <StatCard
        title="Dernière mise à jour"
        value={stats.lastUpdate}
        icon={Truck}
        color="green"
        index={3}
      />
    </div>
  );
}