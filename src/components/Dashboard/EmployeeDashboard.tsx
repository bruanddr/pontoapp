import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTimeTracking } from '../../hooks/useTimeTracking';
import PunchButton from '../PunchClock/PunchButton';
import StatusCard from '../PunchClock/StatusCard';
import RecentEntries from './RecentEntries';
import QuickActions from './QuickActions';
import SupervisorView from '../Admin/SupervisorView';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface EmployeeDashboardProps {
  onViewChange?: (view: string) => void;
}

const EmployeeDashboard: React.FC<EmployeeDashboardProps> = ({ onViewChange }) => {
  const { user } = useAuth();
  const { statusAtual, horasHoje, baterPonto, registros } = useTimeTracking(user?.id || '');

  const handlePunch = (tipo: 'entrada' | 'saida' | 'pausa_inicio' | 'pausa_fim') => {
    baterPonto(tipo);
  };

  const handleQuickAction = (action: string) => {
    if (onViewChange) {
      onViewChange(action);
    }
  };

  const ultimoRegistro = registros.length > 0 
    ? new Date(registros.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0].timestamp)
    : undefined;

  // Se for supervisor, mostra a view da equipe junto com o dashboard pessoal
  if (user?.role === 'supervisor') {
    return (
      <div className="space-y-6">
        {/* Dashboard Pessoal do Supervisor */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-[#1c1c1b] mb-2">
              Bom dia, {user?.nome}!
            </h2>
            <p className="text-gray-600">
              {format(new Date(), "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center mb-6">
            <PunchButton
              tipo="entrada"
              onClick={handlePunch}
              statusAtual={statusAtual}
            />
            <PunchButton
              tipo="pausa_inicio"
              onClick={handlePunch}
              statusAtual={statusAtual}
            />
            <PunchButton
              tipo="pausa_fim"
              onClick={handlePunch}
              statusAtual={statusAtual}
            />
            <PunchButton
              tipo="saida"
              onClick={handlePunch}
              statusAtual={statusAtual}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <StatusCard
            status={statusAtual}
            horasHoje={horasHoje}
            ultimoRegistro={ultimoRegistro}
          />
          <RecentEntries registros={registros} />
          <QuickActions 
            onActionClick={handleQuickAction}
            userRole={user?.role || 'funcionario'}
          />
        </div>

        {/* View da Equipe */}
        <SupervisorView />
      </div>
    );
  }

  // Dashboard padrão para funcionários
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-[#1c1c1b] mb-2">
            Bom dia, {user?.nome}!
          </h2>
          <p className="text-gray-600">
            {format(new Date(), "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })}
          </p>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <PunchButton
            tipo="entrada"
            onClick={handlePunch}
            statusAtual={statusAtual}
          />
          <PunchButton
            tipo="pausa_inicio"
            onClick={handlePunch}
            statusAtual={statusAtual}
          />
          <PunchButton
            tipo="pausa_fim"
            onClick={handlePunch}
            statusAtual={statusAtual}
          />
          <PunchButton
            tipo="saida"
            onClick={handlePunch}
            statusAtual={statusAtual}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <StatusCard
          status={statusAtual}
          horasHoje={horasHoje}
          ultimoRegistro={ultimoRegistro}
        />
        <RecentEntries registros={registros} />
        <QuickActions 
          onActionClick={handleQuickAction}
          userRole={user?.role || 'funcionario'}
        />
      </div>
    </div>
  );
};

export default EmployeeDashboard;