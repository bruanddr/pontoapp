import React from 'react';
import { Clock, Calendar, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface StatusCardProps {
  status: 'fora' | 'trabalhando' | 'pausa';
  horasHoje: number;
  ultimoRegistro?: Date;
}

const StatusCard: React.FC<StatusCardProps> = ({ status, horasHoje, ultimoRegistro }) => {
  const getStatusInfo = () => {
    switch (status) {
      case 'trabalhando':
        return {
          label: 'Trabalhando',
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: Clock
        };
      case 'pausa':
        return {
          label: 'Em Pausa',
          color: 'bg-[#ffb71b] bg-opacity-20 text-orange-800 border-yellow-200',
          icon: Clock
        };
      case 'fora':
        return {
          label: 'Fora do Expediente',
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: Clock
        };
    }
  };

  const statusInfo = getStatusInfo();
  const StatusIcon = statusInfo.icon;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <StatusIcon className="h-6 w-6 text-[#f23f35] mr-2" />
          <h3 className="text-lg font-semibold text-[#1c1c1b]">Status Atual</h3>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusInfo.color}`}>
          {statusInfo.label}
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Horas Trabalhadas Hoje:</span>
          <span className="text-2xl font-bold text-[#1c1c1b]">
            {Math.floor(horasHoje)}h {Math.round((horasHoje % 1) * 60)}m
          </span>
        </div>

        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{format(new Date(), "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })}</span>
        </div>

        {ultimoRegistro && (
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-2" />
            <span>Último registro: {format(ultimoRegistro, 'HH:mm')}</span>
          </div>
        )}

        <div className="flex items-center text-sm text-gray-500">
          <MapPin className="h-4 w-4 mr-2" />
          <span>Escritório Central</span>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;