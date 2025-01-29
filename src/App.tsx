import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Prescriptions from './pages/Prescriptions';
import Requests from './pages/Requests';
import Inventory from './pages/Inventory';
import Analytics from './pages/Analytics';
import Communication from './pages/Communication';
import Settings from './pages/Settings';
import Onboarding from './pages/Onboarding';
import TechnicianDashboard from './pages/technician/TechnicianDashboard';
import TechnicianRequests from './pages/technician/TechnicianRequests';
import TechnicianStock from './pages/technician/TechnicianStock';
import TechnicianPlanning from './pages/technician/TechnicianPlanning';
import TechnicianDocuments from './pages/technician/TechnicianDocuments';
import { PrivateRoute } from './components/PrivateRoute';
import { useAuth } from './hooks/useAuth';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, profile, loading } = useAuth();

  if (loading) {
    return <div>Chargement...</div>;
  }

  // Déterminer la page d'accueil en fonction du rôle
  const getHomePage = () => {
    if (!profile) return '/onboarding';
    switch (profile.role) {
      case 'coordinator':
        return '/dashboard';
      case 'technician':
        return '/technician/dashboard';
      case 'doctor':
        return '/patients';
      default:
        return '/onboarding';
    }
  };

  // Si l'utilisateur n'est pas authentifié, afficher uniquement l'onboarding
  if (!user) {
    return (
      <Router>
        <div className={darkMode ? 'dark' : ''}>
          <Routes>
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="*" element={<Navigate to="/onboarding" replace />} />
          </Routes>
        </div>
      </Router>
    );
  }

  return (
    <Router>
      <div className={darkMode ? 'dark' : ''}>
        <Header 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <main className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'} pt-16`}>
          <div className="container mx-auto px-6 py-8">
            <Routes>
              {/* Routes Coordinator */}
              <Route path="/dashboard" element={
                <PrivateRoute roles={['coordinator']}>
                  <Dashboard />
                </PrivateRoute>
              } />
              <Route path="/inventory" element={
                <PrivateRoute roles={['coordinator']}>
                  <Inventory />
                </PrivateRoute>
              } />
              <Route path="/analytics" element={
                <PrivateRoute roles={['coordinator']}>
                  <Analytics />
                </PrivateRoute>
              } />

              {/* Routes Technician */}
              <Route path="/technician/dashboard" element={
                <PrivateRoute roles={['technician']}>
                  <TechnicianDashboard />
                </PrivateRoute>
              } />
              <Route path="/technician/requests" element={
                <PrivateRoute roles={['technician']}>
                  <TechnicianRequests />
                </PrivateRoute>
              } />
              <Route path="/technician/planning" element={
                <PrivateRoute roles={['technician']}>
                  <TechnicianPlanning />
                </PrivateRoute>
              } />
              <Route path="/technician/stock" element={
                <PrivateRoute roles={['technician']}>
                  <TechnicianStock />
                </PrivateRoute>
              } />
              <Route path="/technician/documents" element={
                <PrivateRoute roles={['technician']}>
                  <TechnicianDocuments />
                </PrivateRoute>
              } />

              {/* Routes Doctor */}
              <Route path="/patients" element={
                <PrivateRoute roles={['coordinator', 'doctor']}>
                  <Patients />
                </PrivateRoute>
              } />
              <Route path="/prescriptions" element={
                <PrivateRoute roles={['coordinator', 'doctor']}>
                  <Prescriptions />
                </PrivateRoute>
              } />

              {/* Routes communes */}
              <Route path="/communication" element={
                <PrivateRoute>
                  <Communication />
                </PrivateRoute>
              } />
              <Route path="/settings" element={
                <PrivateRoute>
                  <Settings />
                </PrivateRoute>
              } />

              {/* Redirections */}
              <Route path="/" element={<Navigate to={getHomePage()} replace />} />
              <Route path="*" element={<Navigate to={getHomePage()} replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}