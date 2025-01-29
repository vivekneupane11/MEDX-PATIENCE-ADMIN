import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Users, Wrench, Stethoscope, ArrowRight, ArrowLeft } from 'lucide-react';
import { UserRole, OnboardingState } from '../types/user';
import { coordinatorSchema, technicianSchema, doctorSchema } from '../lib/schemas';
import toast from 'react-hot-toast';
import { createUser } from '../lib/firebase';
import Card from '../components/ui/Card';

export default function Onboarding() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState<OnboardingState>({
    step: 1,
    role: undefined,
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    specialization: '',
    licenseNumber: '',
    zone: '',
    certifications: []
  });

  const roles = [
    {
      id: 'coordinator',
      title: 'Coordinateur',
      description: 'Gérez les plannings et coordonnez les équipes',
      icon: Users,
      color: 'blue'
    },
    {
      id: 'technician',
      title: 'Technicien',
      description: 'Gérez les équipements et les interventions',
      icon: Wrench,
      color: 'green'
    },
    {
      id: 'doctor',
      title: 'Médecin',
      description: 'Supervisez les soins médicaux',
      icon: Stethoscope,
      color: 'purple'
    }
  ];

  const validateForm = async () => {
    try {
      switch (state.role) {
        case 'coordinator':
          await coordinatorSchema.parseAsync(state);
          break;
        case 'technician':
          await technicianSchema.parseAsync(state);
          break;
        case 'doctor':
          await doctorSchema.parseAsync(state);
          break;
        default:
          throw new Error('Rôle non sélectionné');
      }
      return true;
    } catch (error) {
      toast.error('Veuillez remplir tous les champs correctement');
      return false;
    }
  };

  const handleNext = async () => {
    if (state.step === 1 && !state.role) {
      toast.error('Veuillez sélectionner un rôle');
      return;
    }

    if (state.step === 2) {
      const isValid = await validateForm();
      if (!isValid) return;
    }

    if (state.step === 3) {
      try {
        setIsLoading(true);
        const userData = {
          firstName: state.firstName,
          lastName: state.lastName,
          email: state.email,
          phoneNumber: state.phoneNumber,
          role: state.role as UserRole,
          ...(state.role === 'doctor' && {
            specialization: state.specialization,
            licenseNumber: state.licenseNumber,
          }),
          ...(state.role === 'technician' && {
            zone: state.zone,
            certifications: state.certifications,
          })
        };

        await createUser(state.email, 'password123', userData);
        
        toast.success('Compte créé avec succès !');
        
        // Redirection basée sur le rôle
        switch (state.role) {
          case 'coordinator':
            navigate('/dashboard');
            break;
          case 'technician':
            navigate('/technician/dashboard');
            break;
          case 'doctor':
            navigate('/patients');
            break;
          default:
            navigate('/dashboard');
        }
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Une erreur est survenue');
      } finally {
        setIsLoading(false);
      }
      return;
    }

    setState(prev => ({ ...prev, step: prev.step + 1 }));
  };

  const handleBack = () => {
    setState(prev => ({ ...prev, step: prev.step - 1 }));
  };

  const getStepProgress = () => {
    return (state.step / 3) * 100;
  };

  const renderStepContent = () => {
    switch (state.step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white text-center mb-6">
              Sélectionnez votre rôle
            </h3>
            <div className="grid gap-4">
              {roles.map((role) => (
                <motion.button
                  key={role.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setState(prev => ({ ...prev, role: role.id as UserRole }))}
                  className={`p-4 rounded-lg border transition-all ${
                    state.role === role.id
                      ? `border-${role.color}-500 bg-${role.color}-50 dark:bg-${role.color}-900/20`
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg bg-${role.color}-100 dark:bg-${role.color}-900/30`}>
                      <role.icon className={`w-6 h-6 text-${role.color}-600 dark:text-${role.color}-400`} />
                    </div>
                    <div className="text-left">
                      <h4 className="font-medium text-gray-900 dark:text-white">{role.title}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{role.description}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white text-center mb-6">
              Informations personnelles
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Prénom
                  </label>
                  <input
                    type="text"
                    value={state.firstName}
                    onChange={(e) => setState(prev => ({ ...prev, firstName: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nom
                  </label>
                  <input
                    type="text"
                    value={state.lastName}
                    onChange={(e) => setState(prev => ({ ...prev, lastName: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={state.email}
                  onChange={(e) => setState(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Téléphone
                </label>
                <input
                  type="tel"
                  value={state.phoneNumber}
                  onChange={(e) => setState(prev => ({ ...prev, phoneNumber: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                />
              </div>
              {state.role === 'doctor' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Spécialisation
                    </label>
                    <input
                      type="text"
                      value={state.specialization}
                      onChange={(e) => setState(prev => ({ ...prev, specialization: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Numéro RPPS
                    </label>
                    <input
                      type="text"
                      value={state.licenseNumber}
                      onChange={(e) => setState(prev => ({ ...prev, licenseNumber: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                    />
                  </div>
                </>
              )}
              {state.role === 'technician' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Zone d'intervention
                    </label>
                    <input
                      type="text"
                      value={state.zone}
                      onChange={(e) => setState(prev => ({ ...prev, zone: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white text-center mb-6">
              Confirmation
            </h3>
            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Rôle</h4>
                  <p className="text-gray-900 dark:text-white">{
                    roles.find(r => r.id === state.role)?.title
                  }</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Prénom</h4>
                    <p className="text-gray-900 dark:text-white">{state.firstName}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Nom</h4>
                    <p className="text-gray-900 dark:text-white">{state.lastName}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h4>
                  <p className="text-gray-900 dark:text-white">{state.email}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Téléphone</h4>
                  <p className="text-gray-900 dark:text-white">{state.phoneNumber}</p>
                </div>
                {state.role === 'doctor' && (
                  <>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Spécialisation</h4>
                      <p className="text-gray-900 dark:text-white">{state.specialization}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Numéro RPPS</h4>
                      <p className="text-gray-900 dark:text-white">{state.licenseNumber}</p>
                    </div>
                  </>
                )}
                {state.role === 'technician' && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Zone d'intervention</h4>
                    <p className="text-gray-900 dark:text-white">{state.zone}</p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
          OxyNect
        </h2>

        <div className="relative mb-8">
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
            <motion.div
              className="h-full bg-blue-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${getStepProgress()}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-gray-500">Rôle</span>
            <span className="text-xs text-gray-500">Informations</span>
            <span className="text-xs text-gray-500">Confirmation</span>
          </div>
        </div>

        <Card className="px-4 py-8 sm:px-10">
          {renderStepContent()}

          <div className="mt-6 flex items-center justify-between">
            {state.step > 1 ? (
              <button
                onClick={handleBack}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </button>
            ) : (
              <div></div>
            )}
            <button
              onClick={handleNext}
              disabled={isLoading}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                'Chargement...'
              ) : (
                <>
                  {state.step === 3 ? 'Terminer' : 'Suivant'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}