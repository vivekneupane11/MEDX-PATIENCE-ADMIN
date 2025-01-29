import { motion } from 'framer-motion';
import { DndContext } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import RequestCard from './RequestCard';

const RequestList = () => {
  const requests = [
    {
      id: '1',
      priority: 'high',
      patient: 'Sophie Dubois',
      type: 'Installation CPAP',
      address: '15 Rue du Commerce, Paris',
      timeReceived: 'Il y a 10 min',
      stockStatus: 'available',
      suggestedTech: 'Pierre Martin'
    },
    {
      id: '2',
      priority: 'medium',
      patient: 'Jean Dupont',
      type: 'Maintenance BPAP',
      address: '8 Avenue Montaigne, Paris',
      timeReceived: 'Il y a 30 min',
      stockStatus: 'low',
      suggestedTech: 'Marie Lambert'
    }
  ];

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Nouvelles demandes
      </h2>
      <DndContext>
        <SortableContext items={requests.map(r => r.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {requests.map((request, index) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <RequestCard {...request} />
              </motion.div>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default RequestList;