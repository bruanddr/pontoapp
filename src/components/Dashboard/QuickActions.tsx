import React from 'react';
import { FileText, Users, Calendar, Settings, TrendingUp, AlertCircle } from 'lucide-react';

interface QuickActionsProps {
  onActionClick: (action: string) => void;
  userRole: 'funcionario' | 'supervisor' | 'admin';
}

const QuickActions: React.FC<QuickActionsProps> = ({ onActionClick, userRole }) => {
  const getActionsForRole = () => {
    const commonActions = [
      { id: 'timesheet', label: 'Ver Folha de Ponto', icon: FileText, color: 'bg-blue-500 hover:bg-blue-600' },
      { id: 'reports', label: 'Relatórios', icon: TrendingUp, color: 'bg-[#ff5805] hover:bg-orange-600' }
    ];

    const supervisorActions = [
      { id: 'team', label: 'Minha Equipe', icon: Users, color: 'bg-[#ffb71b] hover:bg-yellow-500' },
      { id: 'alerts', label: 'Alertas', icon: AlertCircle, color: 'bg-[#f23f35] hover:bg-red-600' }
    ];

    const adminActions = [
      { id: 'users', label: 'Gerenciar Usuários', icon: Users, color: 'bg-purple-500 hover:bg-purple-600' },
      { id: 'departments', label: 'Departamentos', icon: Calendar, color: 'bg-indigo-500 hover:bg-indigo-600' },
      { id: 'settings', label: 'Configurações', icon: Settings, color: 'bg-gray-500 hover:bg-gray-600' }
    ];

    if (userRole === 'admin') {
      return [...commonActions, ...adminActions];
    } else if (userRole === 'supervisor') {
      return [...commonActions, ...supervisorActions];
    } else {
      return commonActions;
    }
  };

  const actions = getActionsForRole();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-[#1c1c1b] mb-4">Ações Rápidas</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => onActionClick(action.id)}
              className={`${action.color} text-white p-4 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg`}
            >
              <Icon className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium block">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;