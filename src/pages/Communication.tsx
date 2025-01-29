import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Search, Mail, MessageSquare, Phone, Clock, User, CheckCheck, Filter } from 'lucide-react';
import Card from '../components/ui/Card';

const Communication = () => {
  const [activeTab, setActiveTab] = useState<'internal' | 'patients'>('internal');
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const internalMessages = [
    {
      id: 1,
      sender: 'Pierre Martin',
      role: 'Technicien',
      avatar: 'PM',
      message: 'Installation CPAP terminée chez M. Dubois',
      time: '14:30',
      status: 'read'
    },
    {
      id: 2,
      sender: 'Dr. Lambert',
      role: 'Médecin',
      avatar: 'DL',
      message: 'Merci de programmer une visite de contrôle pour Mme Martin',
      time: '13:45',
      status: 'unread'
    }
  ];

  const patientMessages = [
    {
      id: 1,
      patient: 'Jean Dupont',
      type: 'email',
      subject: 'Rappel rendez-vous maintenance',
      status: 'sent',
      date: '15/03/2024'
    },
    {
      id: 2,
      patient: 'Marie Lambert',
      type: 'sms',
      subject: 'Confirmation installation',
      status: 'draft',
      date: '15/03/2024'
    }
  ];

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-purple-600 to-indigo-600 p-6 rounded-2xl text-white">
        <div>
          <h1 className="text-2xl font-bold">Communication</h1>
          <p className="text-purple-100 mt-1">Gérez vos échanges professionnels et patients</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('internal')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'internal' 
                ? 'bg-white text-purple-600' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <MessageSquare className="w-5 h-5 inline-block mr-2" />
            Chat interne
          </button>
          <button
            onClick={() => setActiveTab('patients')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'patients' 
                ? 'bg-white text-purple-600' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Mail className="w-5 h-5 inline-block mr-2" />
            Communication patients
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Section principale */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            {activeTab === 'internal' ? (
              <div className="h-[600px] flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Rechercher une conversation..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg"
                    />
                  </div>
                  <select className="bg-gray-100 dark:bg-gray-700 border-0 rounded-lg px-4 py-2">
                    <option value="all">Tous</option>
                    <option value="technicians">Techniciens</option>
                    <option value="doctors">Médecins</option>
                  </select>
                </div>

                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {internalMessages.map((msg, index) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-lg ${
                        msg.status === 'unread' 
                          ? 'bg-purple-50 dark:bg-purple-900/20' 
                          : 'bg-gray-50 dark:bg-gray-800'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-medium">
                          {msg.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-gray-900 dark:text-white">
                                {msg.sender}
                              </h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {msg.role}
                              </p>
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {msg.time}
                            </span>
                          </div>
                          <p className="mt-2 text-gray-600 dark:text-gray-300">
                            {msg.message}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Écrivez votre message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full pl-4 pr-12 py-3 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg"
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900/20 rounded-full">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-[600px] flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Rechercher un patient..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg"
                    />
                  </div>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    Nouveau message
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                  <div className="space-y-4">
                    {patientMessages.map((msg, index) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 border dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${
                              msg.type === 'email' 
                                ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/20' 
                                : 'bg-green-100 text-green-600 dark:bg-green-900/20'
                            }`}>
                              {msg.type === 'email' ? <Mail className="w-5 h-5" /> : <Phone className="w-5 h-5" />}
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900 dark:text-white">
                                {msg.patient}
                              </h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {msg.subject}
                              </p>
                            </div>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            msg.status === 'sent'
                              ? 'bg-green-100 text-green-600 dark:bg-green-900/20'
                              : 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20'
                          }`}>
                            {msg.status === 'sent' ? 'Envoyé' : 'Brouillon'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {msg.date}
                          </span>
                          <div className="flex gap-2">
                            <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                              Voir
                            </button>
                            <button className="px-3 py-1 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                              Répondre
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Panneau latéral */}
        <div className="space-y-6">
          {activeTab === 'internal' ? (
            <>
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Contacts en ligne
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-medium">
                        PM
                      </div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Pierre Martin</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Technicien</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-medium">
                        DL
                      </div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-gray-300 rounded-full border-2 border-white dark:border-gray-800"></div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Dr. Lambert</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Médecin</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Messages non lus
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="flex items-center">
                      <MessageSquare className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        Techniciens
                      </span>
                    </div>
                    <span className="text-xs text-purple-600 dark:text-purple-400">3</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="flex items-center">
                      <MessageSquare className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        Médecins
                      </span>
                    </div>
                    <span className="text-xs text-purple-600 dark:text-purple-400">2</span>
                  </div>
                </div>
              </Card>
            </>
          ) : (
            <>
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Modèles de messages
                </h2>
                <div className="space-y-3">
                  <button className="w-full p-3 text-left bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <h3 className="font-medium text-gray-900 dark:text-white">Rappel RDV</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Pour maintenance</p>
                  </button>
                  <button className="w-full p-3 text-left bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <h3 className="font-medium text-gray-900 dark:text-white">Confirmation</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Installation équipement</p>
                  </button>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Statistiques
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Messages envoyés</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">45</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Taux d'ouverture</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">92%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Temps de réponse</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">2h</span>
                  </div>
                </div>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Communication;