import { motion } from 'framer-motion';
import { MessageSquare, User, Clock } from 'lucide-react';
import Card from '../../../components/ui/Card';

export function CommunicationPanel() {
  const messages = [
    {
      id: 1,
      sender: 'Sophie Martin',
      role: 'Coordinateur',
      message: 'Nouvelle intervention urgente ajoutée pour demain matin',
      time: 'Il y a 10 min',
      unread: true
    },
    {
      id: 2,
      sender: 'Dr. Lambert',
      role: 'Médecin',
      message: 'Merci de vérifier les paramètres du CPAP de M. Dubois',
      time: 'Il y a 30 min',
      unread: false
    }
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <MessageSquare className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
          Messages récents
        </h2>
        <button className="text-sm text-purple-600 dark:text-purple-400 hover:underline">
          Voir tous les messages
        </button>
      </div>

      <div className="space-y-4">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-lg ${
              message.unread
                ? 'bg-purple-50 dark:bg-purple-900/20'
                : 'bg-gray-50 dark:bg-gray-800'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {message.sender}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                    {message.role}
                  </span>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Clock className="w-4 h-4 mr-1" />
                {message.time}
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              {message.message}
            </p>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}