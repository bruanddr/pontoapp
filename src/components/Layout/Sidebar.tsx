import React from 'react';
import { 
  Home, 
  Clock, 
  BarChart3, 
  Users, 
  Settings, 
  Building2,
  Calendar,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, isOpen, onClose }) => {
  const { user, logout } = useAuth();

  const menuItems = [
    { id: 'home', label: 'Início', icon: Home, roles: ['funcionario', 'supervisor', 'admin'] },
    { id: 'timesheet', label: 'Meus Registros', icon: Clock, roles: ['funcionario', 'supervisor', 'admin'] },
    { id: 'reports', label: 'Relatórios', icon: BarChart3, roles: ['funcionario', 'supervisor', 'admin'] },
    { id: 'users', label: 'Usuários', icon: Users, roles: ['supervisor', 'admin'] },
    { id: 'departments', label: 'Departamentos', icon: Building2, roles: ['admin'] },
    { id: 'shifts', label: 'Turnos', icon: Calendar, roles: ['admin'] },
    { id: 'settings', label: 'Configurações', icon: Settings, roles: ['admin'] },
  ];

  const availableItems = menuItems.filter(item => 
    item.roles.includes(user?.role || 'funcionario')
  );

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1c1c1b] text-white transform transition-transform duration-300 ease-in-out ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } lg:translate-x-0 lg:static lg:inset-0`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-16 bg-[#f23f35] border-b border-gray-700">
          <Clock className="h-8 w-8 mr-2" />
          <h1 className="text-xl font-bold">PontoSeg</h1>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-2 px-3">
            {availableItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      onViewChange(item.id);
                      onClose();
                    }}
                    className={`flex items-center w-full px-4 py-3 text-left rounded-lg transition-colors duration-200 ${
                      currentView === item.id
                        ? 'bg-[#f23f35] text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center mb-3">
            <div className="h-10 w-10 bg-[#ffb71b] rounded-full flex items-center justify-center text-[#1c1c1b] font-semibold">
              {user?.nome?.[0]}{user?.sobrenome?.[0]}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{user?.nome} {user?.sobrenome}</p>
              <p className="text-xs text-gray-400">{user?.cargo}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors duration-200"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;