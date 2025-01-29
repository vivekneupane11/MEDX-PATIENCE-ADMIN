import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Lock, User, Globe, Palette, Moon, Sun, Mail } from 'lucide-react';
import Card from '../components/ui/Card';

const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    desktop: true,
    mobile: false
  });

  const [theme, setTheme] = useState('system');
  const [language, setLanguage] = useState('fr');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-purple-600 to-indigo-600 p-6 rounded-2xl text-white">
        <div>
          <h1 className="text-2xl font-bold">Paramètres</h1>
          <p className="text-purple-100 mt-1">Personnalisez votre expérience</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Profil */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <User className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
              Profil
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Photo de profil
                </label>
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center text-white text-2xl font-medium">
                    JD
                  </div>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    Modifier
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Prénom
                  </label>
                  <input
                    type="text"
                    defaultValue="Jean"
                    className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nom
                  </label>
                  <input
                    type="text"
                    defaultValue="Dupont"
                    className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue="jean.dupont@oxynect.com"
                    className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Notifications */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Bell className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
              Notifications
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Notifications par email
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Recevez les mises à jour importantes par email
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.email}
                    onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Notifications bureau
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Recevez des notifications sur votre ordinateur
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.desktop}
                    onChange={(e) => setNotifications({ ...notifications, desktop: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>
          </Card>

          {/* Sécurité */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Lock className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
              Sécurité
            </h2>
            <div className="space-y-4">
              <button className="w-full px-4 py-2 text-left bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Changer le mot de passe
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Dernière modification il y a 3 mois
                </p>
              </button>
              <button className="w-full px-4 py-2 text-left bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Double authentification
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Sécurisez votre compte avec la 2FA
                </p>
              </button>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Apparence */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Palette className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
              Apparence
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Thème
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setTheme('light')}
                    className={`p-2 flex flex-col items-center gap-2 rounded-lg border ${
                      theme === 'light'
                        ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <Sun className="w-5 h-5" />
                    <span className="text-xs">Clair</span>
                  </button>
                  <button
                    onClick={() => setTheme('dark')}
                    className={`p-2 flex flex-col items-center gap-2 rounded-lg border ${
                      theme === 'dark'
                        ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <Moon className="w-5 h-5" />
                    <span className="text-xs">Sombre</span>
                  </button>
                  <button
                    onClick={() => setTheme('system')}
                    className={`p-2 flex flex-col items-center gap-2 rounded-lg border ${
                      theme === 'system'
                        ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <Palette className="w-5 h-5" />
                    <span className="text-xs">Système</span>
                  </button>
                </div>
              </div>
            </div>
          </Card>

          {/* Langue */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Globe className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
              Langue
            </h2>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg"
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </Card>

          {/* Préférences de contact */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Mail className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
              Contact
            </h2>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-purple-600 focus:ring-purple-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Newsletter mensuelle
                </span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-purple-600 focus:ring-purple-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Mises à jour produit
                </span>
              </label>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;