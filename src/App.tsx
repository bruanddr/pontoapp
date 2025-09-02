import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/Auth/LoginForm';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard';
import TimesheetView from './components/Timesheet/TimesheetView';
import ReportsView from './components/Reports/ReportsView';
import UserManagement from './components/Admin/UserManagement';
import DepartmentManagement from './components/Admin/DepartmentManagement';
import ShiftManagement from './components/Admin/ShiftManagement';
import Settings from './components/Admin/Settings';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  const [currentView, setCurrentView] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#f23f35]"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  const getPageTitle = () => {
    switch (currentView) {
      case 'home':
        return 'Dashboard';
      case 'timesheet':
        return 'Meus Registros';
      case 'reports':
        return 'Relatórios';
      case 'users':
        return 'Gerenciamento de Usuários';
      case 'departments':
        return 'Departamentos';
      case 'shifts':
        return 'Turnos';
      case 'settings':
        return 'Configurações';
      default:
        return 'Dashboard';
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <EmployeeDashboard onViewChange={setCurrentView} />;
      case 'timesheet':
        return <TimesheetView />;
      case 'reports':
        return <ReportsView />;
      case 'users':
        return <UserManagement />;
      case 'departments':
        return <DepartmentManagement />;
      case 'shifts':
        return <ShiftManagement />;
      case 'settings':
        return <Settings />;
      default:
        return <EmployeeDashboard onViewChange={setCurrentView} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          title={getPageTitle()}
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>

      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;