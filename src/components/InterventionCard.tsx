import { MapPin, Clock, User } from 'lucide-react';

interface InterventionCardProps {
  type: string;
  time: string;
  patient: string;
  address: string;
  status: string;
}

const InterventionCard = ({ type, time, patient, address, status }: InterventionCardProps) => {
  return (
    <div className="border dark:border-gray-700 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{type}</span>
        <span className="text-xs text-gray-500 dark:text-gray-400">{time}</span>
      </div>
      <div className="space-y-2">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
          <User className="w-4 h-4 mr-2" />
          {patient}
        </div>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
          <MapPin className="w-4 h-4 mr-2" />
          {address}
        </div>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
          <Clock className="w-4 h-4 mr-2" />
          {status}
        </div>
      </div>
    </div>
  );
};

export default InterventionCard;