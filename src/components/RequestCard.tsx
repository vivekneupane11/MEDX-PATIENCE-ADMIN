import { Clock, User, MapPin, AlertTriangle, Stethoscope } from 'lucide-react';

interface RequestCardProps {
  priority: 'high' | 'medium' | 'low';
  patient: string;
  type: string;
  address: string;
  timeReceived: string;
  stockStatus: 'available' | 'low' | 'critical';
  suggestedTech?: string;
  doctor: string;
  status: 'pending' | 'validated' | 'rejected';
}

const RequestCard = ({
  priority,
  patient,
  type,
  address,
  timeReceived,
  stockStatus,
  suggestedTech,
  doctor,
  status
}: RequestCardProps) => {
  const priorityColors = {
    high: 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800',
    medium: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800',
    low: 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
  };

  const stockStatusColors = {
    available: 'text-green-600',
    low: 'text-yellow-600',
    critical: 'text-red-600'
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    validated: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    rejected: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
  };

  return (
    <div className={`border rounded-lg p-4 ${priorityColors[priority]}`}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-900 dark:text-white">{type}</span>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[status]}`}>
              {status === 'pending' ? 'En attente' : status === 'validated' ? 'Validée' : 'Refusée'}
            </span>
          </div>
          <div className="flex items-center mt-1">
            <Clock className="w-4 h-4 mr-1 text-gray-500" />
            <span className="text-xs text-gray-500">{timeReceived}</span>
          </div>
        </div>
        <div className="flex items-center">
          <AlertTriangle className={`w-4 h-4 mr-1 ${stockStatusColors[stockStatus]}`} />
          <span className={`text-xs ${stockStatusColors[stockStatus]}`}>
            {stockStatus === 'available' ? 'Stock OK' : `Stock ${stockStatus}`}
          </span>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
          <User className="w-4 h-4 mr-2" />
          {patient}
        </div>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
          <Stethoscope className="w-4 h-4 mr-2" />
          {doctor}
        </div>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
          <MapPin className="w-4 h-4 mr-2" />
          {address}
        </div>
      </div>

      {suggestedTech && (
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Technicien suggéré : {suggestedTech}
          </span>
        </div>
      )}

      <div className="mt-3 flex space-x-2">
        <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Valider
        </button>
        <button className="px-3 py-1 text-sm bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
          Reporter
        </button>
        <button className="px-3 py-1 text-sm bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400 rounded-md hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors">
          Refuser
        </button>
      </div>
    </div>
  );
};

export default RequestCard;