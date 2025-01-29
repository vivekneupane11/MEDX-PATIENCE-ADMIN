import { useState, useEffect } from 'react';

interface DashboardStats {
  prescriptionsEnAttente: number;
  prescriptionsChange: number;
  interventionsDuJour: number;
  interventionsChange: number;
  techniciensActifs: number;
  techniciensChange: number;
  alertesStock: number;
  alertesChange: number;
}

export const useDashboardData = () => {
  const [stats, setStats] = useState<DashboardStats>({
    prescriptionsEnAttente: 12,
    prescriptionsChange: 8,
    interventionsDuJour: 24,
    interventionsChange: 2,
    techniciensActifs: 8,
    techniciensChange: 0,
    alertesStock: 3,
    alertesChange: -2
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => {
          const timeoutId = window.setTimeout(resolve, 1000);
          return () => window.clearTimeout(timeoutId);
        });
        
        // In a real app, we would fetch data here
        setLoading(false);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { stats, loading };
};