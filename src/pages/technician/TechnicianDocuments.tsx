import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Star, Download, Book, FileText, ClipboardList } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

interface Document {
  id: string;
  title: string;
  description: string;
  category: 'manuals' | 'guides' | 'forms';
  dateAdded: string;
  isFavorite: boolean;
  downloadUrl: string;
  fileSize: string;
  version?: string;
}

export default function TechnicianDocuments() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'manuals' | 'guides' | 'forms'>('manuals');
  const [favorites, setFavorites] = useState<string[]>([]);

  const documents: Document[] = [
    // Manuels techniques
    {
      id: 'cpap-ds2',
      title: 'Manuel CPAP DreamStation 2',
      description: `Manuel technique complet pour l'installation, la configuration et la maintenance du CPAP DreamStation 2. Inclut les spécifications techniques et les procédures de dépannage.`,
      category: 'manuals',
      dateAdded: '2024-03-15',
      isFavorite: false,
      downloadUrl: '/docs/manuals/dreamstation2.pdf',
      fileSize: '2.4 MB',
      version: 'v2.1'
    },
    {
      id: 'bipap-ac10',
      title: 'Manuel BiPAP AirCurve 10',
      description: `Documentation technique détaillée du BiPAP AirCurve 10, incluant les paramètres avancés et les protocoles de maintenance.`,
      category: 'manuals',
      dateAdded: '2024-03-10',
      isFavorite: false,
      downloadUrl: '/docs/manuals/aircurve10.pdf',
      fileSize: '3.1 MB',
      version: 'v3.0'
    },
    {
      id: 'vni-lumis',
      title: 'Manuel VNI Lumis',
      description: `Guide technique complet pour le ventilateur Lumis, couvrant l'installation, la configuration et le dépannage.`,
      category: 'manuals',
      dateAdded: '2024-03-05',
      isFavorite: false,
      downloadUrl: '/docs/manuals/lumis.pdf',
      fileSize: '2.8 MB',
      version: 'v1.5'
    },
    {
      id: 'humidair',
      title: 'Manuel Humidificateur HumidAir',
      description: `Spécifications techniques et guide de maintenance pour l'humidificateur HumidAir.`,
      category: 'manuals',
      dateAdded: '2024-03-01',
      isFavorite: false,
      downloadUrl: '/docs/manuals/humidair.pdf',
      fileSize: '1.5 MB',
      version: 'v2.0'
    },

    // Guides pratiques
    {
      id: 'cpap-install',
      title: `Guide d'installation CPAP`,
      description: `Procédures détaillées pour l'installation et la configuration initiale des appareils CPAP.`,
      category: 'guides',
      dateAdded: '2024-03-14',
      isFavorite: false,
      downloadUrl: '/docs/guides/cpap-installation.pdf',
      fileSize: '1.2 MB'
    },
    {
      id: 'troubleshoot',
      title: 'Guide de dépannage rapide',
      description: 'Solutions aux problèmes courants et procédures de diagnostic pour tous les appareils.',
      category: 'guides',
      dateAdded: '2024-03-12',
      isFavorite: false,
      downloadUrl: '/docs/guides/troubleshooting.pdf',
      fileSize: '850 KB'
    },
    {
      id: 'hygiene',
      title: `Guide d'hygiène et désinfection`,
      description: 'Protocoles de nettoyage et de désinfection pour tous les équipements respiratoires.',
      category: 'guides',
      dateAdded: '2024-03-08',
      isFavorite: false,
      downloadUrl: '/docs/guides/hygiene.pdf',
      fileSize: '1.1 MB'
    },
    {
      id: 'masks',
      title: 'Guide des masques respiratoires',
      description: `Catalogue des masques disponibles avec guides de taille et instructions d'ajustement.`,
      category: 'guides',
      dateAdded: '2024-03-06',
      isFavorite: false,
      downloadUrl: '/docs/guides/masks.pdf',
      fileSize: '2.2 MB'
    },

    // Formulaires
    {
      id: 'install-form',
      title: `Formulaire d'installation`,
      description: `Document à remplir lors de l'installation d'un nouvel équipement chez un patient.`,
      category: 'forms',
      dateAdded: '2024-03-13',
      isFavorite: false,
      downloadUrl: '/docs/forms/installation.pdf',
      fileSize: '450 KB'
    },
    {
      id: 'maintenance-report',
      title: 'Rapport de maintenance',
      description: 'Formulaire de rapport détaillé pour les interventions de maintenance préventive et corrective.',
      category: 'forms',
      dateAdded: '2024-03-11',
      isFavorite: false,
      downloadUrl: '/docs/forms/maintenance.pdf',
      fileSize: '380 KB'
    },
    {
      id: 'intervention-sheet',
      title: `Fiche d'intervention`,
      description: 'Document de suivi des interventions techniques chez les patients.',
      category: 'forms',
      dateAdded: '2024-03-09',
      isFavorite: false,
      downloadUrl: '/docs/forms/intervention.pdf',
      fileSize: '320 KB'
    },
    {
      id: 'transfer-form',
      title: 'Formulaire de transfert',
      description: `Document officiel pour le transfert d'équipement entre patients ou établissements.`,
      category: 'forms',
      dateAdded: '2024-03-07',
      isFavorite: false,
      downloadUrl: '/docs/forms/transfer.pdf',
      fileSize: '290 KB'
    }
  ];

  const handleToggleFavorite = (docId: string) => {
    setFavorites(prev => 
      prev.includes(docId) 
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    );
  };

  const filteredDocuments = documents.filter(doc => 
    (activeTab === doc.category) &&
    (doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     doc.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-purple-600 to-indigo-600 p-6 rounded-2xl text-white">
        <div>
          <h1 className="text-2xl font-bold">Documents</h1>
          <p className="text-purple-100 mt-1">Documentation technique et formulaires</p>
        </div>
      </div>

      {/* Filtres */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un document..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('manuals')}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                activeTab === 'manuals'
                  ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <Book className="w-4 h-4" />
              <span className="hidden sm:inline">Manuels</span>
            </button>
            <button
              onClick={() => setActiveTab('guides')}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                activeTab === 'guides'
                  ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Guides</span>
            </button>
            <button
              onClick={() => setActiveTab('forms')}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                activeTab === 'forms'
                  ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <ClipboardList className="w-4 h-4" />
              <span className="hidden sm:inline">Formulaires</span>
            </button>
          </div>
        </div>
      </Card>

      {/* Liste des documents */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.map((doc, index) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card hover className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2">
                    {doc.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-3">
                    {doc.description}
                  </p>
                </div>
                <button
                  onClick={() => handleToggleFavorite(doc.id)}
                  className="ml-4 text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  <Star className={`h-5 w-5 ${favorites.includes(doc.id) ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                </button>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                <span>{new Date(doc.dateAdded).toLocaleDateString()}</span>
                <span>{doc.fileSize}</span>
              </div>

              {doc.version && (
                <div className="mb-4">
                  <Badge variant="purple" className="text-xs">
                    Version {doc.version}
                  </Badge>
                </div>
              )}

              <a
                href={doc.downloadUrl}
                download
                className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Télécharger</span>
              </a>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}