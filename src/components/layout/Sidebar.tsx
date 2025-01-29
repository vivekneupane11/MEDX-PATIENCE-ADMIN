import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  ClipboardList, 
  Package2, 
  Users, 
  FileText, 
  MessageSquare, 
  Settings,
  Truck,
  Calendar,
  Book
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const location = useLocation();
  const { profile } = useAuth();

  const getMenuItems = () => {
    const baseItems = [
      { icon: MessageSquare, label: 'Communication', path: '/communication' },
      { icon: Settings, label: 'Paramètres', path: '/settings' }
    ];

    switch (profile?.role) {
      case 'coordinator':
        return [
          { icon: LayoutDashboard, label: 'Tableau de bord', path: '/dashboard' },
          { icon: Users, label: 'Patients', path: '/patients' },
          { icon: FileText, label: 'Ordonnances', path: '/prescriptions' },
          { icon: Package2, label: 'Matériel médical', path: '/medical-equipment' },
          { icon: ClipboardList, label: 'Demandes', path: '/requests' },
          { icon: Truck, label: 'Stock', path: '/inventory' },
          ...baseItems
        ];
      case 'technician':
        return [
          { icon: LayoutDashboard, label: 'Tableau de bord', path: '/technician/dashboard' },
          { icon: Calendar, label: 'Planning', path: '/technician/planning' },
          { icon: ClipboardList, label: 'Mes interventions', path: '/technician/requests' },
          { icon: Truck, label: 'Stock véhicule', path: '/technician/stock' },
          { icon: Book, label: 'Documents', path: '/technician/documents' },
          ...baseItems
        ];
      case 'doctor':
        return [
          { icon: Users, label: 'Mes patients', path: '/patients' },
          { icon: FileText, label: 'Ordonnances', path: '/prescriptions' },
          ...baseItems
        ];
      default:
        return baseItems;
    }
  };

  const isActiveRoute = (path: string) => {
    if (path === location.pathname) return true;
    if (path.startsWith('/technician/') && location.pathname.startsWith(path)) return true;
    return false;
  };

  const menuItems = getMenuItems();

  return (
    <aside className={`fixed top-0 left-0 z-40 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
      isOpen ? 'w-64' : 'w-0'
    }`}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            OxyNect
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {menuItems.map((item, index) => (
              <motion.li
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActiveRoute(item.path)
                      ? 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center text-white font-medium">
              {profile?.firstName?.[0]}{profile?.lastName?.[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {profile?.firstName} {profile?.lastName}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {profile?.role === 'coordinator' ? 'Coordinateur' :
                 profile?.role === 'technician' ? 'Technicien' :
                 profile?.role === 'doctor' ? 'Médecin' : ''}
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;