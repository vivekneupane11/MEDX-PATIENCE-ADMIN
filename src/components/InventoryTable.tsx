import { ArrowUpDown } from 'lucide-react';

const InventoryTable = () => {
  const items = [
    {
      id: 1,
      name: 'CPAP DreamStation',
      category: 'CPAP',
      status: 'Disponible',
      location: 'Paris',
      lastMaintenance: '2024-02-15'
    },
    {
      id: 2,
      name: 'BPAP AirCurve',
      category: 'BPAP',
      status: 'En utilisation',
      location: 'Lyon',
      lastMaintenance: '2024-01-20'
    }
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                Équipement
                <ArrowUpDown className="w-4 h-4" />
              </div>
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                Catégorie
                <ArrowUpDown className="w-4 h-4" />
              </div>
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                Statut
                <ArrowUpDown className="w-4 h-4" />
              </div>
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                Localisation
                <ArrowUpDown className="w-4 h-4" />
              </div>
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                Dernière maintenance
                <ArrowUpDown className="w-4 h-4" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr
              key={item.id}
              className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
            >
              <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                {item.name}
              </td>
              <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                {item.category}
              </td>
              <td className="px-4 py-3 text-sm">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.status === 'Disponible'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                }`}>
                  {item.status}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                {item.location}
              </td>
              <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                {item.lastMaintenance}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;