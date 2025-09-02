import React from 'react';
import { Clock, Coffee, LogIn, LogOut } from 'lucide-react';
import { RegistroPonto } from '../../types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface RecentEntriesProps {
  registros: RegistroPonto[];
}

const RecentEntries: React.FC<RecentEntriesProps> = ({ registros }) => {
  const today = new Date().toDateString();
  const registrosHoje = registros
    .filter(r => new Date(r.timestamp).toDateString() === today)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 5);

  const getEntryIcon = (tipo: RegistroPonto['tipo']) => {
    switch (tipo) {
      case 'entrada':
        return <LogIn className="h-4 w-4 text-green-600" />;
      case 'saida':
        return <LogOut className="h-4 w-4 text-[#f23f35]" />;
      case 'pausa_inicio':
        return <Coffee className="h-4 w-4 text-[#ffb71b]" />;
      case 'pausa_fim':
        return <Clock className="h-4 w-4 text-[#ff5805]" />;
    }
  };

  const getEntryLabel = (tipo: RegistroPonto['tipo']) => {
    switch (tipo) {
      case 'entrada':
        return 'Entrada';
      case 'saida':
        return 'Saída';
      case 'pausa_inicio':
        return 'Início da Pausa';
      case 'pausa_fim':
        return 'Fim da Pausa';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-[#1c1c1b] mb-4 flex items-center">
        <Clock className="h-5 w-5 text-[#f23f35] mr-2" />
        Registros de Hoje
      </h3>

      <div className="space-y-3">
        {registrosHoje.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Nenhum registro hoje</p>
        ) : (
          registrosHoje.map((registro) => (
            <div
              key={registro.id}
              className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center">
                {getEntryIcon(registro.tipo)}
                <div className="ml-3">
                  <p className="font-medium text-[#1c1c1b]">
                    {getEntryLabel(registro.tipo)}
                  </p>
                  {registro.observacoes && (
                    <p className="text-xs text-gray-500">{registro.observacoes}</p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-[#1c1c1b]">
                  {format(new Date(registro.timestamp), 'HH:mm')}
                </p>
                <p className="text-xs text-gray-500">
                  {format(new Date(registro.timestamp), 'dd/MM', { locale: ptBR })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentEntries;