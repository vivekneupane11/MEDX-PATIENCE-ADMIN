import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import InterventionCard from './InterventionCard';

interface DraggableInterventionProps {
  id: string;
  type: string;
  time: string;
  patient: string;
  address: string;
  status: string;
}

const DraggableIntervention = (props: DraggableInterventionProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-2">
      <button
        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="w-4 h-4 text-gray-400" />
      </button>
      <div className="flex-1">
        <InterventionCard {...props} />
      </div>
    </div>
  );
};

export default DraggableIntervention;